/**
 * Created by zouyixiong on 14-9-10.
 */


var shell = require('shelljs');
var Promise = require('promise');

/**
 * exec a shell cmd with shell.exec, and returns an instance of Promise
 * @param cmd
 * @param [options]
 * @returns {Promise}
 */
exports.shellExec = function(cmd, options){
    options = options || {};
    return new Promise(function(resolve,reject){
        shell.exec(cmd, options, function(code, output){
            // exit code === 0  ==> success
            if(!code){
                resolve(output);
            }else{
                reject(new Error("exec curl error, code: "+ code));
            }
        });
    });
}