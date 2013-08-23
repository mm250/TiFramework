module.exports = function clone(src) {
    function mixin(dest, source, copyFunc) {
        var name, s, empty = {};
        for (name in source) {
            s = source[name];
            name in dest && (dest[name] === s || name in empty && empty[name] === s) || (dest[name] = copyFunc ? copyFunc(s) : s);
        }
        return dest;
    }
    if (!src || "object" != typeof src || "[object Function]" === Object.prototype.toString.call(src)) return src;
    if (src.nodeType && "cloneNode" in src) return src.cloneNode(true);
    if (src instanceof Date) return new Date(src.getTime());
    if (src instanceof RegExp) return new RegExp(src);
    var r, i, l;
    if (src instanceof Array) {
        r = [];
        for (i = 0, l = src.length; l > i; ++i) i in src && r.push(clone(src[i]));
    } else r = src.constructor ? new src.constructor() : {};
    return mixin(r, src, clone);
};