import colors from "colors/safe";

class Logger {
    log: (msg: string | Error) => void;

    constructor() {
        this.log = console.log;
    }


    WARNING(msg: string) {
        this.log(colors.red(msg));
    }

    INFO(msg: string) {
        this.log(colors.yellow(msg));
    }

    ERROR(msg: string ) {
        this.log(colors.red(msg));
    }
}

const logger = new Logger();
export default logger;
