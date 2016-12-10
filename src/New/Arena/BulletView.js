/**
 * Created by eugeneseah on 30/11/16.
 */

const BulletView = (function () {
    "use strict";

    const BulletView = function (parent) {
        this._parent = parent;

        this._view = new cc.Sprite(res.BulletPNG);
        this._parent.addChild(this._view);
    };

    const proto = BulletView.prototype;

    proto.setPosition = function (x,y) {
        this._view.setPosition(x,y);
    };

    proto.setRotation = function (rot){
        this._view.setRotation(rot);
    };

    proto.destroyView = function () {
        this._parent.removeChild(this._view);
    };

    return BulletView;

}());