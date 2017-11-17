const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
global.windows = {}
global.liveInfo = {id:"",url:""};

let win;
function createWindow() {
  createwindowMain();
  createLiveRoomWindow();
}
function createwindowMain(){
  // 创建窗口并加载页面
  // win = new BrowserWindow({width: 800, height: 400,backgroundColor:"#66CD00",frame:false,alwaysOnTop:true});
  win = new BrowserWindow({width: 1200, height: 900,backgroundColor:"#FFFFFF"});
  win.loadURL(`file://${__dirname}/app/index.html`);

  // 打开窗口的调试工具
  win.webContents.openDevTools();
  // 窗口关闭的监听
  win.on('closed', () => {
    win = null;
  });

  global.windows.mainWindow = win;
}


function createLiveRoomWindow(){
      // 创建窗口并加载页面
  var win2 = new BrowserWindow({
    transparent: true,
    width: 400, 
    height: 200,
    // backgroundColor:"#44FFFFFF",
    frame:false,
    alwaysOnTop:true});

   win2.loadURL(`file://${__dirname}/app/room.html`);
  // win2.webContents.on('did-finish-load', function(){
  //                  win.webContents.send('ondata', {id:"asd",ur:"urllll"});
  //              });
    // 打开窗口的调试工具
  // win2.webContents.openDevTools();
  // win2.webContents.on('did-finish-load', function(){
  //                  win2.webContents.send('ondata',"");
  //              });

  win2.on('closed', () => {
    win2 = null;
  });
  win2.hide();//打开一个窗口
  global.windows.liveRoomWindow = win2;
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

// exports.createLiveRoomWindow = createLiveRoomWindow;