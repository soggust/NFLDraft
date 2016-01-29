(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	function UserFactory($http, $q) {
		var o = {};
    var token = getToken();

    o.status = {};

    if(token){
    	var user = o.getUser();
    	o.status.username = user.username;
    	o.status._id = user._id;
    	o.status.bio = user.bio;
    }

	  if(getToken()) setUser();



		return o;
	}
})();
