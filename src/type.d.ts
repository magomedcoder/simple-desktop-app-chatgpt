type Electron = {
  chatGPTApi: {
    getChatCompletion: () => Promise<string>
  }
}

declare let electron: Electron

type chatCompletionHandler = () => Promise<string>
