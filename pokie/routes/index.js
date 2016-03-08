var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
  
});


router.get('/pokemon',function(req, res){
//console.log("In Pokemon");
var pokemon;
fs.readFile(__dirname + '/pokemon.txt', 'utf8', function (err, data) {
   if (err) {
     return console.log(err);
   }
   var obj =[];
   obj = JSON.parse(data);
   //console.log(obj[1]);
   //console.log("end");
   pokemon = obj;
   res.send(obj);
});
//console.log(pokemon);

});

//var politics = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
//router.get('/politics', function(req,res) {
  //console.log("In politics");
  //request(politics).pipe(res);
//});


module.exports = router;
