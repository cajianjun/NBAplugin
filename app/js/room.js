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

ipcRenderer.on('ondata', function(event, msg) { // 监听父页面定义的事件
	console.log("start zhibo")
    zhiboba.startZhibo(showLiveMsg);
});

function showLiveMsg(msg){
	label2.innerHTML = label1.innerHTML;
	label1.innerHTML = msg;
}

function leave(target){
	label2.innerHTML = "";
	label1.innerHTML = "";
	zhiboba.leaveRoom();
}
