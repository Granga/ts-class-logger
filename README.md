# TSClassLogger
Simple logger for typescript classes.

## Installation:
`npm install ts-class-logger --save`  

`yarn add ts-class-logger`

## Usage:
```typescript
import {Level, Logger as TSClassLogger, Options} from "ts-class-logger";

class Logger extends TSClassLogger {
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

class TestClass {
    //recommended to send the class name as string:
    private logger = new Logger("TestClass");

    //minification will shorten your class name
    //private logger = new Logger(this);

    makeAPoint() {
        let point = {x: 0, y: 1};

        //notice another pair of brackets, 
        //but console will bring you to this line
        this.logger.debug("Hey, this is my point:", point)();
    }
}
```