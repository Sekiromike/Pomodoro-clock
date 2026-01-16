const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window'),
    toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen')
})

window.addEventListener('DOMContentLoaded', () => {
    // Preload logic if needed
})
