"use strict";
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;
const path = require('path');
const ffi = require("ffi");
const ref = require("ref");

var mainWindow;

app.setAppPath(__dirname);

var baseDir = "/" + path.basename(__dirname) + "/";

var logToBrowser = function (msg) {
    mainWindow.webContents.executeJavaScript("console.log('" + msg + "');");
}

app.on('ready', () => {
    // var Ucs2String = {
    //     name: "CString",
    //     indirection: 1,
    //     size: ref.sizeof.pointer,
    //     get: function (buffer, offset) {
    //         var _buf = buffer.readPointer(offset)
    //         // TODO: a *real* way to detect the end of the ucs2 string. this is a band-aid...
    //         return _buf.reinterpret(10000).toString('ucs2')
    //     },
    //     set: function (buffer, offset, string) {
    //         var _buf = new Buffer(Buffer.byteLength(string, 'ucs2') + 1)
    //         _buf.write(string, 'ucs2')
    //         _buf[_buf.length - 1] = 0
    //         return buffer.writePointer(_buf, offset)
    //     }
    // }

    // var userLib = ffi.Library("user32.dll", {
    //     "MessageBoxW": ["int", ["int", Ucs2String, Ucs2String, "uint"]]
    // });
    // userLib.MessageBoxW(0, "asd", "фыв", 0);

    mainWindow = new BrowserWindow({ width: 1200, height: 800 });
    logToBrowser("Electron version: " + process.versions['electron']);
    logToBrowser("__dirname: " + __dirname);
    logToBrowser("basedir: " + baseDir);

    electron.protocol.interceptFileProtocol('file',
        function (request, callback) {
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
        function (error) {
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

