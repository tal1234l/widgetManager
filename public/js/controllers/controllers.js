'use strict';

mainApp.controller('mainController',['$scope','WidgetListObj','$http', function($scope, WidgetListObj, $http) {

   /* $http.get('js/data.json').success(function(data) {
        debugger;
        $scope.data = data;
    });*/

    WidgetListObj.initList([
        {
            name: "widget1",
            id:"a626d529-6dd6-4977-8d6a-b5fdc411fe78",
            key1: "123",
            key2: "abc111",
            key3: "abc54",
            key4: "abc65",
            key5: "abc57"

        },
        {
            name: "widget2",
            id:"709ef0a7-0dc0-4737-85f4-e5408519ff9f",
            key1: "12345",
            key2: "abcde",
            key3: "abc22",
            key4: "abc231",
            key5: "abc4353"
        },
        {
            name: "widget3",
            id:"3aa27035-53b1-435d-ad6f-c27cb8114ad3",
            key1: "111",
            key2: "aaa877",
            key3: "abc6876",
            key4: "abc980",
            key5: "abc345"
        },
        {
            name: "widget4",
            id:"f0ed056f-1cc8-44e3-8731-9478c475d1ae",
            key1: "222",
            key2: "bbb7890",
            key3: "abc678",
            key4: "abc890",
            key5: "abc123"
        }
    ]);
}]);

mainApp.controller('widgetSummaryController',['$scope','$modal','WidgetListObj','localStorageDB', function($scope, $modal, WidgetListObj, localStorageDB) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.widgetList = WidgetListObj.getWidgetList();


    $scope.remove = function(index,id){
        var modalInstance = $modal.open({
            templateUrl: '../views/removeWidget.html',
            controller: 'removeWidgetController',
            size: 'sm'
        });

        modalInstance.result.then(function () {
            WidgetListObj.removeWidget(index);
            localStorageDB.delete(id);
        }, function () {

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

