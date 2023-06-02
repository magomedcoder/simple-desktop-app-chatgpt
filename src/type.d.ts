type AIResponse = {
  choices?: AIChoicesResponse[]
  error?: AIErrorResponse
}

type AIChoicesResponse = {
  message: AIChoicesMessageResponse
}

type AIChoicesMessageResponse = {
  role: string
  content: string
}

type AIErrorResponse = {
  type: string
  message: string
}

type Electron = {
  chatGPTApi: {
    getChatCompletion: (value: string) => Promise<AIResponse>
  }
  chatGPTDB: {
    run: (sql: any, callback?: any) => any
    all: (sql: any) => any
  }
}

declare let electron: Electron

type chatCompletionHandler = (e: Electron.IpcMainInvokeEvent, p: string) => any
type getRunHandler = (e: Electron.IpcMainInvokeEvent, sql: string, callback?: any) => any
type getAllHandler = (e: Electron.IpcMainInvokeEvent, sql: string) => any

interface Message {
  role: string,
  content: string
}
