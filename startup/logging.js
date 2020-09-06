const winston = require("winston");
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
    });
    
    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, ex);
    })
    
    winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }));
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/mongo-project' }));
}