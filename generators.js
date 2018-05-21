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
    const includes = Array.prototype.includes;
    const trace = (value, label) => {
        (label) ? console.log(`Trace ${ label } `, value) : console.log(`Trace: `, value);
        return value;
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
            return wrap;
        }
        $(this).append(array2ul(arr));
        return this;
    };
    /**
     * Generates HTML table from array of objects data.
     * Customisation includes columns to hide, sort order and column names.
     * @param {array of objects} data 
     * @param {object} settings hidecolumns - array of column keys to hide,
     * sort - column keys to sort on
     * header - object of keys with respective column name replacment
     */
    $.fn.generateTable = function (data, {hidecolumns = [], sort = [], header = {}} = {}) {
        if (empty(data) || !isArray(data)) {
            console.log('Invalid Data');
            return this;
        }
        let container = $(this),
                table = $('<table>'),
                tableHead = $('<thead>'),
                tableBody = $('<tbody>'),
                tblHeaderRow = $('<tr>');
        data.forEach(function (value, index) {
            let tableRow = $('<tr>').addClass(index % 2 === 0 ? 'even' : 'odd');
            Object.keys(value).forEach(function (key) {
                let val = value[key];
                if (index == 0 && !hidecolumns.includes(key)) {
                    let theaddata = $('<th>');
                    if (empty(header)) { // simple case
                        theaddata.text(key);
                    } else { // if we have to rename columns
                        theaddata.text((key in header) ? header[key] : key);
                    }
                    theaddata.attr('data-col-name', key); // this will be used to sort no matter what
                    if (sort.includes(key)) { // sort styling
                        theaddata.addClass('up-arrow');
                    }
                    if (sort.includes(`-${key}`)) { // sort styling
                        theaddata.addClass('down-arrow');
                    }
                    tblHeaderRow.append(theaddata);
                }
                if (!hidecolumns.includes(key)) {
                    let tbodydata = $('<td>').html(val);
                    tableRow.append(tbodydata);
                }
            });
            $(tableBody).append(tableRow);
        });
        $(tableHead).append(tblHeaderRow);
        $(table).append(tableHead);
        $(table).append(tableBody);
        $(this).append(table);
        return this;
    };
  })(jQuery);
