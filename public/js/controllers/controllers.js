'use strict';

mainApp.controller('mainController',['$scope','WidgetListObj','$http', function($scope, WidgetListObj, $http) {

    //Load mock data
    $http.get('js/data.json').success(function(data) {
        WidgetListObj.initList(data);
    });

}]);

mainApp.controller('widgetSummaryController',['$scope','$modal','WidgetListObj','localStorageDB','$location', function($scope, $modal, WidgetListObj, localStorageDB, $location) {

    /*Get widget list*/
    $scope.widgetList = WidgetListObj.getWidgetList();

    /*Remove widget from the widget list*/
    $scope.remove = function(index,id){
        /*Open small dialog to ask the user about the remove operation*/
        var modalInstance = $modal.open({
            templateUrl: '../views/removeWidget.html',
            controller: 'removeWidgetController',
            size: 'sm'
        });

        modalInstance.result.then(function () {
            WidgetListObj.removeWidget(index);
            localStorageDB.delete(id);
            $location.path(window.location.origin);
        });
    };

}]);

mainApp.controller('editController',['$scope','WidgetListObj', function($scope,WidgetListObj) {
    $scope.editWidget = function(widgetDetails){
        if(window.location.hash.split('/')[2].length>0){
            WidgetListObj.editWidget(window.location.hash.split('/')[2],widgetDetails);
        }
        else{
            WidgetListObj.addNewWidget(widgetDetails);
        }

    };
}]);

mainApp.controller('removeWidgetController',['$scope','$modalInstance', function ($scope, $modalInstance) {



    $scope.ok = function (index,widgetList) {
        $modalInstance.close();

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

mainApp.controller('widgetDetailsController',['$scope','$stateParams','WidgetListObj','$location', function($scope, $stateParams, WidgetListObj, $location) {
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

    $scope.closeDetails = function(){
        $location.path(window.location.origin);
    };
}]);

