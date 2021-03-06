(function () {
	'use strict';
	angular.module('projects')
	// =========================================================================
	//
	// Controller for the master list of programs
	//
	// =========================================================================
	.controller('ProjectsListController', function (ProjectsService) {
		var vm      = this;
		vm.projects = ProjectsService.query();
	})
	// =========================================================================
	//
	// Controller the view of the project page
	//
	// =========================================================================
	.controller('ProjectViewController', function ($scope, $state, $sce, $stateParams, project, Authentication, ProjectsService, Notification, $filter, $translate) {
		$scope.isEnglish = function() {
	        return ($translate.use() === 'en');
	    };
	    $scope.isFrench = function() {
	        return ($translate.use() === 'fr');
	    };

	    var vm                 = this;
		vm.programId           = project.program ? project.program._id : $stateParams.programId;
		vm.project             = project;
		vm.display             = {};
		vm.display.description = $sce.trustAsHtml(vm.project.description);
		vm.display.description_fr = $sce.trustAsHtml(vm.project.description_fr);
		vm.authentication      = Authentication;
		vm.ProjectsService     = ProjectsService;
		vm.idString            = 'projectId';
		//
		// what can the user do here?
		//
		var isUser                 = Authentication.user;
		var isAdmin                = isUser && !!~Authentication.user.roles.indexOf ('admin');
		var isGov                  = isUser && !!~Authentication.user.roles.indexOf ('gov');
		var isMemberOrWaiting      = project.userIs.member || project.userIs.request;
		vm.isAdmin                 = isAdmin;
		vm.loggedIn                = isUser;
		vm.canRequestMembership    = isGov && !isMemberOrWaiting;
		vm.canEdit                 = isAdmin || project.userIs.admin;
		// -------------------------------------------------------------------------
		//
		// issue a request for membership
		//
		// -------------------------------------------------------------------------
		vm.request = function () {
			ProjectsService.makeRequest({
				projectId: project._id
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
			var publishedState = project.isPublished;
			var t = state ? $filter('translate')('PUBLISHED') : $filter('translate')('UNPUBLISHED')
			project.isPublished = state;
			project.createOrUpdate ()
			//
			// success, notify and return to list
			//
			.then (function () {
				Notification.success ({
					message : '<i class="glyphicon glyphicon-ok"></i> Project '+t+' Successfully!'
				});
			})
			//
			// fail, notify and stay put
			//
			.catch (function (res) {
				project.isPublished = publishedState;
				Notification.error ({
					message : res.data.message,
					title   : '<i class=\'glyphicon glyphicon-remove\'></i> Project '+t+' Error!'
				});
			});
		};
	})
	// =========================================================================
	//
	// Controller the view of the project page
	//
	// =========================================================================
	.controller('ProjectEditController', function ($scope, $state, $sce, $stateParams, $window, project, editing, programs, Authentication, Notification, previousState, $filter, $translate) {
		$scope.isEnglish = function() {
	        return ($translate.use() === 'en');
	    };
	    $scope.isFrench = function() {
	        return ($translate.use() === 'fr');
	    };

	    var vm             = this;
		vm.previousState   = previousState;
		vm.isAdmin         = Authentication.user && !!~Authentication.user.roles.indexOf ('admin');
		vm.isGov           = Authentication.user && !!~Authentication.user.roles.indexOf ('gov');
		vm.isProjectAdmin  = (vm.editing) ? project.userIs.admin : true;
		vm.project         = project;
		vm.authentication  = Authentication;
		//
		// if the user doesn't have the right access then kick them out
		//
		if (editing && !vm.isAdmin && !project.userIs.admin) $state.go('forbidden');
		vm.form            = {};
		vm.project.taglist = vm.project.tags? vm.project.tags.join (', ') : '';
		vm.project.taglist_fr = vm.project.tags_fr? vm.project.tags_fr.join (', ') : '';
		vm.editing         = editing;
		vm.context         = $stateParams.context;
		vm.programs        = programs;
		vm.tinymceOptions  = {
			resize      : true,
			width       : '100%',  // I *think* its a number and not '400' string
			height      : 100,
			menubar     :'',
			elementpath : false,
			plugins     : 'textcolor lists advlist link',
			toolbar     : 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | forecolor backcolor'
		};
		if (vm.programs.length === 0) {
			alert ('You do not have a team for which you are able to create a project. Please browse to or create a team to put the new project under.');
			$state.go (previousState.name, previousState.params);
		}
		//
		// if adding we care about the context
		// if editing, the program field is locked (and is just a link)
		// if adding then the user is restricted to add under a program they have
		// admin over. If adding wihin the context of a program then restrict to
		// that program only
		//
		//
		// defaults
		//
		vm.programLink  = false;
		vm.programId    = $stateParams.programId;
		vm.programTitle = $stateParams.programTitle;
		//
		// if editing, set from existing
		//
		if (vm.editing) {
			vm.programLink = true;
			vm.programId    = project.program._id;
			vm.programTitle = project.program.title;
		} else {
			//
			// if adding with no program context display select box
			//
			if (vm.context === 'allprojects') {
				vm.programLink = false;
			}
			//
			// if adding with program context set the program on the record
			//
			else if (vm.context === 'program') {
				vm.programLink = true;
				vm.project.program = vm.programId;
			}
		}
		// -------------------------------------------------------------------------
		//
		// remove the project with some confirmation
		//
		// -------------------------------------------------------------------------
		vm.remove = function () {
			if ($window.confirm($filter('translate')('ARE_YOU_SURE'))) {
				vm.project.$remove(function() {
					$state.go($translate.use() + '.projects.list');
					Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> ' + $filter('translate')('PROJECT_DELETED') });
				});
			}
		};
		// -------------------------------------------------------------------------
		//
		// save the project, could be added or edited (post or put)
		//
		// -------------------------------------------------------------------------
		vm.saveme = function () {
			this.save (true);
		};
		vm.save = function (isValid) {
			vm.form.projectForm.$setPristine ();
			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'vm.form.projectForm');
				return false;
			}
			if (vm.project.taglist !== '') {
				vm.project.tags = vm.project.taglist.split(/ *, */);
			} else {
				vm.project.tags = [];
			}
			if (vm.project.taglist_fr !== '') {
				vm.project.tags_fr = vm.project.taglist_fr.split(/ *, */);
			} else {
				vm.project.tags_fr = [];
			}
			//
			// if we were adding, then set the selected programId, unless it was adding inside
			// a program context already, then just use the one that is already set
			//
			if (!editing && vm.context === 'allprojects') {
				vm.project.program = vm.programId;
			}
			//
			// Create a new project, or update the current instance
			//
			vm.project.createOrUpdate ()
			//
			// success, notify and return to list
			//
			.then (function () {
				vm.form.projectForm.$setPristine ();
				Notification.success ({
					message : '<i class="glyphicon glyphicon-ok"></i> project saved successfully!'
				});
				$state.go($translate.use() + '.projects.view', {projectId:project.code});
			})
			//
			// fail, notify and stay put
			//
			.catch (function (res) {
				Notification.error ({
					message : res.data.message,
					title   : '<i class=\'glyphicon glyphicon-remove\'></i> project save error!'
				});
			});
		};
	})
	;
}());
