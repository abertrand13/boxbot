var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var request = require('request');

app.set('port', (process.env.PORT || 3000));

app.get("/", function(req, res) {
	res.send("Hello World!");
});
 
app.post("/groupme", function(req, res) {
	// res.send("Hello World!");
	
	if(req.body.group_id) {

		// duck typing.  probably from groupme
		// check that boxbot was mentioned
		var msg = req.body.text;
		var re = /.*@boxbot-test.*/g;

		if(re.test(msg)) {
			
			// define a map of filters and functionality
			var functionalityMap = [
				{
					'regex' : /.*testing.*/g,
					'func' : testing
				},
				{
					'regex' : /.*introduce yourself.*/g,
					'func' : intro
				},
				{
					'regex' : /.*flip.*coin.*/g,
					'func' : coinflip
				},
				{
					'regex' : /.*classic derp.*/g,
					'func' : derp
				}
			];

			for(var i = 0; i < functionalityMap.length; i++) {
				var entry = functionalityMap[i];
				if(entry.regex.test(msg)) {
					entry.func();
				}
			}			
		}
	}

	res.send("Hello World!");
});

app.listen(app.get('port'), function() {
	console.log("Example app listening on port " + app.get('port') + "!");
});

var testing = function() {
	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form: {
			bot_id	: '4b1e5390aee0326d4190116e44',
			text	: 'Testing complete.  I am operational.'
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

var intro = function() {
	var headers = {
		'Content-Type': 'applications/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form: {
			bot_id	: '4b1e5390aee0326d4190116e44',
			text	: 'introducing...'
		}
	};

	options.form.text = "Hello everyone, I am Cardboard Box Bot!  You can call me boxbot for short.";

	// TAB CREEP LETS GOOOOOO	
	request(options, function(error, response, body) {
		if(!error) {
			options.form.text = "I have been engineered for both utility and sass.  But mostly sass.  GO SASS!"
			request(options, function(error, response, body) {
				if(!error) {
					options.form.text = "*ahem*.  Just mention me with '@boxbot', and I'll do my best to parse your confusing human vernacular and wreak as much havoc as possible!  And by wreak havoc I mean help you.";
					request(options, function(error, response, body) {
						// we did it!
					});
				}
			});
		}
	});
		
}

var coinflip = function() {	
	var headers = {
		'Content-Type': 'application/json'
	};

	var cointext = "Flipping... it's " + (Math.random() < .5 ? "HEADS!" : "TAILS!");

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form: {
			bot_id	: '4b1e5390aee0326d4190116e44',
			text	: cointext
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

var derp = function() {	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form: {
			bot_id	: '4b1e5390aee0326d4190116e44',
			text	: 'classic.',
			attachments : [
				{
					type : "image",
					url : "https://i.groupme.com/852x1136.jpeg.bbd3d55ff61d41cb95be23b0873599ab"
				}
			]
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
