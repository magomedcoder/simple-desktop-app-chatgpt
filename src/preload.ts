import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  chatGPTApi: {
    async getChatCompletion() {
      return await ipcRenderer.invoke('chat-completion-ipc')
    }
  }
})
