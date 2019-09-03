var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/',function(req, res, next) {});
router.post('/', function(req, res, next) {//ここでもうboardに遷移してもいいかも
    //google
    var options_google = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        uri: 'https://hacku-techlion.herokuapp.com/google/login',
        body: JSON.stringify({"name":'amazon',})};
//POST GOOGLE
var baseRequest = request.defaults({
  headers: {'Content-Type': 'application/json'}
})
baseRequest(options_google, function(error,response,body){

    if (!error) {
      console.log('response status: ' + response.statusCode);
    //   console.log('response headers content-type: ' + response.headers['content-type']);
    //   console.log('response body message: ' + response.body);
    //   console.log('response body message: ' + response.body[2]);
      var data = {};
      data = body;
        console.log(data);
        var google_data = {
            p_html:data,}
        res.render('hello', google_data);
    };
});
//POST GOOGLE
  
});

module.exports = router;