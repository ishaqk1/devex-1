(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$state', '$filter', 'AdminService'];

  function UserListController($scope, $state, $filter, AdminService) {
    var vm = this;

    AdminService.query(function (data) {
      vm.users = data;
    });

    vm.datalist = function () {
      $state.go('admin.datalist');
    }
  }
}());
