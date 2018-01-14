'use strict';
const Hapi = require('hapi');

const server = new Hapi.Server({
    port: 9000,
    host: 'localhost'
});


server.register([
    require('./routes')
]).then( async (err) => {
    if (err) throw err;
 
    try {
        await server.start();
        console.log('Started at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }
    
})