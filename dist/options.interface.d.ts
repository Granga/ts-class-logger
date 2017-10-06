import { Level } from "./level.enum";
export interface Options {
    forceConsoleLog?: boolean;
    level?: Level;
    debug?: (args: any[]) => void;
    log?: (args: any[]) => void;
    info?: (args: any[]) => void;
    warn?: (args: any[]) => void;
    error?: (args: any[]) => void;
    all?: (level: Level, args: any[]) => void;
}
