(function() {
	'use strict';
	angular.module('app')
	.controller('NewsController', NewsController);

	function NewsController() {
		var vm = this;

		vm.date = new Date();
	}
})();
