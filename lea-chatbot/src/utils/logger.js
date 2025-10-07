const fs = require('fs');

class Logger {
    static log(message) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] INFO: ${message}`);
    }

    static error(message) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] ERROR: ${message}`);
    }

    static warn(message) {
        const timestamp = new Date().toISOString();
        console.warn(`[${timestamp}] WARN: ${message}`);
    }

    static logToFile(message, filePath) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        fs.appendFile(filePath, logMessage, (err) => {
            if (err) {
                console.error(`Failed to write to log file: ${err}`);
            }
        });
    }
}

module.exports = Logger;