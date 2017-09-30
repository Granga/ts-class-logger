import {Level} from "./level.enum";
import {Options} from "./options.interface";

export class Logger {
    private options: Options;
    private klass: string | object;

    constructor(klass: string | object, options: Options) {
        this.klass = klass;
        this.options = {
            timestamp: false,
            ...options
        };
    }

    debug(...args) {
        return this._log(Level.DEBUG, args);
    }

    log(...args) {
        return this._log(Level.LOG, args);
    }

    info(...args) {
        return this.log(args);
    }

    warn(...args) {
        return this._log(Level.WARN, args);
    }

    error(...args) {
        return this._log(Level.ERROR, args);
    }

    private klassToString() {
        if (typeof this.klass == "object") {
            return this.klass.constructor.name;
        }
        else if (typeof this.klass == "string") {
            return this.klass;
        }
        else {
            return "";
        }
    }

    private _log(level: Level, args: any[]): Function {
        try {
            if (this.options.level == Level.OFF) {
                return () => {
                };
            }

            if (this.rank(level) < this.rank(this.options.level)) {
                return () => {
                };
            }

            switch (level) {
                case Level.ERROR:
                    (typeof this.options.error == "function") && this.options.error(args);
                    break;
                case Level.WARN:
                    (typeof this.options.warn == "function") && this.options.warn(args);
                    break;
                case Level.LOG:
                    (typeof this.options.log == "function") && this.options.log(args);
                    break;
                case Level.INFO:
                    (typeof this.options.info == "function") && this.options.info(args);
                    break;
                case Level.DEBUG:
                    (typeof this.options.debug == "function") && this.options.debug(args);
                    break;
            }

            (typeof this.options.all == "function") && this.options.all(level, args);

            return console[level].bind(window.console, ...[`${this.options.timestamp ? new Date().toJSON() : ""}`, `[${this.klassToString()}]`, ...args]);
        }
        catch (err) {
            console.error(err);
        }
    }

    private rank(level: Level) {
        switch (level) {
            case Level.OFF:
                return 255;
            case Level.ERROR:
                return 5;
            case Level.WARN:
                return 4;
            case Level.LOG:
                return 3;
            case Level.INFO:
                return 2;
            case Level.DEBUG:
                return 1;
            default:
                return 0;
        }
    }
}
