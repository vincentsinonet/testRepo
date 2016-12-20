/**
 * Created by eugeneseah on 23/11/16.
 */

const OptionsView = (function () {
    "use strict";
    const ENDOFFSET = 0.05;
    let _background;
    let _touchlayer;

    function OptionsView (parent){
        this._parent = parent;
        _background = new cc.Sprite(ReferenceName.OptionsBG);
        _background.setPosition(cc.view.getDesignResolutionSize().width/2, cc.view.getDesignResolutionSize().height / 2);

        this._music = createSlider("Music", musicValueChangedEvent, PlayerPreferences.getMusicVolume());
        this._sound = createSlider("Sound", soundValueChangedEvent, PlayerPreferences.getSoundVolume());

        this._music.setPosition(_background.getContentSize().width/2 + 47.5,_background.getContentSize().height/2 + 69.2);
        this._sound.setPosition(_background.getContentSize().width/2 + 47.5,_background.getContentSize().height/2 + 4.1);

        _touchlayer = new TouchLayerRefactored(dismissCallback);
        _touchlayer.setSwallowTouches(true);

        _background.addChild(_touchlayer);
        _background.addChild(this._music);
        _background.addChild(this._sound);
        this._parent.addChild(_background,1);
    }

    function createSlider(labelText, callback, value){
        let slider = new cc.ControlSlider(ReferenceName.OptionBarBG, ReferenceName.OptionsBarNegative, ReferenceName.FishSliderButton);
        slider._thumbSprite.setFlippedX(true);
        slider._thumbSprite.setFlippedY(true);
        slider._progressSprite.setFlippedX(true);
        slider._progressSprite.setFlippedY(true);
        slider._backgroundSprite.setFlippedX(true);
        slider._backgroundSprite.setFlippedY(true);
        slider.setMinimumValue(0.0); // Sets the min value of range
        slider.setMinimumAllowedValue(ENDOFFSET);
        slider.setValue(value || ENDOFFSET);
        slider.setMaximumValue(1+ENDOFFSET); // Sets the max value of range
        slider.setRotation(180);

        let fontDef = new cc.FontDefinition();
        fontDef.fontName = "Arial";
        fontDef.fontSize = "30";
        fontDef.fontStyle = "bold";
        fontDef.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        fontDef.fillStyle = new cc.Color(0,0,0,255);
        let label = new cc.LabelTTF(labelText, fontDef);
        label.setPosition(slider.getContentSize().width +130, slider.getContentSize().height/2);
        label.setAnchorPoint(0,0.5);
        label.setRotation(180);

        slider.addChild(label);
        slider.addTargetWithActionForControlEvents(OptionsView, callback, cc.CONTROL_EVENT_VALUECHANGED);

        slider.setScaleX(1.01);

        return slider;
    }

    function musicValueChangedEvent(sender, controlEvent){
        PlayerPreferences.setMusicVolume(sender.getValue()); // because it saves convert on load
        cc.audioEngine.setMusicVolume(sender.getValue().toFixed(2)-ENDOFFSET);// because it is flipped
    }

    function soundValueChangedEvent(sender, controlEvent){
        PlayerPreferences.setSoundVolume(sender.getValue());
        cc.audioEngine.setEffectsVolume(1 - (sender.getValue().toFixed(2)-ENDOFFSET)); // because it is flipped
    }

    function dismissCallback(touch){
        if (GUIFunctions.isSpriteTouched(_background,touch)) {
            return;
        }
        // _touchlayer.setSwallowTouches(false);
        _touchlayer.setEnable(false);
        _background.setVisible(false);
    }

    let proto = OptionsView.prototype;

    proto.show = function(){
        // _touchlayer.setSwallowTouches(true);
        _touchlayer.setEnable(true);
        _background.setVisible(true);
    };
    return OptionsView;
}());