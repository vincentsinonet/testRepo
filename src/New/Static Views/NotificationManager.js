const NotificationManager = (function () {
    "use strict";

    let _notificationPanel;

    const queue = [];

    function createNewNotificationPanel () {
        const pnNotification = new NotificationPanel(440, 32);
        GameManager.setGlobalNotificationPanel(pnNotification);

        // Testing
        const addOneNotification = () => {
            queueNewNotification({
                priority: 1,
                message: "TEST NOTIFICATION test notification TEST NOTIFICATION",
            });
            setTimeout(addOneNotification, 5000 + 10000 * Math.random());
        };
        //setTimeout(addOneNotification, 5000);

        return pnNotification;
    }

    function getNotificationPanel () {
        _notificationPanel = _notificationPanel || createNewNotificationPanel();
        return _notificationPanel;
    }

    function placeNotificationPanelBelowJackpotPanel (jackpotPanel, currentScreen) {
        if (!jackpotPanel) {
            console.warn("No jackpotPanel to add to!");
            return;
        }

        const notificationPanel = getNotificationPanel();

        const oldContainer = notificationPanel.getParent();
        if (oldContainer) {
            oldContainer.removeChild(notificationPanel);
        }

        const newContainer = jackpotPanel.getParent();
        notificationPanel.setPosition(jackpotPanel.getPositionX() - notificationPanel._szSize.width / 2, jackpotPanel.getPositionY() - 120);
        newContainer.addChild(notificationPanel);

        notificationPanel.styleForScreen(currentScreen);

        //notificationPanel.showNotification("Hello, this is an Elsa's message for testing notification................");
    }

    function queueNewNotification (notificationObj) {
        queue.push(notificationObj);
        // @todo Check priority; maybe jump queue
        // @todo Check queue length; ignore if too large

        const notificationPanel = getNotificationPanel();
        if (!notificationPanel.isScrolling) {
            showNextNotification();
        }
    }

    function showNextNotification () {
        //console.log(`queue length:`, queue.length);
        const nextNotification = queue.shift();
        const notificationPanel = getNotificationPanel();
        if (!nextNotification) {
            notificationPanel.fadeOut();
            return;
        }
        if (!notificationPanel.isScrolling) {
            notificationPanel.fadeIn();
        }
        notificationPanel.showNotification(nextNotification.message, showNextNotification);
    }

    const NotificationManager = {
        //createNewNotificationPanel,
        placeNotificationPanelBelowJackpotPanel: placeNotificationPanelBelowJackpotPanel,
        queueNewNotification: queueNewNotification,
    };

    return NotificationManager;
}());