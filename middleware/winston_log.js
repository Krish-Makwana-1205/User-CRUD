const winston = require('winston');
const daily_rotate_file = require('winston-daily-rotate-file');


const rotate = new daily_rotate_file({
    filename: 'log-%DATE%.log',
    datePattern: 'YYYY-MM-DD'
})
const log = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        rotate
    ]
});

function logging(req, res,next){
    log.info(`Incoming request: ${req.method}`);
    next();
}

module.exports = {
    logging
}