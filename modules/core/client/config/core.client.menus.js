(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$location'];

  function menuConfig(menuService, $location) {
    var path = $location.path();
    console.log(path);
    var lang = (path.indexOf('/fr') !== -1) ? 'fr' : 'en';
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
