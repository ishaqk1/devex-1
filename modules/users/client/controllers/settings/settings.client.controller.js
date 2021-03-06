(function () {
	'use strict';

	angular.module('users')

	// -------------------------------------------------------------------------
	//
	// overarching settings controller, does not do anything really
	//
	// -------------------------------------------------------------------------
	.controller('SettingsController', function ($scope, Authentication) {
		var vm = this;
		vm.features = window.features;
		vm.user = Authentication.user;
	})
	// -------------------------------------------------------------------------
	//
	// controller for privacy
	//
	// -------------------------------------------------------------------------
	.controller('ProfilePrivacyController', function ($scope, subscriptions, Authentication, UsersService, Notification, $filter) {
		var vm = this;
		vm.user = angular.copy(Authentication.user);
		var pristineUser = angular.toJson (Authentication.user);
		vm.user.notifyOpportunities = subscriptions.map (function (s) {return (s.notificationCode === 'not-add-opportunity');}).reduce (function (a, c) {return (a || c);}, false);
		vm.features = window.features;
		vm.savePrivacy = function(isValid) {
			console.log ('runing');
			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'vm.userForm');
				return false;
			}
			var successMessage = '<h4>' + $filter('translate')('EDIT_PROFILE_SUCCESS') + '</h4>';
			if (vm.user.notifyOpportunities) {
				successMessage += '<p>' + $filter('translate')('EDIT_PROFILE_OPPORTUNITIES') + '</p>';
			}
			if (vm.user.isPublicProfile) {
				successMessage += '<p>' + $filter('translate')('EDIT_PROFILE_PUBLIC') + '</p>';
			}
			if (vm.user.isAutoAdd) {
				successMessage += '<p>' + $filter('translate')('EDIT_PROFILE_AUTOADD') + '</p>';
			}
			var user = new UsersService(vm.user);
			user.$update(function (response) {
				$scope.$broadcast('show-errors-reset', 'vm.userForm');
				Notification.success({ delay:5000, message: '<i class="glyphicon glyphicon-ok"></i> '+successMessage});
				Authentication.user = response;
				vm.user = angular.copy(Authentication.user);
				pristineUser = angular.toJson(Authentication.user);
			}, function (response) {
				Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' + $filter('translate')('EDIT_PROFILE_FAILURE') });
			});
		}
	})
	// -------------------------------------------------------------------------
	//
	// controller for skills
	//
	// -------------------------------------------------------------------------
	.controller('ProfileSkillsController', function ($scope, $sce, Notification, dataService, Authentication, UsersService, capabilities) {
		var vm = this;
		vm.features = window.features;
		vm.user = angular.copy(Authentication.user);
		var pristineUser = angular.toJson (Authentication.user);
		vm.capabilities     = capabilities;
		console.log ('capabilities:', vm.capabilities);
		if (!vm.user.capabilities) vm.user.capabilities = [];
		vm.c01_years = '0';
		vm.tinymceOptions = {
			resize      : true,
			width       : '100%',  // I *think* its a number and not '400' string
			height      : 100,
			menubar     :'',
			elementpath : false,
			plugins     : 'textcolor lists advlist link',
			toolbar     : 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | forecolor backcolor'
		};
		// //
		// // set up the capability structure to have variables for the tags that we can bind to
		// //
		// vm.capabilities.bykey.forEach (function (c, key) {
		// 	console.log ('bykey key=',key,'obj=',c);
		// 	c.tagvars = c.tags.reduce (function (accum, curr) {
		// 		accum[curr] = false;
		// 	}, {});
		// });
		vm.updateUserProfile = function (isValid) {
			console.log ('saviong');
			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'vm.userForm');
				return false;
			}

			vm.user.c01_flag = (vm.user.c01_experience !== '');
			vm.user.c02_flag = (vm.user.c02_experience !== '');
			vm.user.c03_flag = (vm.user.c03_experience !== '');
			vm.user.c04_flag = (vm.user.c04_experience !== '');
			vm.user.c05_flag = (vm.user.c05_experience !== '');
			vm.user.c06_flag = (vm.user.c06_experience !== '');
			vm.user.c07_flag = (vm.user.c07_experience !== '');
			vm.user.c08_flag = (vm.user.c08_experience !== '');
			vm.user.c09_flag = (vm.user.c09_experience !== '');
			vm.user.c10_flag = (vm.user.c10_experience !== '');
			vm.user.c11_flag = (vm.user.c11_experience !== '');
			vm.user.c12_flag = (vm.user.c12_experience !== '');
			vm.user.c13_flag = (vm.user.c13_experience !== '');

			vm.user.capabilities = [];

			if (vm.user.c01_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c01'].code); }
			if (vm.user.c02_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c02'].code); }
			if (vm.user.c03_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c03'].code); }
			if (vm.user.c04_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c04'].code); }
			if (vm.user.c05_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c05'].code); }
			if (vm.user.c06_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c06'].code); }
			if (vm.user.c07_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c07'].code); }
			if (vm.user.c08_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c08'].code); }
			if (vm.user.c09_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c09'].code); }
			if (vm.user.c10_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c10'].code); }
			if (vm.user.c11_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c11'].code); }
			if (vm.user.c12_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c12'].code); }
			if (vm.user.c13_flag) { vm.user.capabilities.push (vm.capabilities.bykey['c13'].code); }


			var successMessage = '<h4>Edit skills successful</h4>';
			var user = new UsersService(vm.user);
			user.$update(function (response) {
				$scope.$broadcast('show-errors-reset', 'vm.userForm');
				Notification.success({ delay:5000, message: '<i class="glyphicon glyphicon-ok"></i> '+successMessage});
				Authentication.user = response;
				vm.user = angular.copy(Authentication.user);
				pristineUser = angular.toJson(Authentication.user);
			}, function (response) {
				Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Edit profile failed!' });
			});
		}
	})
	.controller('ProfileSkillsController2', function ($scope, $state, $sce, $window, $timeout, Upload, Authentication, Notification, previousState, dataService, capabilities) {
		var vm              = this;
		vm.form             = {};
		vm.profile          = angular.copy(Authentication.user);
		vm.user             = Authentication.user;
		vm.previousState    = previousState;
		vm.isAdmin          = Authentication.user && !!~Authentication.user.roles.indexOf ('admin');
		vm.isGov            = Authentication.user && !!~Authentication.user.roles.indexOf ('gov');
		vm.authentication   = Authentication;
		vm.cities           = dataService.cities;
		vm.profile.skillist = vm.profile.skills ? vm.profile.skills.join (', ') : '';
		vm.capabilities     = capabilities;
		//
		// if the user doesn't have the right access then kick them out
		//
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
				vm.profile.$remove(function() {
					$state.go('profiles.list');
					Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> profile deleted successfully!' });
				});
			}
		};
		// -------------------------------------------------------------------------
		//
		// save the profile, could be added or edited (post or put)
		//
		// -------------------------------------------------------------------------
		vm.saveme = function () {
			this.save (true);
		};
		vm.save = function (isValid) {
			console.log ('profile', vm.profile.capabilities);
			vm.form.profileForm.$setPristine ();
			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'vm.form.profileForm');
				return false;
			}
			vm.profile.skills = vm.profile.skillist.split(/ *, */);
			//
			// Create a new profile, or update the current instance
			//
			vm.profile.createOrUpdate ()
			//
			// success, notify and return to list
			//
			.then (function () {
				vm.form.profileForm.$setPristine ();
				Notification.success ({
					message : '<i class="glyphicon glyphicon-ok"></i> profile saved successfully!'
				});
				//
				// saved the record, now we can upload the logo if it was changed at all
				//
				((vm.fileSelected) ? vm.upload (vm.croppedDataUrl, vm.picFile, vm.profile._id) : Promise.resolve ())
				.then (function () {
						$state.go('profiles.view', {profileId:vm.profile._id});
				});
			})
			//
			// fail, notify and stay put
			//
			.catch (function (res) {
				Notification.error ({
					message : res.data.message,
					title   : '<i class=\'glyphicon glyphicon-remove\'></i> profile save error!'
				});
			});
		};
	})
	// -------------------------------------------------------------------------
	//
	// controller for messages
	//
	// -------------------------------------------------------------------------
	.controller('ProfileMessagesController', function ($scope, Authentication) {
		var vm = this;
		vm.user = Authentication.user;
	})
	;
}());
