'use strict';
var zhiboba = require("../zhiboba");
var list ;
var aLabel = document.getElementById("content");
aLabel.text = "loading!!!!!";

zhiboba.list((liveList)=>{
	list = liveList; 
	var labels = liveList["labels"];
	var livesList = "";
	for(var i = 0;i < labels.length;i++){
		livesList += labels[i] + "<input type='button' onclick='eventfun2(this)' value='点我看直播' index='" + i + "' /> " +  "<br>";
	}
	aLabel.innerHTML = livesList;
})

function eventfun2(target){
	var index = parseInt(target.getAttribute("index"));
	alert("你要看的比赛是：" + list["labels"][index]
	 + ";id=" + list["ids"][index]
	 + ";url=" + list["urls"][index]);
	zhiboba.enterRoom();
}

