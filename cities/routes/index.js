var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
 res.sendFile('next.html', { root:  'public' });
});

router.get('/getcity',function(req,res,next) {
	  console.log(req.query);
	  var myRe = new RegExp("^" + req.query.q);
          console.log(myRe);	
           fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
            	if(err) throw err;
            	var cities = data.toString().split("\n");
            	var jsonresult = [];
        	for(var i = 0; i < cities.length; i++) {
         	 	var result = cities[i].search(myRe); 
          		if(result != -1) {
           		console.log(cities[i]);
           		jsonresult.push({city:cities[i]});
          		} 
        	}   
        console.log(jsonresult);
	res.status(200).json(jsonresult);
          });
});

module.exports = router;
