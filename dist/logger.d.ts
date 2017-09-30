import { Options } from "./options.interface";
export declare class Logger {
    private options;
    private klass;
    constructor(klass: string | object, options: Options);
    debug(...args: any[]): Function;
    log(...args: any[]): Function;
    info(...args: any[]): Function;
    warn(...args: any[]): Function;
    error(...args: any[]): Function;
    private klassToString();
    private _log(level, args);
    private rank(level);
}
