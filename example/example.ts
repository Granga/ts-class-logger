import {Level, Logger as TSClassLogger, Options} from "../src";

let options: Options = {
    level: Level.DEBUG,
    timestamp: false,
    debug: (args: any[]) => {
        //your custom logic, for example send log to server
    },
    log: undefined,
    info: undefined,
    error: undefined,
    warn: undefined,
    all: undefined
};

export const Logger = (name: string) => new TSClassLogger(name, options);

export class ExampleClass {
    //recommended to send the class name as string:
    private logger = Logger("ExampleClass");

    makeAPoint() {
        let point = {x: 0, y: 1};

        //notice another pair of brackets, but console will bring you to this line
        this.logger.debug("Hey, this is my point:", point)();
    }
}