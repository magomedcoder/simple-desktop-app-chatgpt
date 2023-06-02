import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { Configuration, OpenAIApi } from 'openai'
import { Database, RunResult } from 'sqlite3'

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

const getChatCompletionHandler: chatCompletionHandler = async (electron, value) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: value
      }]
    })
    return { choices: completion.data.choices }
  } catch (e) {
    return { error: 'Error' }
  }
}

const db = new Database('chatgpt.sqlite')

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, role VARCHAR(255) NOT NULL, content TEXT NOT NULL)')
})

const DBRunHandler: getRunHandler = async (electron, sql: string, callback?: (this: RunResult, err: Error | null) => void) => {
  db.run(sql, callback)
  return db
}

const DBAllHandler: getAllHandler = async (electron, sql: string) => {
  return new Promise((resolve: any) => {
    db.all(sql, (err: any, rows: any) => resolve(rows))
  })
}

ipcMain.handle('chat-completion-ipc', getChatCompletionHandler)
ipcMain.handle('db-run-ipc', DBRunHandler)
ipcMain.handle('db-all-ipc', DBAllHandler)
