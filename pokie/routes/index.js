var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/highScores'); //Connects to a mongo database called "commentDB"

var scoreSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
  Score: Number
});

var Score = mongoose.model('Score', scoreSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

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
});


router.post('/scores', function(req, res, next) {
	console.log("POST scores route");
	console.log(req.body); //[2]

	 var newscore = new Score(req.body); //[3]
  	console.log(newscore); //[3]
 	 newscore.save(function(err, post) { //[4]
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});


/* GET scores from database */
router.get('/scores', function(req, res, next) {
  console.log("In the GET route");
  Score.find(function(err,scoreList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      console.log(scoreList); //Otherwise console log the comments you found
      scoreList =scoreList.sort({Score:-1});
      console.log("ScoreList" + scoreList)
      res.json(scoreList); //Then send them

      
    }
  })
});

module.exports = router;
