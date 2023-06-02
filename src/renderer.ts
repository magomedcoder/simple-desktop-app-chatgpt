const run = async () => {
  return await electron.home.get()
}

run().then((r: string) => {
  console.log(r)
})
