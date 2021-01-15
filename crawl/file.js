const fs = require('fs-extra');
const path = require('path');

module.exports = {
    saveFile(path, data) {
        fs.outputFile(path, data);
    }
}