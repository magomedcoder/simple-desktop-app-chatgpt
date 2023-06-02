import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

const createWindow = (): void => {
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    title: 'ChatGPT',
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile(path.join(__dirname, '../src/index.html'))
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

const getHomeHandler: homeHandler = async () => {
  return 'Test'
}

ipcMain.handle('home-ipc', getHomeHandler)
