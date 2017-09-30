"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const level_enum_1 = require("./level.enum");
class Logger {
    constructor(name, options) {
        this.name = name;
        this.options = Object.assign({ timestamp: false }, options);
    }
    debug(...args) {
        return this._log(level_enum_1.Level.DEBUG, args);
    }
    log(...args) {
        return this._log(level_enum_1.Level.LOG, args);
    }
    info(...args) {
        return this.log(args);
    }
    warn(...args) {
        return this._log(level_enum_1.Level.WARN, args);
    }
    error(...args) {
        return this._log(level_enum_1.Level.ERROR, args);
    }
    nameToString() {
        if (typeof this.name == "string") {
            return this.name;
        }
        else {
            return "";
        }
    }
    _log(level, args) {
        try {
            if (this.options.level == level_enum_1.Level.OFF) {
                return () => {
                };
            }
            if (this.rank(level) < this.rank(this.options.level)) {
                return () => {
                };
            }
            switch (level) {
                case level_enum_1.Level.ERROR:
                    (typeof this.options.error == "function") && this.options.error(args);
                    break;
                case level_enum_1.Level.WARN:
                    (typeof this.options.warn == "function") && this.options.warn(args);
                    break;
                case level_enum_1.Level.LOG:
                    (typeof this.options.log == "function") && this.options.log(args);
                    break;
                case level_enum_1.Level.INFO:
                    (typeof this.options.info == "function") && this.options.info(args);
                    break;
                case level_enum_1.Level.DEBUG:
                    (typeof this.options.debug == "function") && this.options.debug(args);
                    break;
            }
            (typeof this.options.all == "function") && this.options.all(level, args);
            return console[level].bind(window.console, ...[`${this.options.timestamp ? new Date().toJSON() : ""}`, `[${this.nameToString()}]`, ...args]);
        }
        catch (err) {
            console.error(err);
        }
    }
    rank(level) {
        switch (level) {
            case level_enum_1.Level.OFF:
                return 255;
            case level_enum_1.Level.ERROR:
                return 5;
            case level_enum_1.Level.WARN:
                return 4;
            case level_enum_1.Level.LOG:
                return 3;
            case level_enum_1.Level.INFO:
                return 2;
            case level_enum_1.Level.DEBUG:
                return 1;
            default:
                return 0;
        }
    }
}
exports.Logger = Logger;
