// Grabbed from the underscore.js source code (https://github.com/jashkenas/underscore/blob/master/underscore.js#L691)
export function range(start, stop, step) {
    if (stop == null) {
        stop = start || 0;
        start = 0;
    }
    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);
    for (var idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
    }
    return range;
}
