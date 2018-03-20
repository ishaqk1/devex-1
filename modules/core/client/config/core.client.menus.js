(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$location'];

  function menuConfig(menuService, $location) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    // menuService.addSubMenuItem('account', 'settings', {
    //   title: 'Profile',
    //   state: 'settings.profile'
    // });

    if (window.features.swu) menuService.addSubMenuItem('account', 'settings', {
      title: 'Messages',
      state: 'settings.messages'
    });

  }
}());
