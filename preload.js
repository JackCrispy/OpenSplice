const { contextBridge } = require('electron')

const fs = require('fs')

function getFiles(path) {
    var files = fs.readdirSync(path);
    var list = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var stat = fs.statSync(path + "/" + file);
        if (stat && stat.isDirectory()) {
            list = list.concat(getFiles(path + "/" + file));
        } else {
            if (file.endsWith(".wav")) {
                list.push(path + "/" + file);
            }
        }
    }
    return list;
}

var files = getFiles("C:/Users/frost/Documents/Splice/Samples/Packs");
var list = [];

for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var name = file.split("/").pop();
    list.push({
        name: name,
        path: file
    });
}

contextBridge.exposeInMainWorld('files', {
    list: list
})