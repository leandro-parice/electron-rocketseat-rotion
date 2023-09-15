import { BrowserWindow, Menu, Tray, nativeImage } from 'electron'
import path from 'node:path'

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, 'rotionTemplate.png'),
  )
  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
      accelerator: 'CommandOrControl+1',
    },
    { label: 'Documentos recentes', enabled: false },
    { label: 'Teste 1' },
  ])

  tray.setContextMenu(menu)
}
