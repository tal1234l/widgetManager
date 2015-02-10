angular.module('mainApp').directive("keyValue", function() {
    return {
        restrict: "E",
        template: ['<div class="form-group keyValue">'+'<label class="keyValue">*Key: </label>'+
            '<input id=key{{$index+1}} name=key ng-model="item.key" class="col-xs-5 col-md-5 keyValueStyle" type="text" class="form-control" placeholder="Enter key{{$index+1}}" required>'+
            '<label class="keyValue">Value: </label>'+
            '<input id=value{{$index+1}} name=value ng-model="item.value" class="col-xs-5 col-md-5 keyValueStyle" type="text" class="form-control" placeholder="Enter value" required></br>'+
            '<button ng-show="$first && keysCount() === 1 || $last" type="button"  class="btn btn-success keyValueButton" ng-click="addKeyValue()">+</button>'+
            '<button ng-hide="$first && keysCount() === 1" type="button"  class="btn btn-danger keyValueButton" ng-click="removeKeyValue($index)">-</button></div>'+
            '<p class="HelpMessage" ng-show="editWidgetForm.key.$dirty && !item.key">Please enter value for key{{$index+1}}</p>'+
            '<p class="HelpMessage" ng-show="!checkUniqueKey(item.key)">This key name is already taken in this widget, please choose another name</p>'
        ].join()
    };
});
