const fs = require('fs');

function mkdir(dir) {
    if (fs.existsSync(dir)) {
        console.log("目录已存在: ", dir);
        return false;
    }
    fs.mkdir(dir, function (err) {
        if (!err) {
            console.log("创建新目录: ", dir);
        }
    });
}


module.exports = {
    mkdir
}