//////////////////////////////////////////////////////////////////////////
// implement VisableRect
//////////////////////////////////////////////////////////////////////////

var cocos2dApp = cc.game.onStart = function() {
    // if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
    //     document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(1366, 768, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources

    // var scene = LogoScene.scene();

    ClientServerConnect.connectToMasterServer().then(
        data => {
            const themeConfig = data.themeConfig;
            console.log(themeConfig);
            for (let i = 0; i < themeConfig.resourceList.length; i++) {
                for (let j = 0; j < themeConfig[themeConfig.resourceList[i]].length; j++) {
                    // console.log("themeConfig.resourceList.length:", themeConfig.resourceList.length, "themeConfig[themeConfig.resourceList[i]].length", themeConfig[themeConfig.resourceList[i]].length,i,j,themeConfig[themeConfig.resourceList[i]], themeConfig[themeConfig.resourceList[i]][j]);
                    ResourceLoader.addResource(themeConfig.folderName, themeConfig.resourceList[i], themeConfig[themeConfig.resourceList[i]][j]);
                }
            }

            for (let i = 0; i < themeConfig.resourceList.length; i++) {
                // for (let j = 0; j < themeConfig[themeConfig.resourceList[i]].length; j++) {
                for (let j in themeConfig[themeConfig.themeList[i]] ){
                    // console.log(i,j,themeConfig.themeList[i],themeConfig[themeConfig.themeList[i]],themeConfig[themeConfig.themeList[i]][j]);
                    ThemeDataManager.setThemeData(themeConfig.themeList[i],themeConfig[themeConfig.themeList[i]]);
                }
            }

            ResourceLoader.finaliseResources();

            cc.LoadingScreen.preload(ResourceLoader.getResourceList(), function () {
                // cc.director.runScene(new LogoScene());
                 //cc.director.runScene(new TestScene());
                // cc.director.runScene(new StartMenuLayer());

                AppManager.goToLobby();
                FishAnimationData.setData(themeConfig.FishRawData);
            }, this);
        }
    ).catch(console.error.bind(console));
};

cc.game.run();

