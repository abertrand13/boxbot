var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var request = require('request');


app.get("/", function(req, res) {
	res.send("Hello World!");
});
 
app.post("/groupme", function(req, res) {
	// res.send("Hello World!");
	
	if(req.body.group_id) {

		console.log("group stage passed");
		// duck typing.  probably from groupme
		// check that boxbot was mentioned
		var msg = req.body.text;
		var re = /.*@boxbot-test.*/g;

		if(re.test(msg)) {
			console.log("regex passed");	
			var headers = {
				'Content-Type': 'application/json'
			};

			var options = {
				url		: 'https://api.groupme.com/v3/bots/post',
				method	: 'POST',
				headers	: headers,
				form: {
					bot_id	: '4b1e5390aee0326d4190116e44',
					text	: 'Hello Brendan!'
				}
			}

			request(options, function(error, response, body) {
				if(error) {
					console.log(error);
				}
				if(!error && response.statusCode == 200) {
					console.log(body);
				}
			});
		}
	}

	res.send("Hello World!");
});

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
