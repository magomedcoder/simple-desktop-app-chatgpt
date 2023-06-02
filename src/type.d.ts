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
}

declare let electron: Electron

type chatCompletionHandler = (e: Electron.IpcMainInvokeEvent, p: string) => any

interface Message {
  role: string,
  content: string
}
