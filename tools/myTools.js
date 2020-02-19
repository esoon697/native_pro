//移动元素动画
//obj移动的对象
//prop动画对象属性
//speed动画移动速度
//target动画边界，结束点
//callback动画结束后的回调函数
function move(obj, prop, speed, target, callback) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, prop));
    // var speed = Math.abs((target-current)/time);
    if (current > target) {
        speed = -speed;
    }
    obj.timer = setInterval(function () {
        var oldValue = parseInt(getStyle(obj, prop));
        var newValue = oldValue + speed
        if ((newValue > target && speed > 0) || (newValue < target && speed < 0)) {
            newValue = target
        }
        obj.style[prop] = newValue + "px";
        if(newValue == target){
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 20);
}
//获取元素当前样式函数，兼容ie8
function getStyle(obj, property) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[property];
    } else {
        return obj.currentStyle[property];
    }
}

//绑定事件兼容ie8
function myBind(obj, eventstr, callbackFun) {
    if (obj.addEventListener) {
        obj.addEventListener(eventstr, callbackFun, false)
    } else {
        obj.attachEvent("on" + eventstr, function () {
            callbackFun.call(obj);
            //callbackFun.call(obj),该方法中的回调函数中的this也指向调用对象
        })
    }
}

//类的操作函数
var hasClass = function (obj, tarClassName) {
    var reg = new RegExp("\\b" + tarClassName + "\\b");
    var res = reg.test(obj.className);
    return res;
}
var addClass = function (obj, tarClassName) {
    if (!hasClass(obj, tarClassName)) {
        obj.className += " " + tarClassName;
    }
}
var removeClass = function (obj, tarClassName) {
    var reg = new RegExp("\\s*\\b" + tarClassName + "\\b","g");
    obj.className = obj.className.replace(reg, "");
}
var changeClass = function (obj, tarClassName) {
    if(hasClass(obj, tarClassName)){
        removeClass(obj, tarClassName);
    }else{
        addClass(obj, tarClassName);
    }
}