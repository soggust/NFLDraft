(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	function UserFactory($http, $q, HomeFactory) {
		var o = {};
    o.status = {};

		// ------------------- Prospects --------------------------

		o.getProspects = function() {
			if(o.status.username) {
				var q = $q.defer();
					var parcel = {username: o.status.username};
					$http.post("/user/prospects", parcel).then(function(res) {
						o.status.prospects = res.data;
						q.resolve(res.data);
					});
				return q.promise;
			} else {
				return HomeFactory.prospects;
			}
		};

		o.saveBoard = function(board) {
			var q = $q.defer();
			var parcel = {username: o.status.username, prospects: board};
			$http.post("/user/saveboard", parcel).then(function(res) {
				q.resolve();
			});
			return q.promise;
		};

		// ------------------- Drafts --------------------------

		o.getAllDrafts = function() {
			var q = $q.defer();
			$http.get("/draft/").then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		}

		o.getDrafts = function() {
			var q = $q.defer();
			var parcel = {username: o.status.username};
			$http.post("/draft/", parcel).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.addDraft = function(board) {
			var created = new Date();
			var q = $q.defer();
			var parcel = {name: board.name, draft: board.picks, public: board.public, created: created, creator: o.status.username, likes: 0};
			$http.post("/draft/add", parcel).then(function(res) {
				q.resolve();
			});
			return q.promise;
		};

		// ------------------- Accounts --------------------------

    o.register = function(user) {
      var q = $q.defer();
      $http.post("/user/register", user).then(function(res) {
        setToken(res.data);
        setUser();
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.login = function(user) {
      var q = $q.defer();
      $http.post("/user/login", user).then(function(res) {
        setToken(res.data);
        setUser();
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.logout = function() {
      removeToken();
      removeUser();
    };

    function setUser() {
      var user = JSON.parse(urlBase64Decode(getToken().split(".")[1]));
      o.status.username = user.username;
      o.status._id = user._id;
			o.status.email = user.email;
			o.status.prospects = user.prospects;
			o.status.drafts = user.drafts;
			o.status.profilePic = user.profilePic;
			o.status.joined = user.joined;
    }

    function removeUser() {
      o.status = {};
    }

    function getToken() {
      return localStorage.getItem("token");
    }

    function setToken(token) {
      return localStorage.setItem("token", token);
    }

    function removeToken() {
      return localStorage.removeItem("token");
    }

    function urlBase64Decode(str) {
      var output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0:
          {
            break;
          }
        case 2:
          {
            output += '==';
            break;
          }
        case 3:
          {
            output += '=';
            break;
          }
        default:
          {
            throw 'Illegal base64url string!';
          }
      }
      return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
    }

    if(getToken()) setUser();
    return o;
	}
})();
