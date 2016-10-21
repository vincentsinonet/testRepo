"use strict";

// UMD (Universal Module Definition) returnExports.js
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.serverInformer = factory();
    }
}(this, function () {
    // This module exists on the client, and is used to inform the server of changes.

    const trimFloat = (f) => Math.round(f * 10000) / 10000;

    const serverInformer = function (ioSocket) {
        // Prevent caller from accidentally passing a WebSocket (which would silently fail to emit)
        if (ioSocket === null || ioSocket.on && ioSocket.off && ioSocket.emit) {
            // Good
        } else {
            throw Error("ioSocket was the wrong type of object.");
        }

        return {

            gunSelected: function (gunId) {
                ioSocket.emit('g', {g: gunId});
            },

            gunPointed: function (angle) {
                ioSocket.emit('p', {a: trimFloat(angle)});
            },

            bulletFired: function (bulletId, angle) {
                // The client chooses the bulletId, because otherwise we would need to spend bandwidth on a response message.
                // However the client *must* ensure the bullet id has the format '<player_id>:<unique_counter>', or the server will reject it.
                ioSocket.emit('b', {b: bulletId, a: trimFloat(angle)});
            },

        };
    };

    return serverInformer;
}));