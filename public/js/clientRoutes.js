var mainApp = angular.module('mainApp', ['ui.router','ui.bootstrap','ngAnimate']);

// configure our routes
mainApp.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider

        .state('index', {
            url:'/:id',
            views: {
                'widgetSummary': {
                    templateUrl : '/views/widgetSummary.html',
                    controller: 'widgetSummaryController'
                },
                'widgetDetails': {
                    templateUrl : '/views/widgetDetails.html',
                    controller: 'widgetDetailsController'
                }
            }

        })

        .state('edit', {
            url:'/edit',
            templateUrl : '/views/edit.html',
            controller: 'editController'
        })



}]).constant('API_URL','http://'+ window.location.host);

