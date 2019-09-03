//2019.9.3 API認証を行うために作成した。POSTを３つ送る。

var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res, next){
    //スラッシュでいい
  var data = {
    set_name: 'お名前',
    set_gmail: 'gmailを入力してください',
    set_twitter:'twitterアカウントIDを＠を除いて入力してください',
  }
  res.render('signup', data);
});

router.post('/',function (req, res, next){
  var name = req.body['name'];
  console.log(name);
  var google = req.body['google'];
  var twitter = req.body['twitter'];
  //signupのはじめのポスト先
  var options = {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    uri: 'https://hacku-techlion.herokuapp.com/sign-up',
    body: JSON.stringify({"name":name,
    "google":google,"twitter":twitter})
};
    console.log(options.body);
    //twitter
    var options_twitter = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        uri: 'https://hacku-techlion.herokuapp.com/twitter/login',
        body:JSON.stringify({"name":"amazon"})};
        //""で囲まない500エラーでる

    //headersを既定する
    var baseRequest = request.defaults({
        headers: {'Content-Type': 'application/json'}
    })
//POST
baseRequest(options, function(error,response,body){

    if (!error) {
      console.log('signup response status: ' + response.statusCode);
    //   console.log('response headers content-type: ' + response.headers['content-type']);
    //   console.log('response body message: ' + response.body);
    //   console.log('response body message: ' + response.body[2]);
      var data = {};
      // data.twitterTasks = JSON.parse(body);
        console.log(data);
        console.log(body);
    };
});
//google
var options_google = {
  headers: {'Content-Type': 'application/json'},
  method: 'POST',
  uri: 'https://hacku-techlion.herokuapp.com/google/login',
  body:JSON.stringify({"name":"amazon"})};
baseRequest(options_google, function(error,response,body){

  if (!error) {
    console.log('google response status: ' + response.statusCode);
    console.log('google response headers content-type: ' + response.headers['content-type']);
    console.log('google response body message: ' + response.body);
    console.log('googleresponse body message: ' + response.body[2]);
    var data = body;
    // data=JSON.parse(data);
          console.log("googlebody"+data);
      // res.render('hello', { p_html:data});//表示する　ここの第一引数は.ejsの前の部分。dataに格納されているものでejsで対応するものがないとエラーを履く。
                  console.log("google end段階データの受信終了");
  }
  else {//エラーのやつ
    console.log('error: ' + error.message);
    res.status(500);
    res.end('Internal Server Error'); // これがないとレスポンスが返らない
  };
});


//twitter
baseRequest(options_twitter, function(error,response,body){

  if (!error) {
    console.log('twitter response status: ' + response.statusCode);
    console.log('twitter response headers content-type: ' + response.headers['content-type']);
    console.log('twitter response body message: ' + response.body);
    console.log('twitter response body message: ' + response.body[2]);
    var data = body;
    // data=JSON.parse(data);
          console.log(data);
      res.render('hello', { p_html:data});//表示する　ここの第一引数は.ejsの前の部分。dataに格納されているものでejsで対応するものがないとエラーを履く。
                  console.log("twitter end段階データの受信終了");
  }
  else {//エラーのやつ
    console.log('error: ' + error.message);
    res.status(500);
    res.end('Internal Server Error'); // これがないとレスポンスが返らない
  };
});
});



//以上



// router.post('/confirm', (req, res, next) => {//ここでもうboardに遷移してもいいかも
//   var data = {
//     title: '登録情報の登録完了！',
//     content: name + 'さんの会員登録情報が確認できました。'
//   }
//   res.render('hello', data);
  
// })

module.exports = router;