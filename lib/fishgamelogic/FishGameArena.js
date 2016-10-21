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
        root.FishGameArena = factory();
    }
}(this, function () {
    const options = {
        logFish: true,
        logCollisions: true,

        // If one tick is slow by N ms, wait N fewer ms for the next tick, to maintain the overall tickrate.
        maintainAverageTickRate: true,
    };

    /**
     * @constructor
     * @param {boolean} onServer
     * @param {Object} gameConfig
     * @param {Object} [fishGame] - Optional, only on server, allows this arena to send messages to players' clients
     * @returns {Object}
     */
    function FishGameArena (onServer, gameConfig, fishGame) {
        const onClient = !onServer;

        const ARENA_WIDTH = gameConfig.ARENA_RIGHT - gameConfig.ARENA_LEFT;
        const ARENA_HEIGHT = gameConfig.ARENA_TOP - gameConfig.ARENA_BOTTOM;

        const gameStartTime = Date.now();

        const fishes = {};
        const bullets = {};
        const players = {};

        markAsDictionaryNotArray(fishes);
        markAsDictionaryNotArray(bullets);
        markAsDictionaryNotArray(players);

        let nextId = 0;

        // When was the last update started (in game time)
        let lastUpdateTime = getGameTime();
        // When did the current update start (in game time)
        let currentTime;

        let targetDeltaTime;
        let updateIntervalID;
        let spawnFishTimeoutID;
        let overTicks;
        let usingTargetTickRate;

        const targetTickrate = onServer ? gameConfig.serverTickRate : gameConfig.clientTickRate;
        usingTargetTickRate = targetTickrate;
        targetDeltaTime = 1000 / targetTickrate;
        if (onServer) {
            updateIntervalID = setTimeout(doUpdate, targetDeltaTime);
        }

        if (onServer) {
            spawnFishTimeoutID = setTimeout(considerSpawningFish, 1000);
        }

        function getGameTime () {
            return Date.now() - gameStartTime;
        }

        function getNextId () {
            // Consider: We could increment nextId but return a base-62 string, which would get longer more slowly!
            return nextId++;
        }

        function getState () {
            return {
                gameTime: getGameTime(),
                fishes: fishes,
                bullets: bullets,
            };
        }

        function spawnPlayer (playerId, playerName, playerSlot, startingScore) {
            return addPlayer(playerId, playerName, playerSlot, 0, 0, startingScore);
        }

        function addPlayer (playerId, playerName, playerSlot, gunAngle, gunId, startingScore) {
            const cannonPosition = gameConfig.cannonPositions[playerSlot];

            const player = {
                playerId: playerId,
                playerName: playerName,
                playerSlot: playerSlot,
                cannonPosition: cannonPosition,
                gunAngle: gunAngle,
                gunId: gunId,
                score: startingScore,
            };

            players[playerId] = player;

            return player;
        }

        function getPlayer (playerId) {
            return players[playerId];
        }

        function removePlayer (playerId) {
            delete players[playerId];
        }

        function spawnFish (fishType, fishId, position, angle, fishSpawnTime, motionPatternGroup, motionPatternId) {
            const fishClass = getFishClass(fishType);

            return addFish(fishType, fishId, position, angle, motionPatternGroup, motionPatternId, 0, fishSpawnTime, fishClass.health);
        }

        function addFish (fishType, fishId, position, angle, motionPatternGroup, motionPatternId, motionPatternBit, bitStartTime, fishHealth) {
            const fish = {
                type: fishType,
                id: fishId,
                position: position,
                angle: angle,
                motionPatternGroup: motionPatternGroup,
                motionPatternId: motionPatternId,
                motionPatternBit: motionPatternBit,
                bitStartTime: bitStartTime,
                //bitStartPosition: position,
                health: fishHealth,
            };

            fishes[fish.id] = fish;

            return fish;
        }

        function removeFish (fishId) {
            delete fishes[fishId];
        }

        function spawnBullet (owner, bulletId, gunId, angle, startTime) {
            const bulletSpeed = gameConfig.defaultBulletSpeed;
            const velocity = [bulletSpeed * Math.cos(angle), bulletSpeed * Math.sin(angle)];

            return addBullet(owner.playerId, bulletId, gunId, owner.arenaPlayer.cannonPosition, velocity);
        }

        function addBullet (ownerId, bulletId, gunId, position, velocity) {
            if (bullets[bulletId]) {
                throw Error("A bullet with id " + bulletId + " already exists!")
            }

            const bullet = {
                id: bulletId,
                ownerId: ownerId,
                gunId: gunId,
                position: position,
                velocity: velocity,
            };

            bullets[bulletId] = bullet;

            return bullet;
        }

        function removeBullet (bulletId) {
            delete bullets[bulletId];
        }

        function considerSpawningFish () {
            if (fishes.length < gameConfig.maxFishOnScreen) {
                const POINT_RIGHT = 0;
                const POINT_LEFT = Math.PI;

                const numInGroup = 2;

                // @todo Choose fish layout etc. from gameConfig
                const fishType = chooseRandomItemFromList(Object.keys(gameConfig.fishClasses));

                if (options.logFish) {
                    console.log(`+ Spawning ${numInGroup} fish of class "${fishType}"`);
                }

                const motionPatternGroup = 'simple';
                const motionPatternId = Math.floor(Math.random() * gameConfig.fishMotions[motionPatternGroup].length);

                for (let i = 0; i < numInGroup; i++) {
                    const fishId = 'f' + getNextId();
                    const position = [-20, (gameConfig.ARENA_BOTTOM + gameConfig.ARENA_TOP) / 2 + 40 * (i - numInGroup/2 + 0.5)];
                    const angle = POINT_RIGHT;
                    const fishSpawnTime = getGameTime();

                    spawnFish(fishType, fishId, position, angle, fishSpawnTime, motionPatternGroup, motionPatternId);

                    fishGame.informAllClients.fishAppeared(fishType, fishId, position, angle, fishSpawnTime, motionPatternGroup, motionPatternId);
                }
            }

            const delayToNext = gameConfig.delayBetweenSpawningFish + fishes.length * gameConfig.extraDelayPerFishOnScreen + Math.random() * gameConfig.extraRandomDelay;
            if (options.logFish) {
                console.log(`: Waiting ${delayToNext} seconds for the next spawn.`);
            }
            spawnFishTimeoutID = setTimeout(considerSpawningFish, delayToNext * 1000);
        }

        function doUpdate () {
            updateEverything();
            checkForFishOffScreen();
            checkCollisions();

            usingTargetTickRate = options.maintainAverageTickRate ? targetDeltaTime - overTicks : targetDeltaTime;
            setTimeout(doUpdate, usingTargetTickRate);
        }

        function updateEverything () {
            currentTime = getGameTime();
            const deltaTime = currentTime - lastUpdateTime;

            //console.log("overTicks, usingTargetTickRate, deltaTime:", overTicks, usingTargetTickRate, deltaTime);
            if (/* onServer && */ deltaTime > 1.2 * targetDeltaTime) {
                console.info("%s Tickrate was not maintained.  %s > %s", Date(), deltaTime, targetDeltaTime);
                // @consider If a tick is too long, we could to setTimeout() the next tick to happen slightly earlier.
                // That should at least keep the average tickrate constant.
                // It looks like Node's setInterval() does not attempt that behaviour, rather it aims to keep the gap constant, even if it is larger than desired.
            }
            overTicks = deltaTime - usingTargetTickRate;

            for (let fishId in fishes) {
                moveFish(fishes[fishId], deltaTime);
            }
            for (let bulletId in bullets) {
                moveBullet(bullets[bulletId], deltaTime);
            }

            lastUpdateTime = currentTime;
        }

        function moveBullet (bullet, deltaTime) {
            bullet.position[0] += bullet.velocity[0] * deltaTime / 1000;
            bullet.position[1] += bullet.velocity[1] * deltaTime / 1000;
            // Bounce off edges
            if (bullet.position[0] < gameConfig.ARENA_LEFT) {
                bullet.velocity[0] = -bullet.velocity[0];
                bullet.position[0] = gameConfig.ARENA_LEFT + (gameConfig.ARENA_LEFT - bullet.position[0]);
            }
            if (bullet.position[0] > gameConfig.ARENA_RIGHT) {
                bullet.velocity[0] = -bullet.velocity[0];
                bullet.position[0] = gameConfig.ARENA_RIGHT - (bullet.position[0] - gameConfig.ARENA_RIGHT);
            }
            if (bullet.position[1] < gameConfig.ARENA_BOTTOM) {
                bullet.velocity[1] = -bullet.velocity[1];
                bullet.position[1] = gameConfig.ARENA_BOTTOM + (gameConfig.ARENA_BOTTOM - bullet.position[1]);
            }
            if (bullet.position[1] > gameConfig.ARENA_TOP) {
                bullet.velocity[1] = -bullet.velocity[1];
                bullet.position[1] = gameConfig.ARENA_TOP - (bullet.position[1] - gameConfig.ARENA_TOP);
            }
        }

        function moveFish (fish, deltaTime) {
            const motionPattern = gameConfig.fishMotions[fish.motionPatternGroup][fish.motionPatternId];
            while (true) {
                const motionPatternBit = motionPattern[fish.motionPatternBit];
                const bitEndTime = fish.bitStartTime + 1000 * motionPatternBit.duration;
                if (currentTime < bitEndTime) {
                    // Perform a partial movement along this bit
                    applyPatternBitMotion(fish, motionPatternBit, deltaTime);
                    break;
                } else {
                    // Based on the time, the fish will complete this bit and start another one.
                    // Apply all of the rest of this bit
                    applyPatternBitMotion(fish, motionPatternBit, bitEndTime - lastUpdateTime);
                    // Select next bit
                    fish.motionPatternBit = (fish.motionPatternBit + 1) % motionPattern.length;
                    fish.bitStartTime = bitEndTime;
                    // Continue the while loop
                }
            }
        }

        function applyPatternBitMotion (fish, patternBit, deltaTime) {
            const deltaAngle = patternBit.angle * Math.PI/180 * deltaTime / patternBit.duration / 1000;
            const fishClass = getFishClass(fish.type);
            const patternBitSpeedRatio = typeof patternBit.speedRatio === 'number' ? patternBit.speedRatio : 1.0;
            const distance = fishClass.speed * patternBitSpeedRatio * deltaTime / 1000;
            // To approximate moving in an arc, we use the angle half way between the old and new direction
            // This is still not 100% accurate.  Fish in a higher tickrate environment will move slightly further, because those with a low tickrate will be taking a coarser, more jagged, and therefore longer route.  However this error should be minimal.
            // For better sync between client and server, we could calculate the motion as an arc, not as a straight line.  The only error this would leave us is miniscule floating-point errors.
            // For perfect sync between client and server, we should calculate the arc not from the last known position, but from the bitStartTime and bitStartPosition (rewind and replay).
            const halfwayAngle = fish.angle + deltaAngle / 2;
            fish.position[0] += distance * Math.cos(halfwayAngle);
            fish.position[1] += distance * Math.sin(halfwayAngle);
            fish.angle += deltaAngle;
            //console.log("fish.position: ", fish.position);
        }

        function checkCollisions () {
            if (!onServer) {
                return;
            }

            for (let bulletId in bullets) {
                const bullet = bullets[bulletId];
                const bulletRadius = gameConfig.gunClasses[bullet.gunId].collisionRadius;

                for (let fishId in fishes) {
                    const fish = fishes[fishId];
                    const fishRadius = getFishClass(fish.type).radius;

                    const maxDist = bulletRadius + fishRadius;
                    const distanceSquared = distanceBetweenV2Squared(bullet.position, fish.position);

                    if (distanceSquared < maxDist * maxDist) {
                        // Collision!
                        handleCollision(bullet, fish);
                    }
                }
            }
        }

        function handleCollision (bullet, collisionFish) {
            const bulletClass = getGunClass(bullet.gunId);
            const explosionRadius = bulletClass.explosionRadius;
            const explosionRadiusSquared = explosionRadius * explosionRadius;
            const damagePoints = bulletClass.damage;

            // Inform clients of explosion
            fishGame.informAllClients.bulletExploded(bullet.id, bullet.position);

            // Harm fishes in splash radius
            for (let fishId in fishes) {
                const fish = fishes[fishId];

                const distanceSquared = distanceBetweenV2Squared(bullet.position, fish.position);
                if (distanceSquared < explosionRadiusSquared) {
                    fish.health -= damagePoints;

                    if (options.logCollisions) {
                        console.log(`x Bullet ${bullet.id} hit fish ${fish.id} with damage ${damagePoints}`);
                    }

                    // Inform clients of damage to this fish
                    fishGame.informAllClients.fishWasHit(fishId, damagePoints);

                    // If the fish dies, award player for the frag
                    if (fish.health <= 0) {
                        const scoreChange = getFishClass(fish.type).value;

                        const player = fishGame.getPlayer(bullet.ownerId);
                        // It is possible that the player has just left the game, and the bullet it still bouncing
                        if (player) {
                            if (options.logCollisions) {
                                console.log(`$ Player ${bullet.ownerId} caught a(n) "${fish.type}" for ${scoreChange} credits`);
                            }

                            player.arenaPlayer.score += scoreChange;

                            // @todo Send score or scoreChange to server, either debounced or queued respectively
                        }

                        fishGame.informAllClients.fishWasKilled(fishId, bullet.ownerId, scoreChange);

                        removeFish(fishId);
                    }
                }
            }

            removeBullet(bullet.id);
        }

        function distanceBetweenV2Squared (v, w) {
            const distX = v[0] - w[0];
            const distY = v[1] - w[1];

            return distX * distX + distY * distY;
        }

        function checkForFishOffScreen () {
            // @consider We could actually do this automatically on the clients, since they should agree with the server
            //           Doing it on the server and then sending it to clients is slightly less work for clients per frame
            if (!onServer) {
                return;
            }

            const OFF_LEFT = gameConfig.ARENA_LEFT - ARENA_WIDTH * 0.2;
            const OFF_RIGHT = gameConfig.ARENA_RIGHT + ARENA_WIDTH * 0.2;
            const OFF_BOTTOM = gameConfig.ARENA_BOTTOM - ARENA_HEIGHT * 0.5;
            const OFF_TOP = gameConfig.ARENA_TOP + ARENA_HEIGHT * 0.5;

            for (let fishId in fishes) {
                const fish = fishes[fishId];

                const isOffScreen =
                    fish.position[0] < OFF_LEFT
                    || fish.position[0] > OFF_RIGHT
                    || fish.position[1] < OFF_BOTTOM
                    || fish.position[1] > OFF_TOP;

                if (isOffScreen) {
                    if (options.logFish) {
                        console.log(`- Removing fish ${fishId} ("${fish.type}") because it went off the screen.`);
                    }
                    removeFish(fishId);
                    fishGame.informAllClients.fishLeftArena(fishId);
                }
            }
        }

        function closeArena () {
            if (onServer) {
                clearInterval(updateIntervalID);
                clearTimeout(spawnFishTimeoutID);
            }
        }

        function getFishClass (fishType) {
            return gameConfig.fishClasses[fishType];
        }

        function getGunClass (gunId) {
            return gameConfig.gunClasses[gunId];
        }

        // This is used when we access fishes.length (maybe bullets.length in future)
        function markAsDictionaryNotArray (obj) {
            Object.defineProperty(obj, 'length', {
                get: function () {
                    //throw Error("You cannot access my length.  I am not an Array!");
                    // Or maybe we can access it.  But this is a little inefficient.
                    return Object.keys(this).length;
                },
            });
        }

        function chooseRandomItemFromList (list) {
            const i = Math.floor(Math.random() * list.length);
            return list[i];
        }

        return {
            getGameTime: getGameTime,
            getState: getState,
            spawnPlayer: spawnPlayer,
            addPlayer: addPlayer,
            getPlayer: getPlayer,
            getPlayers: () => players,
            removePlayer: removePlayer,
            spawnFish: spawnFish,
            addFish: addFish,
            getFishes: () => fishes,
            removeFish: removeFish,
            spawnBullet: spawnBullet,
            addBullet: addBullet,
            getBullets: () => bullets,
            removeBullet: removeBullet,
            updateEverything: updateEverything,
            checkCollisions: checkCollisions,
            closeArena: closeArena,
        };
    }

    return FishGameArena;
}));