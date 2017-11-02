'use strict';
var zhiboba = require("../zhiboba");

var aLabel = document.getElementById("myword");
aLabel.text = "fuckyou！";

zhiboba.list((saishiArr)=>{
	var saishiStr = "";
	for(var i = 0;i < saishiArr.length;i++){
		saishiStr += saishiArr[i] + "\r\n";
	}
	aLabel.text = saishiStr;
})

