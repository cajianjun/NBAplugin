const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
let win;
var filename = "a aaaaaaaaa";
function createWindow() {
  // 创建窗口并加载页面
  win = new BrowserWindow({width: 400, height: 200,backgroundColor:"#66CD00",frame:false,alwaysOnTop:true});
  win.loadURL(`file://${__dirname}/index.html`);

  // 打开窗口的调试工具
  win.webContents.openDevTools();
  // 窗口关闭的监听
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});