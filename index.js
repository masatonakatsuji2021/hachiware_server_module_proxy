/**
 * =========================================================================================
 * Hachiware_Server_module_framework
 * 
 * Proxy server module for the web server package "hachiware_server".
 * 
 * License : MIT License. 
 * Since   : 2022.01.18
 * Author  : Nakatsuji Masato 
 * Email   : nakatsuji@teastalk.jp
 * HP URL  : https://hachiware-js.com/
 * GitHub  : https://github.com/masatonakatsuji2021/hachiware_server_module_proxy
 * npm     : https://www.npmjs.com/package/hachiware_server_module_proxy
 * =========================================================================================
 */

const httpProxy = require("http-proxy");

module.exports = function(conf, context){

    /**
     * fookRequest
     * @param {*} resolve 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    this.fookRequest = function(resolve, req, res){

        var proxy = httpProxy.createProxyServer();
        if(!conf.proxy){
            return resolve();
        }

        if(!conf.proxy.url){
            return resolve();
        }
        
        var url = conf.proxy.url;

        var host = url.split("http://").join("").split("https://").join("");

        host = host.split("/")[0];

        req.headers.host = host;

        proxy.web(req, res, {
            target: url,
        });

        return;
    };

};