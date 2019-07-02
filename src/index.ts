#! /usr/bin/env node
import http from 'http';
import app from './server';
import debug from 'debug';
import logger from './use/winstonLog';

let port = normalizePort(process.env.PORT || '8101');
app.set('port', port);
let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
        // named pipe
        return val;
    }
  
    if (port >= 0) {
        // port number
        return port;
    }
  
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
  
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' 被占用了');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    addr != null && (() => {
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    })();
}