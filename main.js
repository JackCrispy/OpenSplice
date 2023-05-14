const { app, BrowserWindow } = require('electron')
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1980,
    height: 1080,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#374151',
      symbolColor: '#ffffff'
    }
  })

  win.loadFile('./index.html')
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

