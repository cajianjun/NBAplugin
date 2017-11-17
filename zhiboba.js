
const cheerio = require("cheerio");

var server = require("./curl");
// var main = require("./main");
 
var url = 'https://www.zhibo8.cc/';
var gameLiveBodyArr = [];
var gameLiveIdArr = [];
var lastPlayId = 0;
var lastPageId = 0;
var curSaishiId = 0;

function list(cb){
  server.download(url, function(data) {
    if (data) {
      //console.log(data);
   
      var $ = cheerio.load(data);
      var lis = $("div .content").first().find("li");
      var basketLabels = [];
      var basketIdArr = [];
      var basketLiveUrlsArr = [];
      var liveList = {};
      liveList["labels"] = basketLabels;
      liveList["ids"] = basketIdArr;
      liveList["urls"] = basketLiveUrlsArr;
      lis.map(function(i, el) {
                          // this === el
                          var labelStr = $(this).attr('label');
                          if(labelStr.indexOf("CBA") > -1 || labelStr.indexOf("NBA") > -1 ){
                            basketLabels.push(labelStr);
                            basketIdArr.push($(this).attr('id'));

                            var tmpLiveUrl = "";
                            var length =  $(this).find('a').length;
                            for(var i = 0;i < length;i++){
                                if("文字" == $(this).find('a').eq(i).text()){
                                  tmpLiveUrl =  $(this).find('a').eq(i).attr("href");
                                  break;
                                }
                            }
                            basketLiveUrlsArr.push(tmpLiveUrl)
                          }
                          return ;
                        });
      cb(liveList);
      // var saishiIndex = show(labelArr);
      // var saishiId = idArr[saishiIndex].replace("saishi","");
      // curSaishiId = saishiId;
      // getMsg();
    } else {
        console.log("error");
    } 
  });
}



function enterRoom(info){
  const remote = require('electron').remote;
  var liveRoomWindow = remote.getGlobal("windows").liveRoomWindow;
  remote.getGlobal("liveInfo").id = info.id;
  remote.getGlobal("liveInfo").url = info.url;
  liveRoomWindow.show();
  liveRoomWindow.webContents.send('ondata', {});
}

function leaveRoom(){
  const remote = require('electron').remote;
  var liveRoomWindow = remote.getGlobal("windows").liveRoomWindow;
  clearInterval(getMsgInterval);
  clearInterval(playInterval);
  liveRoomWindow.hide();
}

var getMsgInterval;
var playInterval;
function startZhibo(cb){
  const remote = require('electron').remote;
  var saishiid = remote.getGlobal("liveInfo").id;
  var tmpGetMsg = function(){
    getMsg(saishiid,cb);
  }
    getMsgInterval= setInterval(tmpGetMsg,2000);
  var tmpPlay = function(){
    play(cb);
  }
   playInterval = setInterval(tmpPlay,2000);
}

function getMsg(saishiid,cb){
  var getIdUrl = "https://dingshi4pc.qiumibao.com/livetext/data/cache/max_sid/" + saishiid+ "/0.htm?time=";
  var getContentUrl = "https://dingshi4pc.qiumibao.com/livetext/data/cache/livetext/" + saishiid + "/0/lit_page_2/[pageId].htm?get=";
  server.download(getIdUrl + Math.random(),function(data){
    var pageid = parseInt(data);
    if(pageid == lastPageId){
      return;
    }
    if(pageid % 2 == 1){
      pageid ++;
    }
    server.download(getContentUrl.replace("[pageId]",pageid + "") + Math.random(),function(data1){
      if(data1){
        var liveObjArr ;
        try{
          liveObjArr= JSON.parse(data1);
        }catch(e){
          console.log("解析直播内容失败");
        }
        if(liveObjArr){
          liveObjArr.map((item,index)=>{
          if(item.live_id && gameLiveIdArr.indexOf(item.live_id) == -1){
            gameLiveIdArr.push(item.live_id);
            gameLiveBodyArr.push(item);
          }
          play(cb);
        })
        }
        
      }
    
    })
  })
}


function play(cb){
  var index = gameLiveIdArr.indexOf(lastPlayId);
  if(index != (gameLiveIdArr.length -1)){
    index ++;
    lastPlayId = gameLiveIdArr[index];
    var item = gameLiveBodyArr[index];
    var displayStr =item.user_chn + ":" + item.live_text + "      " + item.visit_score + "-" + item.home_score + "      " + item.pid_text ;
    if(cb){
      cb(displayStr);
    }
  }
}

exports.list = list;
exports.enterRoom = enterRoom;
exports.startZhibo  = startZhibo ;
exports.leaveRoom = leaveRoom;