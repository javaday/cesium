'use strict'

import { app, Menu, BrowserWindow } from 'electron'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.ejs`

let config = {}
let mainWindow

setupConfig();
setupApp();

function setupConfig() {

  const userData = app.getPath('userData');  

  console.log('userData: ', userData);

  const low = require('lowdb');
  const config = low(userData + '/cesium.json');

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
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  });

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

  mainWindow.loadURL(winURL);

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

  createMenus();
}

function createMenus() {

  var template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Cut',
          role: 'cut'
        },
        {
          label: 'Copy',
          role: 'copy'
        },
        {
          label: 'Paste',
          role: 'paste'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Developer Tools',
          type: 'checkbox',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: () => mainWindow.webContents.toggleDevTools()
        },
        {
          label: 'Reload',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+R' : 'Ctrl+Shift+R',
          click: () => mainWindow.webContents.reload()
        }
      ]
    },
    {
      label: 'Tokens',
      submenu: [
        {
          label: 'Add Token',
          accelerator: 'CmdOrCtrl+O',
          click: () => mainWindow.webContents.send('Menu', 'AddToken') // dispatch to window
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    // Add Cesium app menu (OS X)
    template.unshift({
      label: 'Cesium',
      submenu: [
        {
          label: 'About Cesium',
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Cesium',
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => app.quit()
        }
      ]
    });
  }

  let menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
}
