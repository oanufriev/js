(function ($) {
    'use strict';
    const isArray = Array.isArray;
    const isFunction = v => typeof v === 'function';
    const isString = v => typeof v === 'string' || v instanceof String;
    const exists = v => v !== undefined && v !== null;
    const empty = (v) => {
        if (v === undefined || v == null || v.length === 0)
            return true;
        if (typeof (v) == 'function' || typeof (v) == 'number' || typeof (v) == 'boolean' || Object.prototype.toString.call(v) === '[object Date]')
            return false;
        if (typeof (v) == "object") { // empty object    
            for (var key in v) {
                if(v.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        return false;
    }
    /**
     * Generates a list of a given type from an array-like data
     * @param {Array or array-like or iterable} data 
     * @param {string} keyorfunc :: if data is array of objects, key to string value provided
     * alternatively a function might be appliced to the value
     * @param {boolean = false} isordered :: unordered (default) of ordered list
     */
    $.fn.generateList = function (data, keyorfunc, isordered = false) {
        let arr = Array.from(data);
        if (empty(arr) || !isArray(arr)) {
            console.log('Invalid Data');
            return this;
        }
        const array2ul = (a) => {
            let wrap = (isordered) ? $('<ol>') : $('<ul>');
            wrap.append(a.map((x) => {
                let el = $('<li>');
                if (exists(keyorfunc)) {
                    if (isString(keyorfunc))
                        el.text(x[keyorfunc]);
                    if (isFunction(keyorfunc))
                        el.text(keyorfunc(x));
                } else {
                    el.text(x);
                }
                return el;
            }));
            console.log(wrap);
            return wrap;
        }
        $(this).append(array2ul(arr));
        return this;
    };
  })(jQuery);
