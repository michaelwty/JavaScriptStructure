Function.prototype.addMethod = function (name, func) {
    var prototype = this.prototype;
    if (!prototype[name]) {
        prototype[name] = func;
    }
    return this;
};



/* Namespace implementation */
Function.prototype.as = function (ns, isSingleton) {
    var base = window;
    var ndx = 0;
    var token;
    var newObject, originalObject, prop;
    var chain = (ns ? ns.split('.') : []);
    var chainLength = chain.length;

    if (chainLength--) {
        for (; ndx < chainLength && (token = chain[ndx]) ; ++ndx) {
            if (token) {
                if (!base[token]) {
                    base[token] = {};
                }
                base = base[token];
            }
        }

        token = chain[ndx];
        originalObject = base[token];

        newObject = (base[token] = (isSingleton ? new this() : this));

        if (originalObject) {
            for (prop in originalObject) {
                if (typeof newObject[prop] == "undefined") {
                    newObject[prop] = originalObject[prop];
                }
            }
        }
    }
    return this;
};
Function.prototype.ns = function (ns) {
    this.as(ns, 1);
};



/* Array extension */
Array.addMethod("last", function () {
    // Return the last element in the array, 
    // or "undefined" if the array is empty
    return (this.length > 0 ? this[this.length - 1] : void (0));
});
Array.addMethod("remove", function (obj) {
    for (var ndx = this.length - 1; ndx >= 0; --ndx) {
        if (this[ndx] === obj) {
            this.splice(ndx, 1);
        }
    }
    return this;
});
Array.addMethod("contains", function (obj) {
    for (var ndx = 0; ndx < this.length; ++ndx) {
        if (this[ndx] === obj) {
            return true;
        }
    }
    return false;
});



/* String extensions */
String.prototype.format = function () {
    var fmt = this, ndx = 0;
    for (; ndx < arguments.length; ++ndx) {
        // replace {0} with argument[0], {1} with argument[1], etc.
        fmt = fmt.replace(new RegExp('\\{' + ndx + '\\}', "g"), arguments[ndx]);
    }
    return fmt;
};
String.addMethod('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});
String.addMethod('trimEnd', function () {
    return this.replace(/\s+$/, '');
});
String.addMethod('trimStart', function () {
    return this.replace(/^\s+/, '');
});
String.addMethod('startsWith', function (prefix) {
    return (this.substr(0, prefix.length) === prefix);
});
String.addMethod('endsWith', function (suffix) {
    return (this.substr(this.length - suffix.length) === suffix);
});



/* DOM helper functions */
function gid(id) {
    return document.getElementById(id);
}

