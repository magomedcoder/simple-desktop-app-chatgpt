type Electron = {
  home: {
    get: () => Promise<string>
  }
}

declare let electron: Electron

type homeHandler = () => Promise<string>
