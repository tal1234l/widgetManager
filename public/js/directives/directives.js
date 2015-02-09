angular.module('mainApp').directive("keyValue", function() {
    return {
        restrict: "E",
        template: ['<div class="form-group keyValue">'+'<label class="keyValue">Key: </label>'+
            '<input id=key{{$index+1}} name=key1 ng-model="item.key" class="col-xs-5 col-md-5 keyValueStyle" type="text" class="form-control" placeholder="Enter key{{$index+1}}" required>'+
            '<label class="keyValue">Value: </label>'+
            '<input class="col-xs-5 col-md-5 keyValueStyle" type="text" class="form-control" placeholder="Enter value" required></br>'+
            '<button ng-show="$first && keysCount === 1 || $last" type="button"  class="btn btn-success keyValueButton" ng-click="addKeyValue()">+</button>'+
            '<button ng-hide="$first && keysCount === 1" type="button"  class="btn btn-danger keyValueButton" ng-click="removeKeyValue($index)">-</button></div>'+
            '<p class="HelpMessage" ng-show="editWidgetForm.key1.$dirty && !item.key">Please enter value for key{{$index+1}}</p>'
        ].join()
    };
});


/*
template: ['<div class="form-group">',
    '<input class="col-xs-5 col-md-5 keyValueStyle" ng-class="{red: editWidgetForm.key2.$dirty && editWidgetForm.key2.$invalid}" name="key2" ng-model="widgetDetails.key2" type="text" class="form-control" id="key2" placeholder="Enter key2" required>',
    '<input class="col-xs-5 col-md-5 keyValueStyle" name="key2_value" ng-model="widgetDetails.key2_value" type="text" class="form-control" id="key2_value" placeholder="Enter value" required></br>',
    '</div>','<p class="help-block" ng-show="editWidgetForm.key2.$dirty && editWidgetForm.key2.$invalid">Please enter value for key2</p>'
].join()*/
