const { app, BrowserWindow, ipcMain } = require('electron');

//https://www.youtube.com/playlist?list=PLO5I7_31L6v7YCj4OfjA7xZeA-W1EH3bD
//https://www.youtube.com/watch?v=kN1Czs0m1SU

let mainWindow;

function runexec() {
    var exec = require("child_process").exec;
    var cmd =`${__dirname}/sleeps.sh`
    var cmd ="for i in {1..5}; do echo $i; sleep 1; done"
    var child = exec(cmd);
    child.stdout.on('data', function(data) {
        mainWindow.webContents.send("action:run", data);
        console.log(data.toString());
    });
}

ipcMain.on('action:run', function(e, item){
    console.log("event : ipcMain.on(action:run)")
    runexec();
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 640,
        height: 480
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`)
    mainWindow.on('closed', onClosed);

}

function onClosed() {
    console.log("event : onClosed")
    console.log("mainWindow:" + mainWindow)
    mainWindow = null;
    console.log("mainWindow:" + mainWindow)
}

app.on('window-all-closed', () => {
    console.log("event : window-all-closed")
    console.log("mainWindow:" + mainWindow)
    if (process.platform != 'darwin') {
        console.log("this is not darwin paltform")
        app.quit();
    }
})

app.on('activate', () => {
    console.log("event : activate")
    console.log("mainWindow:" + mainWindow)
    if (!mainWindow) {
        createWindow();
    }
})

app.on('ready', () => {
    console.log("event : ready")
    console.log("mainWindow:" + mainWindow)
    createWindow();
    console.log("mainWindow:" + mainWindow)
    
})