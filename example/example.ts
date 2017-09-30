import {Level, Logger as TSClassLogger, Options} from "../src";

export class Logger extends TSClassLogger {
    constructor(klass: string | object) {
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

        super(klass, options);
    }
}

export class ExampleClass {
    //recommended to send the class name as string:
    private logger = new Logger("ExampleClass");

    //minification will shorten your class name
    //private logger = new Logger(this);

    makeAPoint() {
        let point = {x: 0, y: 1};

        //notice another pair of brackets, but console will bring you to this line
        this.logger.debug("Hey, this is my point:", point)();
    }
}