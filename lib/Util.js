/**
 * Created by zouyixiong on 14-9-10.
 */

/**
 *
 * @param href
 * @returns {boolean}
 */
exports.isValidHyperLink = function(href){
    if(href === '' || href === '#'){
        return false;
    }

    if(startWith(href, 'javascript:')){
        return false;
    }

    return true;
}

/**
 *
 * @param href
 * @returns {boolean}
 */
exports.isCompleteLink = function(href){
    if(startWith(href, 'http://') || startWith('https://')){
        return true;
    }
    return false;
}

/**
 *
 * @param str
 * @param start
 * @returns {boolean}
 */
exports.startWith = startWith = function(str, start){
    str = str || '';
    start = start || '';
    return str.toLowerCase().indexOf(start.toLowerCase()) === 0;
}
