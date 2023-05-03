const electron = require("electron");

const { app, BrowserWindow } = electron;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 1268,
    height: 768,
    autoHideMenuBar: true,
    title: "Wheathercast",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});