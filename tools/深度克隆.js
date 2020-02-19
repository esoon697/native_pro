function checkType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
}

function clone(target) {
    let res, type = checkType(target);
    if (type === "Object") {
        res = {};
    } else if (type === "Array") {
        res = [];
        alert(1);
    } else {
        return target;
    }
    alert(2);
    for (let i in target) {
        let value = target[i];
        let type = checkType(value);
        if (type === "Object" || type === "Array") {
            res[i] = clone(value);
        } else {
            res[i] = value;
        }
    }
    return res;
}