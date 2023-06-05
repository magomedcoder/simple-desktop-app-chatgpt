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
