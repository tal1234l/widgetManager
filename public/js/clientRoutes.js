var mainApp = angular.module('mainApp', ['ui.router','ui.bootstrap','ngAnimate']);

// configure our routes
mainApp.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider

        // route for the home page
        .state('index', {
            url:'/:id',
            views: {
                'homePage': {
                    templateUrl : '/views/homepage.html',
                    controller: 'homepageController'
                },
                'widgetDetails': {
                    templateUrl : '/views/widgetDetails.html',
                    controller: 'widgetDetailsController'
                }
            }

        })

        // route for the edit page
        .state('edit', {
            url:'/edit',
            templateUrl : '/views/edit.html',
            controller: 'editController'
        })



}]).constant('API_URL','http://'+ window.location.host);

