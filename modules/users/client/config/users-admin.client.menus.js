(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', '$location'];

  // Configuring the Users module
  function menuConfig(menuService, $location) {
    var path = $location.path();
    var lang = (path.indexOf('/fr') !== -1) ? 'fr' : 'en';

    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: lang + '.admin.users'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Gov. Request',
      state: lang + '.admin.govs'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Notify of Opportunities',
      state: lang + '.admin.notifyopps'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Notify of Events',
      state: lang + '.admin.notifymeets'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Full Data List',
      state: lang + '.admin.datalist'
    });
  }
}());
