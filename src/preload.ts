import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  home: {
    async get() {
      return await ipcRenderer.invoke('home-ipc')
    }
  }
})
