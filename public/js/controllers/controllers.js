'use strict';

mainApp.controller('mainController',['$scope','WidgetListObj', function($scope, WidgetListObj) {
    WidgetListObj.initList([
        {
            name: "widget1",
            key1: "123",
            key2: "abc"
        },
        {
            name: "widget2",
            key1: "12345",
            key2: "abcde"
        },
        {
            name: "widget3",
            key1: "111",
            key2: "aaa"
        },
        {
            name: "widget4",
            key1: "222",
            key2: "bbb"
        }
    ]);
}]);

mainApp.controller('widgetSummaryController',['$scope','$modal','WidgetListObj', function($scope, $modal, WidgetListObj) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
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
}]);

mainApp.controller('removeWidgetController',['$scope','$modalInstance', function ($scope, $modalInstance) {



    $scope.ok = function (index,widgetList) {
        $modalInstance.close();

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

mainApp.controller('widgetDetailsController',['$scope','$stateParams','WidgetListObj', function($scope, $stateParams, WidgetListObj) {
    $scope.widgetDetails = WidgetListObj.getWidgetDetails($stateParams.id);

    $scope.inDetailsMode = function(){
      var showDetails = false;
      //check if there is a number after the hash tag and we are in show widget details mode
      if(window.location.hash.split('/')[1].length>0)
      {
          showDetails =  true;
      }
        return showDetails;
    };
}]);

