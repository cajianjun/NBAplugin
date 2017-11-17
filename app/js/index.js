
'use strict';
var zhiboba = require("../zhiboba");
var list ;
var nbaDiv = document.getElementById("content_nba");
var cbaDiv = document.getElementById("content_cba");

var saishiListModel = "<a href=\"#\" class=\"list-group-item\" index=\"#idx#\"><h4>#title#</h4></a>";

zhiboba.list((liveList)=>{
	list = liveList; 
	var labels = liveList["labels"];
	var livesList = "";
	var hasNBA = false;
	var hasCBA = false;
	for(var i = 0;i < labels.length;i++){
		var domStr = saishiListModel.replace("#title#",labels[i]);
		domStr = domStr.replace("#idx#",i);
		if(labels[i].indexOf("CBA") >= 0){
			hasCBA = true;
			$("#content_cba").append($(domStr));
		}else if(labels[i].indexOf("NBA") >= 0){
			hasNBA = true;
			$("#content_nba").append($(domStr));
		}else{

		}		
		// livesList += labels[i] + "<input type='button' onclick='eventfun2(this)' value='点我看直播' index='" + i + "' /> " +  "<br>";
	}
	if(!hasNBA){
		$("#content_nba").append($(saishiListModel.replace("#title#","今日暂无赛事")));
	}
	if(!hasCBA){
		$("#content_cba").append($(saishiListModel.replace("#title#","今日暂无赛事")));
	}

	$(".list-group-item").
	  click(function() {
	    var idx = $(this).attr('index');
	    var index =  parseInt(idx);
	    console.log("你要看的比赛是：" + list["labels"][index]
			 + ";id=" + list["ids"][index]
			 + ";url=" + list["urls"][index]);
			zhiboba.enterRoom({id:list["ids"][index],url:list["urls"][index]});
	  });
})

// function eventfun2(target){
// 	var index = parseInt(target.getAttribute("index"));
	
// }


