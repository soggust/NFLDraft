(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController() {
		var nav = this;

		nav.loggedIn = false;
		nav.openLogin = false;

		nav.openMenu = function() {
			document.getElementById("menu").style.left = "0";
			document.getElementById("menuShade").style.display = "block";
		}

		nav.closeMenu = function() {
			document.getElementById("menu").style.left = "-15%";
			document.getElementById("menuShade").style.display = "none";
		}

		nav.loginUser = function(){
			UserFactory.loginUser(nav.user).then(function(res){
				nav.user = {};
				nav.errLog = "";
				nav.overlayLogin();
			}, function(err){
				console.log(err);
				nav.errLog = err;
				// nav.err = true;
			});
		};

		nav.registerUser = function(){
			nav.user.profilePic = "https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png";
			UserFactory.status.profilePic = "https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png";
			nav.user.bio = "This is a default biography for you created by 'The Food Forum'. If you would like to change this, please click the edit button above.";
			UserFactory.registerUser(nav.user).then(function(){
				nav.user = {};
				nav.errReg = "";
				nav.overlayRegister();
			}, function(err){
				console.log(err);
				nav.errReg = err;
		});
	};

		nav.logoutUser = function() {
			UserFactory.logout();
			$state.go("Home");
		};

		nav.logOut = function() {
			window.location.reload();
		}

	}
})();
