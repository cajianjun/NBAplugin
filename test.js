var https = require('https');  
  
//var qs = require('querystring');  
  
/*
var data = {  
    a: 123,  
    time: new Date().getTime()};//这是需要提交的数据  
  
  
var content = qs.stringify(data);  
*/  

var indexPageUrl = 'https://www.zhibo8.cc/';
var options = {  
    hostname: 'dingshi4pc.qiumibao.com',
    path: '/livetext/data/cache/livetext/109088/0/lit_page_2/1190.htm?get='+Math.random(),  
    method: 'GET'  
};  

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