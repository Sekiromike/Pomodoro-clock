const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 400,
        frame: false, // Frameless window
        transparent: true, // Transparent for custom shapes (if supported)
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        // Icon would go here
        titleBarStyle: 'hidden',
    })

    // In dev mode, wait for Vite server or load localhost
    // In production, load file
    const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged;

    if (isDev) {
        // We'll run the vite dev server and load that
        win.loadURL('http://localhost:5173');
        // win.webContents.openDevTools({ mode: 'detach' }); // Optional: for debugging
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    ipcMain.on('minimize-window', () => {
        win.minimize()
    })

    ipcMain.on('close-window', () => {
        win.close()
    })

    ipcMain.on('toggle-fullscreen', () => {
        const isFullScreen = win.isFullScreen()
        win.setFullScreen(!isFullScreen)
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
