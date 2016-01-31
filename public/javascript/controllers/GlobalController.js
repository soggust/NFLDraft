(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state, $rootScope, $window) {
		var nav = this;
		nav.loggedIn = false;
		nav.openLogin = false;
		nav.sharing = false;
		nav.previousState;
		nav.currentState;
		nav.status = UserFactory.status;
		nav.user = {};
		nav.currentBoard = [];

		/* Open And Close Menu */
		nav.openMenu = function() {
			document.getElementById("menu").style.left = "0";
			document.getElementById("menuShade").style.display = "block";
		}
		nav.closeMenu = function() {
			document.getElementById("menu").style.left = "-15%";
			document.getElementById("menuShade").style.display = "none";
		}

		/* Track State Changes */
	  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    	nav.previousState = from.name;
    	nav.currentState = to.name;
		});

		/* Login User */
		nav.loginUser = function(){
			UserFactory.login(nav.user).then(function(res){
				nav.user = {};
				nav.openLogin = false;
				nav.status = UserFactory.status;
				nav.errLog = "";
				$state.go("Home");
			}, function(err){
				console.log(err);
				nav.errLog = err;
			});
		};

		/* Register User */
		nav.registerUser = function(){
			nav.user.profilePic = "https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png";
			UserFactory.register(nav.user).then(function(){
				nav.user = {};
				nav.status = UserFactory.status;
				nav.errReg = "";
				$state.go("Home");
			}, function(err){
				console.log(err);
				nav.errReg = err;
		});
	};

	/* Log Out User */
	nav.logoutUser = function() {
		UserFactory.logout();
		nav.status = {};
		$window.location.reload();
	};


	}
})();
