/**
 * Created by eugeneseah on 3/11/16.
 */

var FishViewManager = (function(){

    var FishViewManager = function(parent, fishGameArena){
        // console.log

        cc.spriteFrameCache.addSpriteFrames(res.SquidPlist);
        cc.spriteFrameCache.addSpriteFrames(res.PufferfishPlist);
        cc.spriteFrameCache.addSpriteFrames(res.TurtlePlist);
        cc.spriteFrameCache.addSpriteFrames(res.PorgyPlist);
        cc.spriteFrameCache.addSpriteFrames(res.StingrayPlist);
        // FishAnimationData();
        FishAnimationData.initialise();

        this._parent = parent;
        this._fishes = {};
        this._fishGameArena = fishGameArena;




    };

    var proto = FishViewManager.prototype;

    proto.addFish = function(fishId, fishType){
        // this._fishes[fishId] = new FishView(this._parent, fishType);
        // return this._fishes[fishId];

        //debug version:
        var parent = new cc.Node();
        this._parent.addChild(parent);
        new FishView(parent, fishType);
        this._fishes[fishId] = parent;
        return this._fishes[fishId];

    };

    proto.getFish = function(id){
        return this._fishes[id];
    };
    
    proto.removeFish = function (id) {
        this._parent.removeChild(this._fishes[id]);
        delete this._fishes[id];
    };

    proto.update = function () {
        for ( var fishId in this._fishes){
            var fishModel = this._fishGameArena.getFish(fishId);
            if (fishModel) {
                //console.log(`Moving fish ${this.FishID} to ${fishModel.position}`);
                this._fishes[fishId].setPositionX(fishModel.position[0]);
                this._fishes[fishId].setPositionY(fishModel.position[1]);
                this._fishes[fishId].setRotation(180 - fishModel.angle * 180 / Math.PI);
            }
        }
    };

    proto.destroyView = function(){
        for ( var fishId in this._fishes){
            var fishModel = this._fishGameArena.getFish(fishId);
            if (fishModel) {
                this._parent.removeChild(fishModel);
                delete fishModel;
            }
        }

    };
    return FishViewManager;
})();