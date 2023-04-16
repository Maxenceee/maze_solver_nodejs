var fs = require('fs');

let instance = null;

let dirlogsPath = require('path').resolve(__dirname, "../logs");
let logsPath = require('path').resolve(__dirname, "../logs/requests.log");

class Visitors {
    static getVisitorsInstance() {
        // create logs dir if does exist
        if (!fs.existsSync(logsPath)) {
            fs.mkdirSync(dirlogsPath);
        }
        return instance ? instance : new Visitors();
    }

    accesLogStream = fs.createWriteStream(logsPath, {flags: 'a'})
}

module.exports = Visitors;