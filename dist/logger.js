"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var level_enum_1 = require("./level.enum");
var Logger = /** @class */ (function () {
    function Logger(name, options) {
        this.name = name;
        this.options = __assign({ forceConsoleLog: false }, options);
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
    Logger.prototype._log = function (level, params) {
        var _a, _b;
        try {
            if (this.nameToString()) {
                params.unshift("[" + this.nameToString() + "]:");
            }
            if (this.rank(level) >= this.rank(this.options.level)) {
                switch (level) {
                    case level_enum_1.Level.ERROR:
                        (typeof this.options.error == "function") && this.options.error(params);
                        break;
                    case level_enum_1.Level.WARN:
                        (typeof this.options.warn == "function") && this.options.warn(params);
                        break;
                    case level_enum_1.Level.LOG:
                        (typeof this.options.log == "function") && this.options.log(params);
                        break;
                    case level_enum_1.Level.INFO:
                        (typeof this.options.info == "function") && this.options.info(params);
                        break;
                    case level_enum_1.Level.DEBUG:
                        (typeof this.options.debug == "function") && this.options.debug(params);
                        break;
                }
                (typeof this.options.all == "function") && this.options.all(level, params);
                return (_a = console[level]).bind.apply(_a, __spreadArrays([console], params));
            }
            else if (this.options.forceConsoleLog) {
                return (_b = console[level]).bind.apply(_b, __spreadArrays([console], params));
            }
            else {
                return function () {
                };
            }
        }
        catch (err) {
            console.error(err);
        }
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
