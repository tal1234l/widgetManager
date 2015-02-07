angular.module('mainApp').factory('WidgetListObj', function() {
    var WidgetList = [];

    return {

        initList: function(list){
            list.forEach(function(item) {
                WidgetList.push(item);
            });
        },

        addWidget: function() {
        },

        removeWidget: function(index){
            WidgetList.splice(index,1);
        },

        getWidgetList: function(){
            return WidgetList;
        },

        getWidgetDetails: function(index){
            return WidgetList[index];
        }



    };

});
