(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService) {
    console.log($translate.use());
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    if ($translate.use() === 'en') {
      menuService.addSubMenuItem('account', 'settings', {
        title: 'Profile',
        state: 'en.settings.profile'
      });
    }

    if ($translate.use() === 'fr') {
      menuService.addSubMenuItem('account', 'settings', {
        title: 'Profil',
        state: 'fr.settings.profile'
      });
    }

    if (window.features.swu) menuService.addSubMenuItem('account', 'settings', {
      title: 'Messages',
      state: 'settings.messages'
    });

  }
}());
