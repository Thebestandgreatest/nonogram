const { remote, ipcMain, app, BrowserWindow, Menu, shell, dialog, Accelerator, MenuItem} = require('electron');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const menu = new Menu()
menu.append(new MenuItem({
    label: 'Puzzle',
    submenu: [{
        label: 'Reset',
        role: 'Reset',
        accelerator: process.platform === 'darwin' ? 'Cmd+R' : 'Ctrl+R',
        click: () => resetBoard()
    },
    {
        label: 'Open',
        role: 'Open',
        accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+O',
        click: () => getFile()
    },
    {
        label: 'Undo',
        role: 'Undo',
        accelerator: process.platform === 'darwin' ? 'Cmd+Z' : 'Ctrl+Z',
        click: () => undoMove()
    },
    {
        label: 'Redo',
        role: 'Redo',
        accelerator: process.platform === 'darwin' ? 'Cmd+Y' : 'Ctrl+Y',
        click: () => redoMove()
    }]
}));

Menu.setApplicationMenu(menu);

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('index.html');
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

async function openPuzzle() {
    var fileContents = [];
    dialog.showOpenDialog({ 
        filters: [{name: 'Nonogram Puzzle', extensions: ['np']}],
        properties: ['openFile']
    }).then(result => {
        const rl = readline.createInterface({
            input: fs.createReadStream(result.filePaths[0]),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            console.log(`${line}`);
            fileContents.push(line);
        });
    });
}

const getFile = async() => {
    const files = await dialog.showOpenDialog({ 
        properties: ['openFile'], 
        filters: [{ name: 'Nonogram Puzzle', extensions: ['np'] }]
    });

    if (!files) return;
    const content = fs.readFileSync(files[0]).toString();

    console.log(content);
}