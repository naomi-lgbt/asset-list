"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logHandler = void 0;
const winston_1 = require("winston");
const { combine, timestamp, colorize, printf } = winston_1.format;
/**
 * Standard log handler, using winston to wrap and format
 * messages. Call with `logHandler.log(level, message)`.
 *
 * @param {string} level - The log level to use.
 * @param {string} message - The message to log.
 */
exports.logHandler = (0, winston_1.createLogger)({
    levels: winston_1.config.npm.levels,
    level: "silly",
    transports: [new winston_1.transports.Console()],
    format: combine(timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), colorize(), printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
    exitOnError: false,
});
