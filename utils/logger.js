const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const currentDate = new Date();
const timestampDate = format(currentDate, 'dd-MM-yy');
const timestamp = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
const LOG_DIRECTORY = path.join(__dirname, 'log');
const LOG_FILE_PATH = path.join(LOG_DIRECTORY,`Log-${timestampDate}.log`);

const logActivity = (message) => {
    const logMessage = `[${timestamp}] - ${message}\n`;

    if (!fs.existsSync(LOG_DIRECTORY)) {
        fs.mkdirSync(LOG_DIRECTORY);
    } 

    if (!fs.existsSync(LOG_FILE_PATH)) {
        fs.writeFileSync(LOG_FILE_PATH, '', (err) => {
            if (err) {
                console.error('Error creating log file:', err);
            }
        });
    }

    fs.appendFile(LOG_FILE_PATH, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
};

module.exports = {
    logActivity
};
