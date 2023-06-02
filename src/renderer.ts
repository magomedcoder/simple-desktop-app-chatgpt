const run = async () => {
  return await electron.chatGPTApi.getChatCompletion()
}

run().then((r: string) => {
  console.log(r)
})
