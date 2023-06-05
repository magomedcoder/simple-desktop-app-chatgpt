const setDB = async (data: Message): Promise<Message> => {
  await electron.chatGPTDB.run('INSERT INTO messages(role, content) VALUES (?, ?);', [data.role, data.content])
  return data
}

const send = async (data: Message) => {
  const messages = await electron.chatGPTDB.all('SELECT role, content FROM messages ORDER BY id ASC LIMIT 20')
  messages.push({
    role: 'user',
    content: data.content
  })
  const result = await electron.chatGPTApi.getChatCompletion(messages)
  const res = result.choices[0].message
  await setDB(data)
  return await setDB(res)
}

const getDB = async (): Promise<Message[]> => {
  return await electron.chatGPTDB.all('SELECT role, content FROM messages ORDER BY id ASC LIMIT 20')
}

const item = (data: Message) => {
  const message = document.getElementById('chat-messages')
  message.insertAdjacentHTML('beforeend', '<div class="message">' + (data.role == 'assistant' ? 'ChatGPT' : 'Вы') + ': ' + data.content + '</div>')
  message.scrollTop = message.scrollHeight
}

getDB().then((rows: Message[]) => {
  rows.forEach((row: Message) => item(row))
})

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
