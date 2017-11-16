'use strict';
// const { app } = electron;
const {ipcRenderer} = require('electron');
// const BrowserWindow = require('electron').remote.BrowserWindow;
// const currentWindow = remote.getCurrentWindow();
var zhiboba = require("../zhiboba");
var list ;
var label1 = document.getElementById("label1");
var label2 = document.getElementById("label2");
var roomInfo ;

ipcRenderer.on('ondata', function(event, msg) { // 监听父页面定义的端口
    console.log("roomInfo = " + JSON.stringify(msg))
    roomInfo = msg;
    zhiboba.startZhibo(msg["id"],showLiveMsg);
});

function showLiveMsg(msg){

}
