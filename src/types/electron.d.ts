type Electron = {
  chatGPTApi: {
    getChatCompletion: (messages: Message[]) => Promise<AIResponse>
  }
  chatGPTDB: {
    run: (sql: any, callback?: any) => any
    all: (sql: any) => any
  }
}

declare let electron: Electron

type chatCompletionHandler = (e: Electron.IpcMainInvokeEvent, p: any) => any
type getRunHandler = (e: Electron.IpcMainInvokeEvent, sql: string, callback?: any) => any
type getAllHandler = (e: Electron.IpcMainInvokeEvent, sql: string) => any
