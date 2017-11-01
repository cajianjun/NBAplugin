var https = require('https');  
  
//var qs = require('querystring');  
  
/*
var data = {  
    a: 123,  
    time: new Date().getTime()};//这是需要提交的数据  
  
  
var content = qs.stringify(data);  
*/  
var indexPageUrl = 'https://www.zhibo8.cc/';
var p_saishi_id = "";
//https://dingshi4pc.qiumibao.com/livetext/data/cache/max_sid/109088/0.htm?time=0.3403258252477268
//https://dingshi4pc.qiumibao.com/livetext/data/cache/livetext/109088/0/lit_page_2/1190.htm?get=0.025520685141342758

// var options = {  
//     hostname: 'dingshi4pc.qiumibao.com',
//     path: ',  
//     method: 'GET'  
// };  

var options = {
    hostname:'www.zhibo8.cc',
    method:'GET'
}


var req = https.request(options, function (res) {  
    console.log('STATUS: ' + res.statusCode);  
    console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        console.log('BODY: ' + chunk);  
    });  
});  
  
req.on('error', function (e) {  
    console.log('problem with request: ' + e.message);  
});  
  
req.end();