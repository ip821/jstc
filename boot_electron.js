"use strict";
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;
const path = require('path');

var mainWindow;

app.setAppPath(__dirname);

var baseDir = "/" + path.basename(__dirname) + "/";

var logToBrowser = function(msg) {
    mainWindow.webContents.executeJavaScript("console.log('" + msg + "');");
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 1200, height: 800 });
    logToBrowser("Electron version: " + process.versions['electron']);
    logToBrowser("__dirname: " + __dirname);
    logToBrowser("basedir: " + baseDir);

    electron.protocol.interceptFileProtocol('file',
        function(request, callback) {
            var url = request.url;
            logToBrowser("Requested url: " + url);
            var pathReal = url.replace("file:///", "");
            if (pathReal.indexOf(baseDir) < 0) {
                var pathParsed = path.parse(pathReal);
                if (pathParsed.base == "") {
                    pathParsed.base = "index.html";
                }
                var pathRelative = pathParsed.dir.replace(pathParsed.root, "");
                pathReal = path.join(__dirname, pathRelative, pathParsed.base);
            }
            if (process.platform == "win32") {
                pathReal = pathReal.split("\\").join("/");//.replace("\\", "/");
            } else {
                pathReal = "/" + pathReal;
            }
            logToBrowser("Real url: " + pathReal);
            callback({ path: pathReal });
        },
        function(error) {
            if (error) {
                console.log(error);
                return;
            }

            if (process.argv.indexOf("--debug_mode") != -1) {
                mainWindow.maximize();
                mainWindow.webContents.openDevTools();
            } else {
                mainWindow.setMenu(null);
            }

            mainWindow.loadURL('file://' + __dirname + '/index.html');
        });
});

app.on('window-all-closed', () => {
    app.quit();
});

