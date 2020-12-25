import { Level } from "./level.enum";
import { Options } from "./options.interface";

export class Logger {
    private options: Options;
    private name: string;

    constructor(name: string, options: Options) {
        this.name = name;
        this.options = {
            forceConsoleLog: false,
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

    private nameToString() {
        if (typeof this.name == "string") {
            return this.name;
        }
        else {
            return "";
        }
    }

    private _log(level: Level, args: any[]): Function {
        try {
            if (this.nameToString()) {
                args = [`[${this.nameToString()}]:`, ...args];
            }

            if (this.rank(level) >= this.rank(this.options.level)) {
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

                return console[level].bind(console, ...args);
            }
            else if (this.options.forceConsoleLog) {
                return console[level].bind(console, ...args);
            }
            else {
                return () => {
                };
            }
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
