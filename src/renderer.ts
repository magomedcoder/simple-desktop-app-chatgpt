let messages: Message[]

const send = async (data: Message) => {
  const result = await electron.chatGPTApi.getChatCompletion(data.content)
  const res = result.choices[0].message
  messages = [data, res]
  return res
}

const item = (data: Message) => {
  const message = document.getElementById('chat-messages')
  message.insertAdjacentHTML('beforeend', '<div class="message">' + (data.role == 'assistant' ? 'ChatGPT' : 'Вы') + ': ' + data.content + '</div>')
  message.scrollTop = message.scrollHeight
}

document.getElementById('chat-form').addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  const element = document.getElementsByTagName('input')[0]
  const message = element.value
  if (message.toString().length) {
    const data = {
      role: 'user',
      content: message
    }
    item(data)
    send(data).then((result: any) => {
      item(result)
    })
    element.value = ''
  }
}, false)
