'use strict';
const { app } = electron;
const { BrowserWindow } = electron;
var ipcRenderer = require('electron');
const BrowserWindow = require('electron').remote.BrowserWindow;
const currentWindow = remote.getCurrentWindow();
var zhiboba = require("../zhiboba");
var list ;
var label1 = document.getElementById("label1");
var label2 = document.getElementById("label2");


ipcRenderer.on('ondata', function(event, message) { // 监听父页面定义的端口
    console.log(JSON.stringify(message))
});