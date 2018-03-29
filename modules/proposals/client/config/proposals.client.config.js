(function () {
	'use strict';

	angular.module('proposals').run(['menuService', '$location', function (menuService, $location) {
		var path = $location.path();
    	var lang = (path.indexOf('/fr') !== -1) ? 'fr' : 'en';

		menuService.addSubMenuItem ('topbar', 'admin', {
			title: 'Manage Proposals',
			state: lang + '.proposals.list'
		});
	}]);
}());
