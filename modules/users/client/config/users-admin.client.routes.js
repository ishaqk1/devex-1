(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('en.admin.govs', {
        url: '/govs',
        templateUrl: '/modules/users/client/views/admin/list-govs.client.view.html',
        controller: 'GovListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Government List'
        }
      })
      .state('fr.admin.govs', {
        url: '/gouvs',
        templateUrl: '/modules/users/client/views/admin/list-govs.client.view.html',
        controller: 'GovListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Government List'
        }
      })
      .state('en.admin.gov', {
        url: '/govs/:userId',
        templateUrl: '/modules/users/client/views/admin/view-govs.client.view.html',
        controller: 'GovController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('fr.admin.gov', {
        url: '/gouvs/:userId',
        templateUrl: '/modules/users/client/views/admin/view-govs.client.view.html',
        controller: 'GovController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('en.admin.gov-edit', {
        url: '/govs/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-govs.client.view.html',
        controller: 'GovController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit Government {{ userResolve.displayName }}'
        }
      })
      .state('fr.admin.gov-edit', {
        url: '/gouvs/:userId/modifier',
        templateUrl: '/modules/users/client/views/admin/edit-govs.client.view.html',
        controller: 'GovController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit Government {{ userResolve.displayName }}'
        }
      })
      .state('en.admin.users', {
        url: '/users',
        templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('fr.admin.users', {
        url: '/utilisateurs',
        templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('en.admin.user', {
        url: '/users/:userId',
        templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser,
          subscriptions: function (userResolve, NotificationsService) {
            return NotificationsService.subscriptionsForUser ({
              userId: userResolve._id
            }).$promise;
          }
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('fr.admin.user', {
        url: '/utilisateurs/:userId',
        templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser,
          subscriptions: function (userResolve, NotificationsService) {
            return NotificationsService.subscriptionsForUser ({
              userId: userResolve._id
            }).$promise;
          }
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('en.admin.notifyopps', {
        url: '/notifyopps',
        templateUrl: '/modules/users/client/views/admin/listopps.client.view.html',
        controllerAs: 'vm',
        controller: function (users) {
          var vm = this;
          vm.users = users;
        },
        resolve: {
          users: function (AdminService) {
            return AdminService.listopps().$promise;
          }
        },
        data: {
          pageTitle: 'Notify of Opportunities'
        }
      })
      .state('fr.admin.notifyopps', {
        url: '/notifierposs',
        templateUrl: '/modules/users/client/views/admin/listopps.client.view.html',
        controllerAs: 'vm',
        controller: function (users) {
          var vm = this;
          vm.users = users;
        },
        resolve: {
          users: function (AdminService) {
            return AdminService.listopps().$promise;
          }
        },
        data: {
          pageTitle: 'Notify of Opportunities'
        }
      })
      .state('en.admin.notifymeets', {
        url: '/notifymeets',
        templateUrl: '/modules/users/client/views/admin/listmeets.client.view.html',
        controllerAs: 'vm',
        controller: function (users) {
          var vm = this;
          vm.users = users;
        },
        resolve: {
          users: function (AdminService) {
            return AdminService.listmeets().$promise;
          }
        },
        data: {
          pageTitle: 'Notify of Meet-ups and Events'
        }
      })
      .state('fr.admin.notifymeets', {
        url: '/notifiermeets',
        templateUrl: '/modules/users/client/views/admin/listmeets.client.view.html',
        controllerAs: 'vm',
        controller: function (users) {
          var vm = this;
          vm.users = users;
        },
        resolve: {
          users: function (AdminService) {
            return AdminService.listmeets().$promise;
          }
        },
        data: {
          pageTitle: 'Notify of Meet-ups and Events'
        }
      })
      .state('en.admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser,
          subscriptions: function (userResolve, NotificationsService) {
            return NotificationsService.subscriptionsForUser ({
              userId: userResolve._id
            }).$promise;
          }
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('fr.admin.user-edit', {
        url: '/utilisateurs/:userId/modifier',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser,
          subscriptions: function (userResolve, NotificationsService) {
            return NotificationsService.subscriptionsForUser ({
              userId: userResolve._id
            }).$promise;
          }
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('en.admin.datalist', {
        url: '/datalist',
        templateUrl: '/modules/users/client/views/admin/datalist.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Full Data List'
        }
      })
      .state('fr.admin.datalist', {
        url: '/listedonnees',
        templateUrl: '/modules/users/client/views/admin/datalist.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Full Data List'
        }
      })
      ;

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
