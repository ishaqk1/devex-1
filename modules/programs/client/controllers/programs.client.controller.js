(function () {
	'use strict';
	angular.module('programs')
	// =========================================================================
	//
	// Controller for the master list of programs
	//
	// =========================================================================
	.controller('ProgramsListController', function (ProgramsService) {
		var vm      = this;
		vm.programs = ProgramsService.query();
	})
	// =========================================================================
	//
	// Controller the view of the program page
	//
	// =========================================================================
	.controller('ProgramViewController', function ($scope, $state, $sce, program, Authentication, ProgramsService, Notification, dataService, $filter, $translate) {
		var vm                 = this;
		vm.program             = program;
		vm.display             = {};
		vm.display.description = $sce.trustAsHtml(vm.program.description);
		vm.display.description_fr = $sce.trustAsHtml(vm.program.description_fr);
		vm.authentication      = Authentication;
		vm.ProgramsService     = ProgramsService;
		vm.idString            = 'programId';
		//
		// departments list
		//
		vm.departments = dataService.departments;
		//
		// what can the user do here?
		//
		var isUser                 = Authentication.user;
		var isAdmin                = isUser && !!~Authentication.user.roles.indexOf ('admin');
		var isGov                  = isUser && !!~Authentication.user.roles.indexOf ('gov');
		var isMemberOrWaiting      = program.userIs.member || program.userIs.request;
		vm.loggedIn                = isUser;
		vm.canRequestMembership    = isGov && !isMemberOrWaiting;
		vm.canEdit                 = isAdmin || program.userIs.admin;
		// -------------------------------------------------------------------------
		//
		// issue a request for membership
		//
		// -------------------------------------------------------------------------
		vm.request = function () {
			ProgramsService.makeRequest ({
				programId: program._id
			}).$promise.then (function () {
				Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Membership request sent successfully!' });
			});
		};
		// -------------------------------------------------------------------------
		//
		// publish or un publish the opportunity
		//
		// -------------------------------------------------------------------------
		vm.publish = function (state) {
			var publishedState = program.isPublished;
			var t = state ? $filter('translate')('PUBLISHED') : $filter('translate')('UNPUBLISHED')
			program.isPublished = state;
			program.createOrUpdate ()
			//
			// success, notify and return to list
			//
			.then (function () {
				Notification.success ({
					message : '<i class="glyphicon glyphicon-ok"></i> ' + $filter('translate')('TEAM_TEAM') + ' '+t+' Successfully!'
				});
			})
			//
			// fail, notify and stay put
			//
			.catch (function (res) {
				program.isPublished = publishedState;
				Notification.error ({
					message : res.data.message,
					title   : '<i class=\'glyphicon glyphicon-remove\'></i> ' + $filter('translate')('TEAM_TEAM') + ' '+t+' Error!'
				});
			});
		};
	})
	// =========================================================================
	//
	// Controller the view of the program page
	//
	// =========================================================================
	.controller('ProgramEditController', function ($scope, $state, $sce, $window, $timeout, Upload, program, editing, Authentication, Notification, previousState, dataService, $filter, $translate) {
		$scope.isEnglish = function() {
	        return ($translate.use() === 'en');
	    };
	    $scope.isFrench = function() {
	        return ($translate.use() === 'fr');
	    };

	    var vm            = this;
		vm.user = Authentication.user;
		vm.fileSelected = false;
		vm.progress = 0;
		vm.croppedDataUrl = '';
		vm.picFile = null;
		//
		// departments list
		//
		vm.departments = dataService.departments;

		vm.previousState = previousState;
		vm.isAdmin                 = Authentication.user && !!~Authentication.user.roles.indexOf ('admin');
		vm.isGov                   = Authentication.user && !!~Authentication.user.roles.indexOf ('gov');
		vm.editing        = editing;
		vm.program        = program;
		vm.authentication = Authentication;
		//
		// if the user doesn't have the right access then kick them out
		//
		if (editing && !(program.userIs.admin || vm.isAdmin)) $state.go('forbidden');
		vm.form           = {};
		vm.program.taglist = vm.program.tags? vm.program.tags.join (', ') : '';
		vm.filename = {name:'none'};
		vm.tinymceOptions = {
			resize      : true,
			width       : '100%',  // I *think* its a number and not '400' string
			height      : 100,
			menubar     :'',
			elementpath : false,
			plugins     : 'textcolor lists advlist link',
			toolbar     : 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | forecolor backcolor'
		};
		// -------------------------------------------------------------------------
		//
		// remove the program with some confirmation
		//
		// -------------------------------------------------------------------------
		vm.remove = function () {
			if ($window.confirm('Are you sure you want to delete?')) {
				vm.program.$remove(function() {
					$state.go($translate.use() + '.programs.list');
					Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> ' + $filter('translate')('TEAM_TEAM') + ' deleted successfully!' });
				});
			}
		};
		// -------------------------------------------------------------------------
		//
		// save the program, could be added or edited (post or put)
		//
		// -------------------------------------------------------------------------
		vm.saveme = function () {
			this.save (true);
		};
		vm.save = function (isValid) {
			vm.form.programForm.$setPristine ();
			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'vm.form.programForm');
				return false;
			}
			//
			// Create a new program, or update the current instance
			//
			vm.program.createOrUpdate ()
			//
			// success, notify and return to list
			//
			.then (function () {
				vm.form.programForm.$setPristine ();
				Notification.success ({
					message : '<i class="glyphicon glyphicon-ok"></i> ' + $filter('translate')('TEAM_TEAM') + ' saved successfully!'
				});
				//
				// saved the record, now we can upload the logo if it was changed at all
				//
				((vm.fileSelected) ? vm.upload (vm.croppedDataUrl, vm.picFile, vm.program._id) : Promise.resolve ())
				.then (function () {
						$state.go($translate.use() + '.programs.view', {programId:program.code});
				});
			})
			//
			// fail, notify and stay put
			//
			.catch (function (res) {
				Notification.error ({
					message : res.data.message,
					title   : '<i class=\'glyphicon glyphicon-remove\'></i> ' + $filter('translate')('TEAM_TEAM') + ' save error!'
				});
			});
		};
		// -------------------------------------------------------------------------
		//
		// does the work of uploading the logo file
		//
		// -------------------------------------------------------------------------
		vm.upload = function (url, name, programId) {
			return new Promise (function (resolve, reject) {
				Upload.upload ({
					url: '/api/upload/logo/program/'+programId,
					data: {
						logo: Upload.dataUrltoBlob (url, name.name)
					}
				})
				.then (
					function () {
						$timeout (function () {
							Notification.success ({ message: '<i class="glyphicon glyphicon-ok"></i> Update of logo successful!' });
							vm.fileSelected = false;
							vm.progress = 0;
						});
						resolve ();
					},
					function (response) {
						if (response.status > 0) {
							vm.fileSelected = false;
							Notification.error ({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Update of logo failed!' });
						}
						reject ();
					},
					function (evt) {
						vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
					}
				);
			});
		};
	})
	;
}());
