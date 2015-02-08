'use strict';

mainApp.controller('mainController',['$scope','WidgetListObj','$http', function($scope, WidgetListObj, $http) {

    //Load mock data
   /* $http.get('js/data.json').success(function(data) {
        WidgetListObj.initListWithMockData(data);
    });*/

    //Load data from local storage
    WidgetListObj.initListFromLocalStorage();

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

mainApp.controller('editController',['$scope','WidgetListObj','localStorageDB', function($scope, WidgetListObj, localStorageDB) {
    $scope.editWidget = function(widgetDetails){
        if(window.location.hash.split('/')[2].length>0){
            WidgetListObj.editWidget(window.location.hash.split('/')[2],widgetDetails);
        }
        else{
            WidgetListObj.addNewWidget(widgetDetails);
        }

    };

    $scope.isNameUnique = function(name){
        //check that the name is unique and enable the user to keep the existing name
        var widgetName, widgetId = location.hash.split('/')[2] ;
        debugger;
        if(widgetId !==null)
        {
            widgetName = localStorageDB.getName(widgetId);
        }

        if(widgetName !== null && widgetName === name)
            return false;
        else
            return localStorageDB.checkName(name);
    };
}]);

mainApp.controller('removeWidgetController',['$scope','$modalInstance', function ($scope, $modalInstance) {
    $scope.ok = function () {
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

