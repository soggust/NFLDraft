(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Register',{
			url: '/',
			templateUrl: 'views/register.html'
		}).state('News',{
			url: '/',
			templateUrl: 'views/news.html'
		}).state('BigBoard',{
			url: '/',
			templateUrl: 'views/bigboard.html'
		}).state('Create',{
			url: '/',
			templateUrl: 'views/create.html'
		}).state('Drafts',{
			url: '/',
			templateUrl: 'views/drafts.html'
		}).state('EditDraft',{
			url: '/',
			templateUrl: 'views/editdraft.html'
		}).state('ViewDraft',{
			url: '/',
			templateUrl: 'views/viewdraft.html'
		}).state('Community',{
			url: '/',
			templateUrl: 'views/community.html'
		}).state('Account',{
			url: '/',
			templateUrl: 'views/account.html'
		});

		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push("AuthInterceptor");
	}
})();
