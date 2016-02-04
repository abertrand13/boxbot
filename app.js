var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var request = require('request');
var pg = require('pg');

app.set('port', (process.env.PORT || 3000));

var botKey = "";

app.get("/", function(req, res) {
	res.send("Hello World!");
});

app.post("/groupme", function(req, res) {
	// res.send("Hello World!");
	
	if(req.body.group_id == "19400360") {
		// Testing grounds
		botKey = "4b1e5390aee0326d4190116e44";
	} else if(req.body.group_id == "14058998") {
		// production	
		botKey = "5865d42826ed1b4518bc6393d6";
	}
	
	if(botKey && req.body.name != "boxbot") {

		// duck typing.  probably from groupme
		// check that boxbot was mentioned
		var msg = req.body.text;
		var re = /.*@boxbot.*/g;

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
					'regex' : /.*derp(?![+-]).*/g,
					'func' : derp
				},
				{
					'regex' : /.*brendan(?![+-]).*/g,
					'func' : brendan
				},
				{
					'regex' : /.*[bB][rR][oO][nN][tT][uU][sS](?![+-]).*/g,
					'func' : goteem
				},
				{
					'regex' : /.*[gG]+[oO]+[tT]+ [hH]*[eE]+[mM]+(?![+-]).*/g,
					'func' : goteem
				},
				{
					'regex' : /.*([jJ]+[oO]+[rR]+[dD]+[aA]+[nN]+)|([nN]+[eE]+[rR]+[dD]+)(?![+-]).*/g,
					'func' : jordan
				},
				{
					'regex' : /.*[jJ][eE][nN]+[aA]?[yY]+(?![+-]).*/g,
					'func' : jenny
				},
				{
					'regex' : /.*dining hall.*/g,
					'func' : diningHall
				},
				{
					'regex' : /.*odds 1 in (\d+).*/g,
					'func' : odds
				},
				{
					'regex' : /.*beer.*\?.*/g,
					'func' : beer
				},
				{
					'regex' : /.*[Oo] ?[rR][lL]+[yY].*/g,
					'func' : orly
				},
				{
					'regex' : /([\S]+)((\+\+)|(--))/g,
					'func' : karma
				}
			];

			var exec = false;

			for(var i = 0; i < functionalityMap.length; i++) {
				var entry = functionalityMap[i];
				if(entry.regex.test(msg)) {
					exec = true;	
					entry.func(msg);
				}
			}

			if(!exec) {
				defaultResponse(msg);
			}
		}
	}

	res.send("Hello World!");
});

app.listen(app.get('port'), function() {
	console.log("Example app listening on port " + app.get('port') + "!");
});

