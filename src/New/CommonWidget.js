//add the common widget for game

let PlayerInfoWidget = cc.Node.extend({
    _lbPlayerName: null,
    _lbPlayerCredit: null,
    ctor: function(playerInfo){
        cc.Node.prototype.ctor.call(this);

        //load spriteFrame
        if(!cc.spriteFrameCache.getSpriteFrame(ReferenceName.NameBG)){
            cc.spriteFrameCache.addSpriteFrames(res.LobbyUIPlist);
        }

        //register event listener to update player info
        //(bg size = 190 x 48)

        const spPlayerNameBg = new cc.Sprite(ReferenceName.NameBG);
        spPlayerNameBg.setPosition(95, 0);
        this.addChild(spPlayerNameBg);

        const lbPlayerName = this._lbPlayerName = new cc.LabelTTF(playerInfo.playerState.displayName, "Arial", 22);
        lbPlayerName._setFontWeight("bold");
        lbPlayerName.enableStroke(new cc.Color(0, 0, 0, 255), 2);
        spPlayerNameBg.addChild(lbPlayerName);
        lbPlayerName.setPosition(95, 24);

        //bg size (237 x 48)
        const spPlayerCreditBg = new cc.Sprite(ReferenceName.LobbyCoinsBG);
        spPlayerCreditBg.setPosition(315, 0);
        this.addChild(spPlayerCreditBg);

        const lbPlayerCredit = this._lbPlayerCredit = new cc.LabelTTF("0", "Arial", 30);
        lbPlayerCredit._setFontWeight("bold");
        lbPlayerCredit.setFontFillColor(new cc.Color(255, 205, 60, 255));
        lbPlayerCredit.enableStroke(new cc.Color(90, 24, 8, 255), 3);
        spPlayerCreditBg.addChild(lbPlayerCredit);
        lbPlayerCredit.setPosition(119, 24);

        this.updatePlayerCredit(playerInfo.playerState.score);
    },

    updatePlayerCredit: function(playerCredit){
        if(!playerCredit)
            playerCredit = 0;
        this._lbPlayerCredit.setString(playerCredit.toLocaleString('en-US', {maximumFractionDigits: 2}));
    },

    updatePlayerName: function(playerName){
        if(!playerName)
            return;
        this._lbPlayerName.setString(playerName);
    }
});


//Floating Menu
let GameFloatingMenu = cc.Node.extend({
    _btnSetting: null,
    _btnAssets: null,
    _btnProfile: null,
    _btnLeaderBoard: null,
    _btnFAQ: null,

    ctor: function(){
        cc.Node.prototype.ctor.call(this);

        //padding = 120
        let paddingWidth = 70;
        //load menu sprite frame
        if(!cc.spriteFrameCache.getSpriteFrame(ReferenceName.FloatingMenuButtonSettingsIcon))
            cc.spriteFrameCache.addSpriteFrames(res.MenuPlist);

        let btnSetting = this._btnSetting = new FloatMenuItem(ReferenceName.FloatingMenuButtonSettingsIcon,
            ReferenceName.FloatingMenuButtonBackground, ReferenceName.FloatingMenuButtonBackgroundDown,
            ReferenceName.FloatingMenuButtonSettingsText,
            function(){
                //show setting panel
            });
        btnSetting.setPosition(0, 0);
        this.addChild(btnSetting);

        let btnAssets = this._btnAssets = new FloatMenuItem(ReferenceName.FloatingMenuButtonGameLogIcon,
            ReferenceName.FloatingMenuButtonBackground, ReferenceName.FloatingMenuButtonBackgroundDown,
            ReferenceName.FloatingMenuButtonGameLogText,
            function(){
                //show assets panel
            });
        btnAssets.setPosition(paddingWidth, 0);
        this.addChild(btnAssets);

        let btnProfile = this._btnProfile = new FloatMenuItem(ReferenceName.FloatingMenuButtonInfoIcon,
            ReferenceName.FloatingMenuButtonBackground, ReferenceName.FloatingMenuButtonBackgroundDown,
            ReferenceName.FloatingMenuButtonInfoText, function(){

            });
        btnProfile.setPosition(paddingWidth * 2, 0);
        this.addChild(btnProfile);

        let btnLeaderBoard = this._btnLeaderBoard = new FloatMenuItem(ReferenceName.FloatingMenuButtonLeaderboardIcon,
            ReferenceName.FloatingMenuButtonBackground, ReferenceName.FloatingMenuButtonBackgroundDown,
            ReferenceName.FloatingMenuButtonLeaderboardText, function(){
                //show the
            });
        btnLeaderBoard.setPosition(paddingWidth * 3, 0);
        this.addChild(btnLeaderBoard);

        let btnFAQ = this._btnFAQ = new FloatMenuItem(ReferenceName.FloatingMenuButtonFAQIcon,
            ReferenceName.FloatingMenuButtonBackground, ReferenceName.FloatingMenuButtonBackgroundDown,
            ReferenceName.FloatingMenuButtonFAQText, function(){
                //show the faq
            });
        btnFAQ.setPosition(paddingWidth * 4, 0);
        this.addChild(btnFAQ);
    }
});

let FloatMenuItem = cc.Node.extend({
    _spItemTitle: null,
    _btnItem: null,
    _mouseEventListener: null,
    isMouseDown: false,

    ctor: function(iconSprite, buttonImg, selectedImg, labelImg, clickCallback){
        cc.Node.prototype.ctor.call(this);

        let btnItem = this._btnItem = new ccui.Button(buttonImg, selectedImg, undefined, ccui.Widget.PLIST_TEXTURE);
        btnItem.setTouchEnabled(true);
        this.addChild(btnItem);
        btnItem.addClickEventListener(clickCallback);
        const buttonSize = btnItem.getContentSize();

        let spItemIcon = new cc.Sprite(iconSprite);
        spItemIcon.setPosition(buttonSize.width * 0.5, buttonSize.height * 0.5 - 10);
        btnItem.addChild(spItemIcon);

        let spItemTitle = this._spItemTitle = new cc.Sprite(labelImg);
        spItemTitle.setPosition(buttonSize.width * 0.5, 0);
        btnItem.addChild(spItemTitle);
        spItemTitle.setTag(9);

        let self = this;
        //add mouse event
        this._mouseEventListener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(mouseData){
                let target = mouseData.getCurrentTarget();
                target.isMouseDown = true;
            },
            onMouseMove: function(mouseData){
                let target = mouseData.getCurrentTarget(), spTitle = target.getChildByTag(9);
                if(!spTitle)
                    return;
                if (!target.isMouseDown){
                    if (cc.rectContainsPoint(cc.rect(0, 0, target._contentSize.width, target._contentSize.height),
                            target.convertToNodeSpace(mouseData.getLocation()))) {
                        //scale to 1.2
                        spTitle.setScale(1.2);
                        return;
                    }
                }
                //scale to 1.0
                spTitle.setScale(1);
            },
            onMouseUp: function(mouseData){
                let target = mouseData.getCurrentTarget();
                target.isMouseDown = false;
            }
        });
    },

    onEnter: function(){
        cc.Node.prototype.onEnter.call(this);
        if (this._mouseEventListener && !this._mouseEventListener._isRegistered())
            cc.eventManager.addListener(this._mouseEventListener, this._btnItem);
    }
});