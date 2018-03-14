(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$translate'];

  function menuConfig(menuService, $translate) {
    console.log($translate.use());
    var lang = ($translate.use() === 'fr') ? 'fr' : 'en';
    console.log(lang);

    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Profile',
      state: lang + '.settings.profile'
    });

    if (window.features.swu) menuService.addSubMenuItem('account', 'settings', {
      title: 'Messages',
      state: lang + '.settings.messages'
    });

  }
}());
