angular.module('mainApp').factory('WidgetListObj',['uniqueId','localStorageDB', function(uniqueId, localStorageDB) {
    var WidgetList = [];

    return {

        initListFromLocalStorage: function(){
            //initialize data from local storage
            var keyArray = localStorageDB.getAllKeys();
            keyArray.forEach(function(item) {
                delete item["$$hashKey"];
                WidgetList.push(item);
            });
        },

        editWidget: function(id,name,keys) {
            var index=0, index = this.findIndex(id);
            if(index > -1)
            {
                WidgetList[index].keys = keys;
                WidgetList[index].name = name;
            }
            localStorageDB.set(WidgetList[index]);
        },

        removeWidget: function(index){
            WidgetList.splice(index,1);
        },

        getWidgetList: function(){
            return WidgetList;
        },

        getWidgetDetails: function(id){
            var index = this.findIndex(id);
            if (index > -1)
            {
                return WidgetList[index];
            }
            else
            {
                return null;
            }

        },
        addNewWidget: function(name, keys){
            var newWidget = {};
            newWidget.id = uniqueId.generateUniqueId();
            newWidget.name = name;
            newWidget.keys = keys;
            WidgetList.push(newWidget);
            localStorageDB.set(newWidget);
        },
        findIndex: function(id){
            var index = -1, i;
            for(i=0; i<WidgetList.length;i++)
            {
                if(WidgetList[i].id === id)
                    index = i;
            }
            return index;
        }
    };

}]);

angular.module('mainApp').service('uniqueId',[ function uniqueId(){

    // http://www.ietf.org/rfc/rfc4122.txt
    this.generateUniqueId = function(){
        var s = [];
        var hexDigits = '0123456789abcdef';
        var i;
        for (i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = '4';
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('');
    };
}]);

angular.module('mainApp').service('localStorageDB',[ function localStorageDB(){

    // http://www.ietf.org/rfc/rfc4122.txt
    this.set = function(widgetDetails){
        localStorage.setItem("WidgetManager."+widgetDetails.id, JSON.stringify(widgetDetails));
    };
    this.get = function(widgetId){
        return localStorage.getItem(widgetId);
    };
    this.getName = function(widgetId){
        if(localStorage.getItem("WidgetManager."+widgetId)!== null)
            return JSON.parse(localStorage.getItem("WidgetManager."+widgetId)).name;
        return null;
    };
    this.getWidgetDetails = function(widgetId){
        if(localStorage.getItem("WidgetManager."+widgetId)!== null)
            return JSON.parse(localStorage.getItem("WidgetManager."+widgetId));
        return null;
    };
    this.getAllKeys = function(){
        var i,key, keyArray= [];
        for (i = (localStorage.length - 1); i >=0 ; i--) {
            key = localStorage.key(i);
            if(key.split('.')[0] === "WidgetManager"){
                keyArray.push(JSON.parse(localStorage.getItem(key)));
            }
        }//for loop
        return keyArray;
    };
    this.delete = function(widgetId){
            delete localStorage["WidgetManager."+widgetId];

    };
    this.checkName = function(widgetName){
        var exists = false;
        var i, keyArray = this.getAllKeys();
        for(i=0; i<keyArray.length; i++){
            if(keyArray[i].name === widgetName)
            {
                exists = true;
            }
        }
        return exists;
    };
}]);
