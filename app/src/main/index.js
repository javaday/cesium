'use strict'

import { app, BrowserWindow } from 'electron'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

let config = {}
let mainWindow

setupConfig();
setupApp();

function setupConfig() {

  const low = require('lowdb')
  const config = low('cesium.json')

  config
    .defaults({
      tokens: [],
      window: {
        height: 800,
        width: 1064,
        maximized: false
      }
    })
    .write();

  global.config = config
}

function setupApp() {

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

function createWindow() {

  const windowConfig = global.config.get('window').value();

  console.log(windowConfig)

  mainWindow = new BrowserWindow({
    x: windowConfig.x,
    y: windowConfig.y,
    width: windowConfig.width,
    height: windowConfig.height
  });

  if (windowConfig.maximized) {
    mainWindow.maximize();
  }

  mainWindow.loadURL(winURL)

  mainWindow.on('close', () => {

    let bounds = mainWindow.getBounds();
    
    global.config
      .set('window', {
        x: bounds.x,
        y: bounds.y,
        height: bounds.height,
        width: bounds.width,
        maximized: mainWindow.isMaximized()
      })
      .write();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
