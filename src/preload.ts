import { contextBridge, ipcRenderer } from 'electron'
import { RunResult } from 'sqlite3'

contextBridge.exposeInMainWorld('electron', {
  chatGPTApi: {
    async getChatCompletion(value: string) {
      const result = await ipcRenderer.invoke('chat-completion-ipc', value)
      return result as string
    }
  },
  chatGPTDB: {
    async run(sql: string, callback?: (this: RunResult, err: Error | null) => void) {
      return await ipcRenderer.invoke('db-run-ipc', sql, callback)
    },
    async all(sql: string) {
      return await ipcRenderer.invoke('db-all-ipc', sql)
    }
  }
})
