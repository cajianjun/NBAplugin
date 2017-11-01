var https = require("https");
var http = require("http");
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  if(url.indexOf("https") == 0){
    https.get(url, function(res) {
    var data = "";
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
    }).on("error", function() {
      callback(null);
    });
  }else{
    res.setEncoding('utf8');  
    http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
    }).on("error", function() {
      callback(null);
    });
  }

}

exports.download = download;