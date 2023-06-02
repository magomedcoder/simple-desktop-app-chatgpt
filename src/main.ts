import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: ''
})

const openai = new OpenAIApi(configuration)

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

const getChatCompletionHandler: chatCompletionHandler = async () => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: 'Привет'
      }]
    })
    return completion.data.choices[0].message.content
  } catch (e) {
    return 'Error'
  }
}

ipcMain.handle('chat-completion-ipc', getChatCompletionHandler)
