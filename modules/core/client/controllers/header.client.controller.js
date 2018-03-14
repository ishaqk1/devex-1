(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$translate', '$location', 'Authentication', 'menuService'];

  function HeaderController($scope, $rootScope, $state, $stateParams, $translate, $location, Authentication, menuService, flags) {
    var vm = this;
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $rootScope.isHomePage = function() {
        var path = $location.path();
        return (! path) || path === '/' || path === '/en' || path === '/fr';
    };
    $rootScope.isEnglish = function() {
        return ($translate.use() === 'en');
    };
    $rootScope.isFrench = function() {
        return ($translate.use() === 'fr');
    };
    $rootScope.changeLanguage = function(){
        var newLang = ($translate.use() === 'fr') ? 'en' : 'fr';
        var currentState = $state.current.name;

        $translate.use(newLang).then(function () {
            $state.go(newLang + currentState.slice(2));
        });
    }

    $scope.thisLang = $rootScope.lang;

    $scope.isActiveMenu = function(item) {
        var route = item.state || '',
            active = $state.current.name || '',
            mr = route.match(/^(.*)\.(list)$/),
            ma = active.match(/^(.*)\.(edit|view|list)$/);
        if (mr) route = mr[1];
        if (ma) active = ma[1];
        if (route === active)
            return true;
        if (route === 'admin' && active.substring(0, 5) === 'admin')
            return true;
    };

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);
    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }


}());
