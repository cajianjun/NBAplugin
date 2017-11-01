var cheerio = require("cheerio");
var server = require("./curl");
 
var url = 'https://www.zhibo8.cc/';
var gameLiveBodyArr = [];
var gameLiveIdArr = [];
var lastPlayId = 0;
var lastPageId = 0;
var curSaishiId = 0;

server.download(url, function(data) {
  if (data) {
    //console.log(data);
 
    var $ = cheerio.load(data);
    var lis = $("div .content").first().find("li");
    var labelArr = lis.map(function(i, el) {
                        // this === el
                        return $(this).attr('label');
                      });
    var idArr = lis.map(function(i, el) {
                        // this === el
                        return $(this).attr('id');
                      });
    var urls = lis.map(function(i, el) {
                        // this === el
                        var length =  $(this).find('a').length;
                        for(var i = 0;i < length;i++){
                            if("文字" == $(this).find('a').eq(i).text()){
                              return $(this).find('a').eq(i).attr("href");
                            }
                        }
                        return "";
                      });
    var saishiIndex = show(labelArr);
    var saishiId = idArr[saishiIndex].replace("saishi","");
    curSaishiId = saishiId;
    getMsg();
  } else {
      console.log("error");
  } 
});

function show(labels){
  var saishiIndex  = 1;
  // NBA,湖人,活塞,篮球
  labels.map((index,item)=>{
    
    var strArr = item.split(",");
    if("NBA" == strArr[0] || "CBA" == strArr[0] ){
      saishiIndex = index;
      console.log(strArr[1] + "VS" + strArr[2]);
      if("山西" == strArr[1] || "山西" == strArr[2]){
        return false;  
      }
      
    }
  });
  return saishiIndex;
}

//起两个定时任务，一个刷新UI，一个定时获取数据
var taskUI = setInterval(getMsg,2000);
var taskData = setInterval(play,2000);

function getMsg(){
  var getIdUrl = "https://dingshi4pc.qiumibao.com/livetext/data/cache/max_sid/" + curSaishiId+ "/0.htm?time=";
  var getContentUrl = "https://dingshi4pc.qiumibao.com/livetext/data/cache/livetext/" + curSaishiId + "/0/lit_page_2/[pageId].htm?get=";
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
        var liveObjArr = JSON.parse(data1);
        liveObjArr.map((item,index)=>{
          if(item.live_id && gameLiveIdArr.indexOf(item.live_id) == -1){
            gameLiveIdArr.push(item.live_id);
            gameLiveBodyArr.push(item);
          }
          play();
        })
      }
    
    })
  })
}


function play(){
  var index = gameLiveIdArr.indexOf(lastPlayId);
  if(index != (gameLiveIdArr.length -1)){
    index ++;
    lastPlayId = gameLiveIdArr[index];
    var item = gameLiveBodyArr[index];
    console.log(item.user_chn + ":" + item.live_text + "      " + item.visit_score + "-" + item.home_score + "      " + item.pid_text);
  }
}