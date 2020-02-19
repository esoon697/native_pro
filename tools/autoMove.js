function autoMove(btn, obj, style, speed, target, callback) {
    var button = document.querySelectorAll("button");
    btn.onclick = function () {
        speed = Math.abs(speed);
        if (btn.name == "start") {
            clearInterval(obj.timer);
            var current = parseInt(getStyle(obj, style));
            if (current > target) {
                speed = -speed;
            }
            obj.timer = setInterval(function () {
                var oldValue = parseInt(getStyle(obj, style));
                var newValue = oldValue + speed
                if ((newValue > target && speed > 0) || (newValue < target && speed < 0)) {
                    newValue = target
                    speed = -speed;
                    // clearInterval(obj.timer);
                    callback && callback();
                }
                obj.style[style] = newValue + "px";
            }, 50);
            for (var i = 0; i < button.length; i++) {
                button[i].name = "pause";
            }
        } else {
            clearInterval(obj.timer);
            for (var i = 0; i < button.length; i++) {
                button[i].name = "start";
            }
        }
    }
}

function getStyle(obj, property) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[property];
    } else {
        return obj.currentStyle[property];
    }
}