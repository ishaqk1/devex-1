(function () {
	'use strict';

	angular
		.module('core')
		.run(routeFilter);

	routeFilter.$inject = ['$rootScope', '$state', 'Authentication', '$translate', '$location'];

	function routeFilter($rootScope, $state, Authentication, $translate, $location) {
		$rootScope.$on('$stateChangeStart', stateChangeStart);
		$rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
		$rootScope.$on('$translateChangeSuccess', function(){
			var lang = $translate.use();
			$rootScope.lang = lang;
			document.documentElement.lang = lang;
		});
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
	    $rootScope.goTo = function(state){
	        var lang = $translate.use();
	        $state.go(lang + '.' + state);
	    }

		function stateChangeStart(event, toState, toParams) {
			// Check authentication before changing state
			var userroles   = (Authentication.user && Authentication.user.roles !== undefined) ? Authentication.user.roles : ['guest'];
			var hasroles    = (toState.data && toState.data.roles && toState.data.roles.length > 0);
			var hasnotroles = (toState.data && toState.data.notroles && toState.data.notroles.length > 0);
			var allowed     = true;
			var roles;
			var i;
			if (hasroles) {
				allowed = false;
				for (i = 0, roles = toState.data.roles; i < roles.length; i++) {
					if ((roles[i] === 'guest') || (!!~userroles.indexOf(roles[i]))) {
						allowed = true;
						break;
					}
				}
			}
			if (allowed && hasnotroles) {
				for (i = 0, roles = toState.data.notroles; i < roles.length; i++) {
					if (!!~userroles.indexOf(roles[i])) {
						allowed = false;
						break;
					}
				}
			}
			if (toState.name === 'en.insights' || toState.name === 'fr.insights') {
				allowed = true;
			}
			if (!allowed) {
				event.preventDefault();
				if (Authentication.user !== null && typeof Authentication.user === 'object') {
					$state.transitionTo('forbidden');
				} else {
					$state.go('authentication.signin').then(function () {
						// Record previous state
						storePreviousState(toState, toParams);
					});
				}
			}
		}

		function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
			// Record previous state
			storePreviousState(fromState, fromParams);
    	}

	    // Store previous state
	    function storePreviousState(state, params) {
			// only store this state if it shouldn't be ignored
			if (!state.data || !state.data.ignoreState) {
	        	$state.previous = {
					state: state,
					params: params,
					href: $state.href(state, params)
	        	};
	    	}
	    }
	}
}());
