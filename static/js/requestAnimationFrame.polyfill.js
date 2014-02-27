// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function (window, rAF, cAF) {
    var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'], x;

    for (x = 0; x < vendors.length && !window[rAF]; ++x) {
        window[rAF] = window[vendors[x] + 'RequestAnimationFrame'];
        window[cAF] = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window[rAF]) {
        window[rAF] = function (callback) {
            var currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);

            lastTime = currTime + timeToCall;

            return id;
        };
    }

    if (!window[cAF]) {
        window[cAF] = function (id) {
            window.clearTimeout(id);
        };
    }
}(this, 'requestAnimationFrame', 'cancelAnimationFrame'));