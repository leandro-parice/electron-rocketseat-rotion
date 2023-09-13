import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

const api = {
  fetchDocuments(params: any) {
    return ipcRenderer.invoke('fetch-documents', params)
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore (define in dts)
  window.api = api
}
