var express = require('express');
var request = require('request');

var https = require('https');
var http = require('http');
//ルーティングオブジェクトの生成
var router = express.Router();

//あとで消す
var fs = require('fs');
var ejs = require('ejs');
var server = http.createServer();
//実装
//認証時はこれを使おう
var options = {
  headers: {'Content-Type': 'application/json'},
  method: 'POST',
  uri: 'https://hacku-techlion.herokuapp.com/login',
  body: JSON.stringify({"twitter":"test73685408",'Content-Type': 'application/json'})
  };

//option2(twitter取得)
var options_twitter = {
  headers: {"Cookie":"user_id=testtechlion",'Content-Type': 'application/json'},
  method: 'GET',
  uri: 'https://hacku-techlion.herokuapp.com/twitter/today?q=morning',
  body: JSON.stringify({"twitter":"test73685408",'Content-Type': 'application/json'})
  };

  //option2(twitter取得)
var options_twitter_event = {
  headers: {"Cookie":"user_id=testtechlion",'Content-Type': 'application/json'},
  method: 'GET',
  uri: 'https://hacku-techlion.herokuapp.com/twitter/today/detail?q=event"',
  body: JSON.stringify({"twitter":"test73685408",'Content-Type': 'application/json'})
  };

  //option2(google取得)
var options_google = {
  headers: {'Content-Type': 'application/json'},
  method: 'GET',
  json:true,
  uri: 'https://hacku-techlion.herokuapp.com/twitter/today?q=lunch',
  body: JSON.stringify({"twitter":"test73685408",'Content-Type': 'application/json'})
  };


console.log("test");
var baseRequest = request.defaults({
  headers: {'Content-Type': 'application/json'}
})
var baseRequest2 = request.defaults({
  headers: {'Content-Type': 'application/json'}
})

router.get('/:board_id', function(req, res,next) {
  var boardId = req.params.board_id;//get後ろを取得 
  var test = req.cookies.test; 

  //取得関数
  baseRequest(options, function(error,response,body){

      if (!error) {
        console.log('response status: ' + response.statusCode);
        console.log('response headers content-type: ' + response.headers['content-type']);
        console.log('response body message: ' + response.body);
        console.log('response body message: ' + response.body[2]);
        var data = {};
        data.log = JSON.parse(body);
        console.log(data);
        console.log(data.logs);

        //res.render('board', data);//表示する　ここの第一引数は.ejsの前の部分。dataに格納されているものでejsで対応するものがないとエラーを履く。
                  console.log("end段階データの受信終了");
  
    }
      else {//エラーのやつ
        console.log('error: ' + error.message);
        res.status(500);
        res.end('Internal Server Error'); // これがないとレスポンスが返らない
      }
  
  
});

//Twitter処理
baseRequest(options_twitter, function(error,response,body1){
console.log("twitter処理開始")
  if (!error) {
    console.log('response status: ' + response.statusCode);
    console.log('response headers content-type: ' + response.headers['content-type']);
    console.log('response body message: ' + response.body);
    console.log('response body message: ' + response.body[2]);
    var data1 = {};
    data1.twitterTasks = JSON.parse(body1);
    console.log(data1);
    console.log(data1.twitterTasks);
      res.render('board', data1);//表示する　ここの第一引数は.ejsの前の部分。dataに格納されているものでejsで対応するものがないとエラーを履く。
              console.log("end段階データの受信終了");

}
  else {//エラーのやつ
    console.log('error: ' + error.message);
    res.status(500);
    res.end('Internal Server Error'); // これがないとレスポンスが返らない
  }


});

//Twitter_EVENT
baseRequest2(options_twitter_event, function(error,response,body2){
  console.log("twitter処理開始")
    if (!error) {
      console.log('response status: ' + response.statusCode);
      console.log('response headers content-type: ' + response.headers['content-type']);
      console.log('response body message: ' + response.body);
      console.log('response body message: ' + response.body[2]);
      var data2={};
      data1.twitterEvents = JSON.parse(body2);
      console.log(data2);
      console.log(data2.twitterEvents);
        res.render('board', data2);//表示する　ここの第一引数は.ejsの前の部分。dataに格納されているものでejsで対応するものがないとエラーを履く。
                console.log("end段階データの受信終了");
  
  }
    else {//エラーのやつ
      console.log('error: ' + error.message);
      res.status(500);
      res.end('Internal Server Error'); // これがないとレスポンスが返らない
    }
  
  
  });

});
 //reqの最後行


//これでapp.js側でこのファイルを扱うことができる
module.exports = router;

