'use strict';

mainApp.controller('mainController',['$scope','WidgetListObj', function($scope, WidgetListObj) {
    WidgetListObj.initList(["widget1","widget2","widget3","widget4"]);
}]);

mainApp.controller('homepageController',['$scope','$modal','WidgetListObj', function($scope, $modal, WidgetListObj) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    /*WidgetListObj.initList(["widget1","widget2","widget3","widget4"]);*/
    $scope.widgetList = WidgetListObj.getWidgetList();


    $scope.remove = function(index,widgetList){
        var modalInstance = $modal.open({
            templateUrl: '../views/removeWidget.html',
            controller: 'removeWidgetController',
            size: 'sm'

        });
        modalInstance.result.then(function () {
            WidgetListObj.removeWidget(index);
        }, function () {

        });
    };

}]);

mainApp.controller('editController',['$scope', function($scope) {
    $scope.message = 'Look! I am an about page.';
    $scope.pageClass = 'page-about';
}]);

mainApp.controller('removeWidgetController',['$scope','$modalInstance', function ($scope, $modalInstance) {



    $scope.ok = function (index,widgetList) {
        $modalInstance.close();

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

mainApp.controller('widgetDetailsController',['$scope', function($scope) {
    $scope.message = 'Look! I am widget Details page.';
}]);

