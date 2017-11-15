const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
// global.windows = {}
let win;
let win2;
function createWindow() {
  createwindow1();
  createwindow2();
}
function createwindow1(){
  // 创建窗口并加载页面
  // win = new BrowserWindow({width: 800, height: 400,backgroundColor:"#66CD00",frame:false,alwaysOnTop:true});
  win = new BrowserWindow({width: 1500, height: 800,backgroundColor:"#FFFFFF"});
  win.loadURL(`file://${__dirname}/app/index.html`);

  // 打开窗口的调试工具
  win.webContents.openDevTools();
  // 窗口关闭的监听
  win.on('closed', () => {
    win = null;
  });
}

function createwindow2() {
  // 创建窗口并加载页面
  // win = new BrowserWindow({width: 800, height: 400,backgroundColor:"#66CD00",frame:false,alwaysOnTop:true});
  win2 = new BrowserWindow({width: 700, height: 300,backgroundColor:"#66CD00"});
  win2.loadURL(`file://${__dirname}/app/index.html`);

  // 打开窗口的调试工具
  win2.webContents.openDevTools();
  // 窗口关闭的监听
  win2.show();
  win.on('closed', () => {
    win = null;
  });
}

// function createLiveRoomWindow(){
//       // 创建窗口并加载页面
//   win2 = new BrowserWindow({width: 800, height: 400,backgroundColor:"#66CD00"});

//   win2.loadURL(`file://${__dirname}/app/room.html`);
//   win2.webContents.on('did-finish-load', function(){
//                    win.webContents.send('ondata', {id:"asd",ur:"urllll"});
//                });
//   win2.on('closed', () => {
//     win2 = null;
//   });
//   win2.show();//打开一个窗口
// }

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

// exports.createLiveRoomWindow = createLiveRoomWindow;