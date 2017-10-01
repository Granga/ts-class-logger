"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var level_enum_1 = require("./level.enum");
var Logger = /** @class */ (function () {
    function Logger(name, options) {
        this.name = name;
        this.options = __assign({ timestamp: false }, options);
    }
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this._log(level_enum_1.Level.DEBUG, args);
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this._log(level_enum_1.Level.LOG, args);
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.log(args);
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this._log(level_enum_1.Level.WARN, args);
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this._log(level_enum_1.Level.ERROR, args);
    };
    Logger.prototype.nameToString = function () {
        if (typeof this.name == "string") {
            return this.name;
        }
        else {
            return "";
        }
    };
    Logger.prototype._log = function (level, args) {
        try {
            if (this.options.level == level_enum_1.Level.OFF) {
                return function () {
                };
            }
            if (this.rank(level) < this.rank(this.options.level)) {
                return function () {
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
            return (_a = console[level]).bind.apply(_a, [window.console].concat(["" + (this.options.timestamp ? new Date().toJSON() : ""), "[" + this.nameToString() + "]"].concat(args)));
        }
        catch (err) {
            console.error(err);
        }
        var _a;
    };
    Logger.prototype.rank = function (level) {
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
    };
    return Logger;
}());
exports.Logger = Logger;
