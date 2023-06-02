import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  chatGPTApi: {
    async getChatCompletion(value: string) {
      const result = await ipcRenderer.invoke('chat-completion-ipc', value)
      return result as string
    }
  }
})
