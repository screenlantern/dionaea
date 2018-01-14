'use strict';
const fs = require('fs');
const request = require('request');
const datefns = require('date-fns');
let connJson = require('../data/connections.json');
let getLocale = (ip) => {
    return new Promise((res) => {
        request(`http://extreme-ip-lookup.com/json/${ip}`, {json: true}, (err, resp, body) => {
            res(body);
         });
    })
};

exports.plugin = {
    register: (server, options, next) => {

        server.route({
            method: 'GET',
            path: '/api/connections/{limit?}',
            options: {
                cors: true
            },
            handler: (r, h) => {
                const amount = parseInt(r.params.limit); 
                console.log(typeof amount);
                const limit = (typeof amount === 'number')? amount : 33;

                const d = connJson.sort((a, b) => {
                    return a.connection_timestamp - b.connection_timestamp
                }).slice(0, limit).map(async(obj, i) => {

                    const locale = await getLocale(obj.remote_host);

                    return {
                        connection_type: obj.connection_type,
                        connection_timestamp: datefns.format( new Date(Number(obj.connection_timestamp)), 'MM/DD/YYYY'),
                        connection_protocol: obj.connection_protocol,
                        remote_port: obj.remote_port,
                        remote_host: obj.remote_host,   
                        locale_info: locale
                    };
                    
                });

                return Promise.all(d);
            }
        });

    },
    pkg: {
        name: 'indexRoutes'
    }

}