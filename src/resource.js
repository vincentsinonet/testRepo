
cc.loader.register(["sprite"], cc._binaryLoader); //register sprite file loader.



var res = {
    LoadingLogo : "res/loadingLogo.jpg",
    waterCausticsFSH : `src/New/Shaders/WaterCaustics/waterCaustics.fsh`,
    waterCausticsVSH : "src/New/Shaders/WaterCaustics/waterCaustics.vsh",
    // LoadingAdBg : "res/LoadingAdBg.jpg",
    // LoadingCompanyLogoScreen : "res/MainBg.jpg",
    //
    // AchievementPlist :"res/Achievement.plist",
    // ChestFishPlist: "res/ChestFish.plist",
    //
    // music_1 : "res/music/music_1.ogg",
    // music_2 : "res/music/music_2.ogg",
    // music_3 : "res/music/music_3.ogg",
    // music_4 : "res/music/music_4.ogg",
    // music_5 : "res/music/music_5.ogg",
    // music_6 : "res/music/music_6.ogg",
    //
    // LASER_EFFECT : "res/sound/bgm_laser.ogg",
    // CHANGECANNON_EFFECT : "res/sound/bgm_change_cannon.ogg",
    // CAMERA_EFFECT : "res/sound/bgm_camera.ogg",
    // BOX_EFFECT : "res/sound/bgm_box.ogg",
    //
    // LEVINSTORM_EFFECT : "res/sound/LevinStorm_explode_sound.ogg",
    // ACH_EFFECT : "res/sound/bgm_ach.ogg",
    // COUNTDOWN_EFFECT : "res/sound/3secondscountdown.ogg",
    // GO_EFFECT : "res/sound/bgm_go.ogg",
    // SO_EFFECT : "res/sound/bgm_so.ogg",
    // UI_EFFECT_03 : "res/sound/effect_ui_03.ogg",
    // SURF_EFFECT : "res/sound/bgm_surf.ogg",
    //
    // kBGM_RUNOUTBULLET : "res/sound/bgm_rayover.ogg",
    // COIN_EFFECT1 : "res/sound/bgm_coin_01.ogg",
    // COIN_EFFECT2 : "res/sound/bgm_coin_02.ogg",
    // COIN_EFFECT3 : "res/sound/bgm_coin_03.ogg",
    // FIRE_EFFECT : "res/sound/bgm_fire.ogg",
    // NET_EFFECT : "res/sound/bgm_net.ogg",
    // BUTTON_EFFECT : "res/sound/bgm_button.ogg",
    //
    // startMenuLayerPng: "res/StartMenuLayer.png",
    // StartMenuPlist : "res/StartMenuLayer.plist",
    // LogoScenePng : "res/logoscene.png",
    // LogoScenePlist : "res/logoscene.plist",
    // ButtonsPng : "res/buttons.png",
    // ButtonsPlist : "res/buttons.plist",
    // IconsPng : "res/icons.png",
    // IconsPlist : "res/icons.plist",
    // ChestRewardsPng : "res/chestreward.png",
    // ChestRewardsPlist : "res/chestreward.plist",
    // MainPng : "res/main.png",
    // MainPlist : "res/main.plist",
    // TutorialPng : "res/tutorial.png",
    // TutorialPlist : "res/tutorial.plist",
    //
    // ProbabilityPlist : "res/probability.plist",
    //
    // Track1_1 : "res/Track1_1.plist",
    // Track1_2 : "res/Track1_2.plist",
    // Track1_3 : "res/Track1_3.plist",
    // Track1_4 : "res/Track1_4.plist",
    // Track1_5 : "res/Track1_5.plist",
    // Track1_6 : "res/Track1_6.plist",
    // Track1_7 : "res/Track1_7.plist",
    // Track1_8 : "res/Track1_8.plist",
    // Track1_9 : "res/Track1_9.plist",
    // Track1_10 : "res/Track1_10.plist",
    // Track1_11 : "res/Track1_11.plist",
    // Track1_12 : "res/Track1_12.plist",
    // Track1_13 : "res/Track1_13.plist",
    // Track1_14 : "res/Track1_14.plist",
    // Track1_15 : "res/Track1_15.plist",
    //
    // Track1_21 : "res/Track1_21.plist",
    // Track1_22 : "res/Track1_22.plist",
    // Track1_23 : "res/Track1_23.plist",
    // Track1_24 : "res/Track1_24.plist",
    // Track1_25 : "res/Track1_25.plist",
    //
    // Track2_1 : "res/Track2_1.plist",
    // Track2_2 : "res/Track2_2.plist",
    // Track2_3 : "res/Track2_3.plist",
    // Track2_4 : "res/Track2_4.plist",
    // Track2_5 : "res/Track2_5.plist",
    // Track2_6 : "res/Track2_6.plist",
    // Track2_7 : "res/Track2_7.plist",
    // Track2_8 : "res/Track2_8.plist",
    // Track2_9 : "res/Track2_9.plist",
    // Track2_10 : "res/Track2_10.plist",
    // Track2_11 : "res/Track2_11.plist",
    // Track2_12 : "res/Track2_12.plist",
    // Track2_13 : "res/Track2_13.plist",
    // Track2_14 : "res/Track2_14.plist",
    // Track2_15 : "res/Track2_15.plist",
    //
    // Track2_21 : "res/Track2_21.plist",
    // Track2_22 : "res/Track2_22.plist",
    // Track2_23 : "res/Track2_23.plist",
    // Track2_24 : "res/Track2_24.plist",
    // Track2_25 : "res/Track2_25.plist",
    //
    // FishPng : "res/fish.png",
    // CroakerSprite : "res/croaker.sprite",
    // ChelonianSprite : "res/chelonian.sprite",
    // LanternSprite : "res/lantern.sprite",
    // AngelfishSprite : "res/angelfish.sprite",
    //
    // ProgySprite : "res/progy.sprite",
    // AmphiprionSprite : "res/amphiprion.sprite",
    // PufferSprite : "res/puffer.sprite",
    // RaySprite : "res/ray.sprite",
    // BreamSprite : "res/bream.sprite",
    // SmallFishActorSprite : "res/smallfishactor.sprite",
    //
    // OldSharkPng: "res/shayu.png",
    // SharkSprite : "res/shark.sprite",
    //
    // MarlinPng : "res/marlins.png",
    // MarlinSprite : "res/marlins.sprite",
    //
    // GrouperPng : "res/grouper.png",
    // GrouperSprite : "res/grouper.sprite",
    //
    // GSharkPng : "res/gshayu.png",
    // GSharkSprite : "res/gshayu.sprite",
    //
    // GMarlinPng : "res/gmarlins.png",
    // GMarlinSprite : "res/gmarlins.sprite",
    //
    // OldButterflyPng : "res/butterfly.png",
    // ButterflySprite : "res/butterfly.sprite",
    // PomfretSprite : "res/pomfret.sprite",
    //
    // GoldenTroutPng : "res/goldentrout.png",
    // GoldenTroutSprite: "res/goldentrout.sprite",
    //
    // StarfishPNG : "res/ghaixing.png",
    // StarfishSprite : "res/ghaixing.sprite",
    //
    // CannonPlist : "res/cannon.plist",
    // CannonPng : "res/cannon.png",
    //
    // BulletSprite : "res/bullet.sprite",
    // SmallItemPng : "res/SmallItem.png",
    //
    // JindunPlist : "res/jindun.plist",
    // JindunPng : "res/jindun.png",
    //
    // SuperWeaponButtonPList : "res/SuperWeaponButton.plist",
    // SuperWeaponButtonPNG : "res/SuperWeaponButton.png",
    //
    // HelpUIPlist : "res/help_ui.plist",
    // HelpUIPng : "res/help_ui.png",
    //
    // LaserFonts : "res/fonts_laser_num.png",
    //
    ParticlePlist : "res/particle.plist",
    //
    // lizibianhua1Plist : "res/lizibianhua1.plist",
    // lizibianhua1Png : "res/lizibianhua1.png",
    // lizibianhua2Plist : "res/lizibianhua2.plist",
    // lizibianhua3Plist : "res/lizibianhua3.plist",
    // lizibianhua3Png : "res/lizibianhua3.png",
    //
    // yuwangliziPlist : "res/yuwanglizi.plist",
    // ChestOpeningParticlePlist : "res/kaibaoxiang01.plist",


    // MainUITitle : "res/main_ui_title.png",

    //New
    GameUIPng : "res/New/GameUI.png",
    GameUIPlist : "res/New/GameUI.plist",
    LobbyUIPlist : "res/New/Lobby/LobbyUI.plist",
    LobbyUIPng : "res/New/Lobby/LobbyUI.png",
    ProfileUIPlist : "res/New/Lobby/ProfileUI.plist",
    ProfileUIPng : "res/New/Lobby/ProfileUI.png",
    SettingUIPlist : "res/New/Options/SettingUI.plist",
    SettingUIPng : "res/New/Options/SettingUI.png",
    ScoreboardPlist : "res/New/Scoreboard/Scoreboard.plist",
    ScoreboardPng : "res/New/Scoreboard/Scoreboard.png",
    // SideMenuPlist : "res/New/Options/Options Menu.plist",
    // SideMenuPng : "res/New/Options/Options Menu.png",
    BottomMenuPlist : "res/New/Options/BottomMenu.plist",
    BottomMenuPng : "res/New/Options/BottomMenu.png",
    // LoginUIPlist : "res/New/Lobby/Login.plist",
    // LoginUIPng : "res/New/Lobby/Login.png",

    //GameFrame
    GameFrame : "res/New/InGameFrame.png",

    //GameBackgrounds
    GameBackground0 : "res/New/Game BG/Game BG 1.png",
    GameBackground1 : "res/New/Game BG/Game BG 2.jpg",
    GameBackground2 : "res/New/Game BG/Game BG 3.jpg",
    GameBackground3 : "res/New/Game BG/Game BG 4.jpg",

    //Fish
    StingrayPNG : "res/New/Fish/Ray.png",
    StingrayPlist : "res/New/Fish/Ray.plist",
    PorgyPlist : "res/New/Fish/Porgy.plist",
    PorgyPNG : "res/New/Fish/Porgy.png",
    PufferfishPlist : "res/New/Fish/Puffer.plist",
    PufferfishPNG : "res/New/Fish/Puffer.png",
    LanternPlist : "res/New/Fish/Lantern.plist",
    LanternPng : "res/New/Fish/Lantern.png",
    SquidPNG : "res/New/Fish/Squid.png",
    SquidPlist : "res/New/Fish/Squid.plist",
    TurtlePlist : "res/New/Fish/Chelonian.plist",
    TurtlePNG : "res/New/Fish/Chelonian.png",
    SharkPlist : "res/New/Fish/Shark.plist",
    SharkPng : "res/New/Fish/Shark.png",
    ButterflyPlist : "res/New/Fish/ButterFly.plist",
    ButterflyPng : "res/New/Fish/ButterFly.png",
    GoldSharkPng : "res/New/Fish/GoldShark.png",
    GoldSharkPlist : "res/New/Fish/GoldShark.plist",
    SmallFishPlist : "res/New/Fish/SmallFish.plist",
    SmallFishPng : "res/New/Fish/SmallFish.png",
    AmphiprionPlist : "res/New/Fish/Amphiprion.plist",
    AmphiprionPng : "res/New/Fish/Amphiprion.png",
    AmphiprionBWPlist : "res/New/Fish/AmphiprionBW.plist",
    AmphiprionBWPng : "res/New/Fish/AmphiprionBW.png",
    AngelFishPlist : "res/New/Fish/Angelfish.plist",
    AngelFishPng : "res/New/Fish/Angelfish.png",
    ButterFlyPlist : "res/New/Fish/ButterFly.plist",
    ButterFlyPng : "res/New/Fish/ButterFly.png",
    GrouperFishPlist : "res/New/Fish/GrouperFish.plist",
    GrouperFishPng : "res/New/Fish/GrouperFish.png",
    MarlinsFishPlist : "res/New/Fish/MarlinsFish.plist",
    MarlinsFishPng : "res/New/Fish/MarlinsFish.png",

    HorseshoeCrabPlist : "res/New/Fish/HorseshoeCrab.plist",
    HorseshoeCrabPng : "res/New/Fish/HorseshoeCrab.png",
    PaddleFishPlist : "res/New/Fish/PaddleFish.plist",
    PaddleFishPng : "res/New/Fish/PaddleFish.png",


    DemoFishPlist : "res/CompanyA/Fish/DemoFish.plist",
    DemoFishPng : "res/CompanyA/Fish/DemoFish.png",
    //New Game
    AnemoneFishPlist : "res/CompanyA/Fish/AnemoneFish.plist",
    AnemoneFishPng : "res/CompanyA/Fish/AnemoneFish.png",
    AngelFish2Plist : "res/CompanyA/Fish/AngelFish2.plist",
    AngelFish2Png : "res/CompanyA/Fish/AngelFish2.png",
    BlackWhiteYellowFishPlist : "res/CompanyA/Fish/BlackWhiteYellowFish.plist",
    BlackWhiteYellowFishPng : "res/CompanyA/Fish/BlackWhiteYellowFish.png",
    BlackYellowButterflyFishPlist : "res/CompanyA/Fish/BlackYellowButterflyFish.plist",
    BlackYellowButterflyFishPng : "res/CompanyA/Fish/BlackYellowButterflyFish.png",
    BlueTang2Plist : "res/CompanyA/Fish/BlueTang2.plist",
    BlueTang2Png : "res/CompanyA/Fish/BlueTang2.png",
    ButterflyFish2Plist : "res/CompanyA/Fish/ButterflyFish2.plist",
    ButterflyFish2Png : "res/CompanyA/Fish/ButterflyFish2.png",
    BWNemoPlist : "res/CompanyA/Fish/BWNemo.plist",
    BWNemoPng : "res/CompanyA/Fish/BWNemo.png",
    KissingFishPlist : "res/CompanyA/Fish/KissingFish.plist",
    KissingFishPng : "res/CompanyA/Fish/KissingFish.png",
    Marlins2Plist : "res/CompanyA/Fish/Marlins2.plist",
    Marlins2FishPng : "res/CompanyA/Fish/Marlins2.png",
    SeahorsePlist : "res/CompanyA/Fish/Seahorse.plist",
    SeahorsePng : "res/CompanyA/Fish/Seahorse.png",
    Turtle2Plist : "res/CompanyA/Fish/Turtle2.plist",
    Turtle2Png : "res/CompanyA/Fish/Turtle2.png",
    YellowFishPlist : "res/CompanyA/Fish/YellowFish.plist",
    YellowFishPng : "res/CompanyA/Fish/YellowFish.png",



    //Weapons
    Weapon1Plist : "res/New/Weapons/Weapon 1.plist",
    Weapon1Png : "res/New/Weapons/Weapon 1.png",

    //
    Cannon1Plist : "res/CompanyA/Weapons/Cannon1.plist",
    Cannon1Png : "res/CompanyA/Weapons/Cannon1.png",

    //testing
    // BulletPNG: "res/New/testing/bullet.png",
    // NetPng : "res/New/testing/Net.png",


    //debug
    DebugCircle : "res/New/testing/circle.png",

};

var g_resources = [
    // "res/lang-en/main_ui_title_en.png",
    // "res/lang-cn/main_ui_title_cn.png",
    // "res/qipao3.png",
    // "res/qipao3.plist",
    // "res/qipao4.plist",

];

let addResource = function (company, type, name) {
    const constructedName = "res/" + company + "/" + type + "/" + name;
    g_resources[constructedName+"Plist"] = constructedName + ".plist";
    g_resources[constructedName+"Plist"] = constructedName + ".png";
};

for (var i in res) {
    g_resources.push(res[i]);
}
