//Manage theme data.
const ThemeDataManager = (function () {
    "use strict";
    const _themeData = {};
    function setThemeData(type, data){
        _themeData[type] = _themeData[type] || [];
        for (let i in data){
            _themeData[type][i] =data[i];
        }
    }

    function getThemeDataList(type){
        return _themeData[type];
    }

    function loadFishesResources(){

    }

    return {
        setThemeData : setThemeData,
        getThemeDataList : getThemeDataList,
        loadFishesResources: loadFishesResources
    }
})();