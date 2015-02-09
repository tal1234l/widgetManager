angular.module('mainApp').directive("superman", function() {
    return {
        restrict: "E",
        template: "<div>Here I am to save the day</div>"
    };
});


/*
template: ['<div class="form-group">',
    '<input class="col-xs-5 col-md-5 keyValueStyle" ng-class="{red: editWidgetForm.key2.$dirty && editWidgetForm.key2.$invalid}" name="key2" ng-model="widgetDetails.key2" type="text" class="form-control" id="key2" placeholder="Enter key2" required>',
    '<input class="col-xs-5 col-md-5 keyValueStyle" name="key2_value" ng-model="widgetDetails.key2_value" type="text" class="form-control" id="key2_value" placeholder="Enter value" required></br>',
    '</div>','<p class="help-block" ng-show="editWidgetForm.key2.$dirty && editWidgetForm.key2.$invalid">Please enter value for key2</p>'
].join()*/
