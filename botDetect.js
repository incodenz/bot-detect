(function (d, w) {
    var bD = {
            tests: {},
            isBot: true,
            isUser: false,
        },
        userCallbacks = [],
        tests = {},
        addEvent = function (elm, type, handler) {
            if ( elm.addEventListener ) {
                elm.addEventListener( type, handler, false );
            } else if ( elm.attachEvent ) {
                elm.attachEvent( "on" + type, handler );
            }
        },
        removeEvent = function (elm, type, handle) {
            if (d.removeEventListener) {
                if ( elm.removeEventListener ) {
                    elm.removeEventListener( type, handle, false );
                }
            } else {
                var name = "on" + type;
                if ( elm.detachEvent ) {
                    if ( typeof elm[ name ] === 'undefined' ) {
                        elm[ name ] = null;
                    }
                    elem.detachEvent( name, handle );
                }
            }
        };

    w.botDetect = bD;

    tests.scroll = function () {
        var e = function () {
            tests.scroll = true;
            updateTests();
            removeEvent(w, 'scroll', e);
            removeEvent(d, 'scroll', e);
        };
        addEvent(d, 'scroll', e);
        addEvent(w, 'scroll', e);
    };
    tests.mouse = function () {
        var e = function () {
            tests.mouse = true;
            updateTests();
            removeEvent(w, 'mousemove', e);
        };
        addEvent(w, 'mousemove', e);
    };
    tests.key = function () {
        var e = function () {
            tests.key = true;
            updateTests();
            removeEvent(w, 'keyUp', e);
        };
        addEvent(w, 'keyUp', e);
    };

    function runTests() {
        for(var i in tests) {
            if (tests.hasOwnProperty(i)) {
                tests[i].call();
            }
        }
        updateTests();
    }

    function updateTests() {
        var count = 0, i;
        for(i in tests) {
            if (tests.hasOwnProperty(i)) {
                bD.tests[i] = tests[i] === true;
                if (tests[i] === true) {
                    count ++;
                }
            }
        }

        bD.isUser = count > 0;
        bD.isBot = !bD.isUser;
        if (bD.isUser) {
            while(userCallbacks.length) {
                var cb = userCallbacks.shift();
                cb.call(bD);
            }
        }
    }

    bD.onUser = function (callback) {
        if (bD.isUser) {
            callback.call(bD);
        } else {
            userCallbacks.push(callback);
        }
    };

    runTests();
})(document, window);
