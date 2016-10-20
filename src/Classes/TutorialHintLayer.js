var TutorialHintLayer = cc.Layer.extend({
    hint:null,
    hintFile:null,
    aDelegate:null,
    callBackSel:null,
    canClose:false,
    getCanClose:function () {
        return this.canClose;
    },
    setCanClose:function (v) {
        this.canClose = v;
    },

    initWithHintFile:function (fileName, delegate, sel) {
        if (this.init()) {
            this.aDelegate = delegate;
            this.hintFile = fileName;
            this.callBackSel = sel;
            this.initViews();
            this.canClose = false;
            return true;
        }

        return false;
    },
    onEnter:function () {
        cc.Layer.prototype.onEnter.call(this);
        this.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(this.permitClose, this)));
    },
    setVisible:function (v) {
        this._super();
        this.canClose = false;
        this.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(this.permitClose, this)));
    },
    permitClose:function () {
        this.canClose = true;
    },
    initViews:function () {
        var bg = new cc.Sprite("#ui_other_021.png");
        var bgSizeHalf = bg.getContentSize();
        bgSizeHalf.width /= 2;
        bgSizeHalf.height /= 2;

        this.addChild(bg);
        bg.setPosition(VisibleRect.center());

        this.hint = new cc.LabelTTF(this.hintFile, "Arial", 32, new cc.Size(320, 150), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER); //todo(cjh) need to modify position

        bg.addChild(this.hint);
        this.hint.setPosition(cc.p(bgSizeHalf.width, bgSizeHalf.height));

        var close = new cc.MenuItemSprite(new cc.Sprite("#button_other_012.png"),
            new cc.Sprite("#button_other_013.png"), this.clickClose, this);

        var fish = new cc.MenuItemSprite(new cc.Sprite("button_help_02.png"),
            new cc.Sprite("#button_help_02.png"), this.clickFish, this);

        var menu = new cc.Menu(close, fish);
        menu.setPosition(0, 0);
        close.setPosition(cc.p(bgSizeHalf.width * 2, bgSizeHalf.height * 2));
        var fishSize = fish.getContentSize();
        fish.setPosition(cc.p(bgSizeHalf.width * 2 - fishSize.width, fishSize.height / 2));
        bg.addChild(menu);
    },
    clickClose:function (sender) {
        if (this.aDelegate != null) {
            this.callBackSel.call(this.aDelegate);
        }

        this.removeAllChildrenWithCleanup(true);
        this.removeFromParent(true);
    },
    clickFish:function (sender) {
    }
});



