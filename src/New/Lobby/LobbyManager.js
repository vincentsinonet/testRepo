/**
 * Created by eugeneseah on 15/11/16.
 */
const LobbyManager = (function () {
    "use strict";

    let _lobbyTheme;

    const LobbyManager = function (playerData,  onGameSelectedCallback) {
        _lobbyTheme = ThemeDataManager.getThemeDataList("LobbyData");

        const plists = ResourceLoader.getPlists("Lobby");
        for ( let list in plists){
            cc.spriteFrameCache.addSpriteFrames(plists[list]);
        }
        this._parent = parent;
        this.displayView(playerData, onGameSelectedCallback);
    };

    const proto = LobbyManager.prototype;

    proto.displayView = function(playerData, onGameSelectedCallback){
        if (this._view){
            this._view.destroyView();
        }
        this._view = new LobbyView(playerData, _lobbyTheme, onGameSelectedCallback);
    };

    proto.resetView = function(){
        this._view.resetView();
    };

    proto.updateView = function(playerData){
        this._view.updatePlayerData(playerData);
    };


    return LobbyManager;
}());