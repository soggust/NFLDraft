(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state) {
		var nav = this;
		nav.loggedIn = false;
		nav.openLogin = false;
		nav.status = UserFactory.status;
		nav.user = {};

		/* Open And Close Menu */
		nav.openMenu = function() {
			document.getElementById("menu").style.left = "0";
			document.getElementById("menuShade").style.display = "block";
		}
		nav.closeMenu = function() {
			document.getElementById("menu").style.left = "-15%";
			document.getElementById("menuShade").style.display = "none";
		}

		nav.log = function() {
			console.log(nav.status);
		}

		/* Login User */
		nav.loginUser = function(){
			UserFactory.login(nav.user).then(function(res){
				nav.user = {};
				nav.openLogin = false;
				nav.errLog = "";
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
			}, function(err){
				console.log(err);
				nav.errReg = err;
		});
	};

	/* Log Out User */
	nav.logoutUser = function() {
		UserFactory.logout();
		nav.status = {};
		$state.go("Home");
	};


	}
})();
