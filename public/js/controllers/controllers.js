'use strict';

mainApp.controller('mainController',['$scope','WidgetListObj','$http', function($scope, WidgetListObj, $http) {

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

mainApp.controller('editController',['$scope','WidgetListObj','localStorageDB','$location', function($scope, WidgetListObj, localStorageDB, $location) {

    $scope.keys = [];
    $scope.name ="";

    $scope.init = function () {
        $scope.id = location.hash.split('/')[location.hash.split('/').length-1];

        if($scope.id !== ''){
            var widgetDetails = localStorageDB.getWidgetDetails($scope.id);
            $scope.keys = widgetDetails.keys;
            $scope.name = widgetDetails.name;
        }
        else{
            $scope.keys.push({key:"",value:""});
        }

    };



    $scope.editWidget = function(name){
        if($scope.id !== ''){

            WidgetListObj.editWidget($scope.id,name, $scope.keys);
        }
        else{
            WidgetListObj.addNewWidget(name, $scope.keys);
        }

    };

    $scope.isNameUnique = function(name){
        //check that the name is unique and enable the user to keep the existing name
        var widgetName;
        if($scope.id !=='')
        {
            widgetName = localStorageDB.getName($scope.id);
        }

        if(widgetName !== null && widgetName === name)
            return false;
        else
            return localStorageDB.checkName(name);
    };

    $scope.addKeyValue = function(){
        this.keys.push({key:"", value:""});
    };
    $scope.removeKeyValue = function(index){
        this.keys.splice(index,1);
    };
    $scope.keysCount = function(){
        return this.keys.length;
    };
    $scope.checkUniqueKey = function(name){
        var unique = true, count=0;
        this.keys.forEach(function(item){
            if (item.key === name)
            {
                count++;
            }
        });
        if(count > 1)
            unique = false;
        return unique;

    };
    $scope.allKeysValid = function(){
        var status = true;
        this.keys.forEach(function(item){
            if (item.key === "")
            {
                status =  false;
            }
        });
        return status;
    };
    $scope.allKeysAreUnique = function(){
        var i, j, keyToCheck, unique = true, count=0;
        for(i=0; i<this.keys.length; i++)
        {
            count=0;
            keyToCheck = this.keys[i].key;
            for(j=0;j<this.keys.length; j++)
            {
                if(keyToCheck === this.keys[j].key)
                {
                    count++;
                }
                if(count > 1)
                {
                    unique= false;
                    return unique;
                }
            }

        }

        return unique;
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