var defaultResponse = function(msg) {
		
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form: {
			bot_id	: botKey,
			text	: 'Sorry, not quite sure what to make of that...'
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

var testing = function(msg) {
	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form: {
			bot_id	: botKey,
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

var intro = function(msg) {
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form : {
			bot_id	: botKey,
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

var coinflip = function(msg) {	
	var headers = {
		'Content-Type': 'application/json'
	};

	var cointext = "Flipping... it's " + (Math.random() < .5 ? "HEADS!" : "TAILS!");

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form: {
			bot_id	: botKey,
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

var derp = function(msg) {	
	var headers = {
		'Content-Type': 'application/json'
	};

	// why do I have to do this json stringify shit?  unclear.  But whatever.  It works!!	
	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		body : JSON.stringify({
			"bot_id" : botKey,
			"text"	: "classic.",
			"attachments" : [
				{
					"type" : "image",
					"url" : "https://i.groupme.com/852x1136.jpeg.bbd3d55ff61d41cb95be23b0873599ab.large"
				}
			]
		})
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

var brendan = function(msg) {
	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		body : JSON.stringify({
			"bot_id" : botKey,
			"text"	: "classic.",
			"attachments" : [
				{
					"type" : "image",
					"url" : "https://i.groupme.com/720x960.jpeg.e6e2573aafdd4189accd061a54b3f6a4" 
				}
			]
		})
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

var goteem = function(msg) {	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		body : JSON.stringify({
			"bot_id" : botKey,
			"text"	: "classic.",
			"attachments" : [
				{
					"type" : "image",
					"url" : "https://i.groupme.com/918x1224.jpeg.a32a941c2db24292b655a46de6d8345e"
				}
			]
		})
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


var jordan = function(msg) {	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		body : JSON.stringify({
			"bot_id" : botKey,
			"text"	: "classic.",
			"attachments" : [
				{
					"type" : "image",
					"url" : "https://i.groupme.com/1095x1230.jpeg.0e8ba712118a461da077f7d74612e216"
				}
			]
		})
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


var jenny = function(msg) {	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		body : JSON.stringify({
			"bot_id" : botKey,
			"text"	: "classic.",
			"attachments" : [
				{
					"type" : "image",
					"url" : "https://i.groupme.com/720x960.jpeg.78e1eb1cccc94fa1879f5d29d7a6961e"
				}
			]
		})
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

var diningHall = function(msg) {	
	var headers = {
		'Content-Type': 'application/json'
	};

	var rand = Math.floor(Math.random() * 7);

	var choice;
	switch(rand) {
		case 0:
			choice = "Ricker";
			break;

		case 1:
			choice = "Stern";
			break;

		case 2:
			choice = "Wilbur";
			break;

		case 3:
			choice = "Arrillaga";
			break;

		case 4:
			choice = "Lag";
			break;

		case 5:
			choice = "Manz";
			break;

		case 6:
			choice = "FloMo";
			break;
	}

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form : {
			"bot_id" : botKey,
			"text"	: choice,	
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

var odds = function(msg) {
	var regex = /.*odds 1 in (\d+).*/g
	var result = regex.exec(msg);
	var bound = parseInt(result[1]);
	var num = Math.floor(Math.random() * bound) + 1;
	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form: {
			bot_id	: botKey,
			text	: num
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

var beer = function(msg) {	
	var headers = {
		'Content-Type': 'application/json'
	};

	var beers = [
		"Corona",
		"Blue Moon",
		"Sculpin",
		"Natty Light",
		"Sierra",
		"Pacifico",
		"Modelo",
		"Fat Tire",
		"Lagunitas",
		"The nearest IPA to your face.",
		"Heineken",
		"Shock Top"
	]
	var rand = Math.floor(Math.random() * beers.length);

	var choice = beers[rand];	

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		form : {
			"bot_id" : botKey,
			"text"	: choice,	
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

var orly = function(msg) {
	
	var headers = {
		'Content-Type': 'application/json'
	};

	var options = {
		url		: 'https://api.groupme.com/v3/bots/post',
		method	: 'POST',
		headers	: headers,
		body : JSON.stringify({
			"bot_id" : botKey,
			"attachments" : [
				{
					"type" : "image",
					"url" : "https://i.groupme.com/480x360.jpeg.028247499b06466893165608fa56363f"
				}
			]
		})
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

var karma = function(msg) {

	var plus = /([\S]+)\+\+/g;
	var minus = /([\S]+)--/g;

	var obj, inc;

	if(result = plus.exec(msg)) {
		inc = 1;
		obj = result[1];

	} else if(result = minus.exec(msg)) {
		obj = result[1];
		inc = -1;
	}

	var finalVal = inc; // assuming that we're going to have to create the row

	// Connect to database
	pg.connect(process.env.DATABASE_URL + "?ssl=true", function(err, client) {
		if (err) {
			throw err;
		}
		
		var createRow = false;

		client.query("UPDATE karma SET karma=karma+" + inc + " WHERE name='" + obj + "' RETURNING name, karma", function(err, res) {
			
			if(err || res.rowCount == 0) { // truthiness
				// we need to create the entry
				client.query("INSERT INTO karma (name, karma) VALUES ('" + obj + "'," + inc + ")", function(err, res) {
					if(err) throw err;
					sendMsg();
				});
			} else {
				// entry has been updated
				finalVal = res.rows[0].karma;
				sendMsg();
			}
		});	
	});

	// now send the proper message
	// this hack right here is THE WORST.
	// but javascript lets me do it, so...
	// ^ lol worst reasoning EVAR.
	var sendMsg = function() {
		var headers = {
			'Content-Type': 'application/json'
		};

		var options = {
			url		: 'https://api.groupme.com/v3/bots/post',
			method	: 'POST',
			headers	: headers,
			body : JSON.stringify({
				"bot_id" : botKey,
				"text"	: obj + "'s karma has " + (inc > 0 ? "increased" : "decreased") + " to " + finalVal.toString(),
			})
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
