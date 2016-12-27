/**
 * Created by eugeneseah on 17/11/16.
 */

const OptionsManager = (function (){

    let _settingsCallback;
    let _fishListCallBack;
    let _exitCallBack;
    let _parent;

    function OptionsManager(parent, settingsCallback, fishListCallback, exitCallback, gameConfig) {
        _parent = parent;
        _settingsCallback = settingsCallback;
        _fishListCallBack = fishListCallback;
        _exitCallBack = exitCallback;
        cc.spriteFrameCache.addSpriteFrames(res.SideMenuPlist);
        cc.spriteFrameCache.addSpriteFrames(res.BottomMenuPlist);
        cc.spriteFrameCache.addSpriteFrames(res.SettingsUIPlist);

        if (gameConfig && gameConfig.isUsingOldCannonPositions)
            this.view = new OptionsSideMenuView(parent, onSettings, onFishList, onExitButton);
        else{
            this.view = new OptionsMenuViewBottom(parent, onSettings, onFishList, onExitButton);
        }

    }

    function onSettings(){
        if (!this._settingsView)
            this._settingsView = new OptionsView(_parent);
        else{
            this._settingsView.show();
        }
        if (_settingsCallback) {
            _settingsCallback();
        }
    }

    function onFishList(){
        if (_fishListCallBack) {
            _fishListCallBack();
        }
    }

    function onExitButton(){
        if (_exitCallBack) {
            _exitCallBack ();
        }
    }
    
    OptionsManager.prototype.destroyView = function () {
        this.view.destroy();
    };

    return OptionsManager;
})();