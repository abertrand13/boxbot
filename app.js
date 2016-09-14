var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var request = require('request');
var pg = require('pg');
var extend = require('extend');

app.set('port', (process.env.PORT || 3000));

var botKey = "";

app.get("/", function(req, res) {
	res.send("Hello World!");
});

app.post("/groupme", function(req, res) {
	// res.send("Hello World!");
	
	if(req.body.group_id == "19400360") {
		// Testing grounds
		botKey = process.env.TEST_BOT_KEY;
	} else if(req.body.group_id == "14058998") {
		// production	
		botKey = process.env.PROD_BOT_KEY;
	}
	
	if(botKey && req.body.name != "boxbot") {

		// duck typing.  probably from groupme
		var msg = req.body.text;

		// define a map of filters and functionality
		var functionalityMap = [
			{
				'regex' : /.*testing.*/gi,
				'func' : testing
			},
			{
				'regex' : /.*introduce yourself.*/gi,
				'func' : intro
			},
			{
				'regex' : /.*flip.*coin.*/gi,
				'func' : coinflip
			},
			{
				'regex' : /.*derp(?![+-]).*/gi,
				'func' : derp
			},
			{
				'regex' : /.*brendan(?![+-]).*/gi,
				'func' : brendan
			},
			{
				'regex' : /.*triple(?![+-]).*/gi,
				'func' : triple
			},
			{
				'regex' : /.*brontus(?![+-]).*/gi,
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
				'regex' : /.*dining hall.*/gi,
				'func' : diningHall
			},
			{
				'regex' : /.*odds 1 in (\d+).*/gi,
				'func' : odds
			},
			{
				'regex' : /.*beer.*\?.*/gi,
				'func' : beer
			},
			{
				'regex' : /.*[Oo] ?[rR][lL]+[yY].*/g,
				'func' : orly
			},
			{
				'regex' : /.*[oO] ?[rR][lL]+[mM][eE][nN][tT][eE].*/g,
				'func' : orlmente
			},
			{
				'regex' : /.*[rR][eE][kK][tT].*/g,
				'func' : rekt
			},
			{
				'regex' : /.*moon moon.*/g,
				'func' : moonmoon
			},
			{
				'regex' : /.*[oO]+[hH] [yY]+[eE]+[aA]+[hH]+.*/g,
				'func' : ohyeah
			},
			{
				'regex' : /.*([\S]+)((\+\+)|(--)).*/g,
				'func' : karma
			},
			{
				'regex' : /.*[wW][hH][oO] [iI][sS] [cC][hH][aA][mM][pP]\?*.*/g,
				'func' : champ
			},
			{
				'regex' : /.*[dD][rR][aA][mM][aA].*/g,
				'func' : drama
			},
			{
				'regex' : /.*weather.*/g,
				'func' : weather
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

	res.send("Hello World!");
});

app.listen(app.get('port'), function() {
	console.log("Example app listening on port " + app.get('port') + "!");
});

var headersTemplate = {
	'Content-Type' : 'application/json'	
}

var optionsTemplate = {
	url		: 'https://api.groupme.com/v3/bots/post',
	method	: 'POST',
	headers : headersTemplate,
	form : {}
}

function makeImageBody(text, url) {
	var body = {		
		"bot_id" : botKey,
		"text"	: text,
		"attachments" : [
			{
				"type" : "image",
				"url" : url
			}
		]
	}

	return JSON.stringify(body);
}

function issueRequest(options) {
	request(options, function(error, response, body) {
		if(error) {
			console.log(error);
		}
		if(!error && response.statusCode == 200) {
			console.log(body);
		}
	});
}

var defaultResponse = function(msg) {		
	var options = extend(true, {}, optionsTemplate);
	options.form.bot_id = botKey;
	options.form.text = "Sorry, not quite sure what to make of that...";
	issueRequest(options);	
}

var testing = function(msg) {		
	var options = extend(true, {}, optionsTemplate);
	options.form.bot_id = botKey;
	options.form.text = "Testing complete.  I am operational.";
	issueRequest(options);
}

var intro = function(msg) {
	
	// have to leave this one as it is because of the daisy chaining	
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
	
	var options = extend(true, {}, optionsTemplate);
	options.form.bot_id = botKey;	
	var cointext = "Flipping... it's " + (Math.random() < .5 ? "HEADS!" : "TAILS!");
	options.form.text = cointext;
	issueRequest(options);
}

var derp = function(msg) {

	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("classic.", "https://i.groupme.com/852x1136.jpeg.bbd3d55ff61d41cb95be23b0873599ab.large");
	issueRequest(options);
}

var brendan = function(msg) {	
	
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("classic.", "https://i.groupme.com/720x960.jpeg.e6e2573aafdd4189accd061a54b3f6a4");
	issueRequest(options);	
}

var triple = function(msg) {

	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("classic.", "https://i.groupme.com/356x473.png.97f5d5e48a6048ecaf6270e6aeb9eb2f");
	issueRequest(options);
}

var goteem = function(msg) {	
		
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("classic.", "https://i.groupme.com/918x1224.jpeg.a32a941c2db24292b655a46de6d8345e");
	issueRequest(options);
}


var jordan = function(msg) {	
	
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("classic.", "https://i.groupme.com/1095x1230.jpeg.0e8ba712118a461da077f7d74612e216");
	issueRequest(options);	
}


var jenny = function(msg) {	
	
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("classic.", "https://i.groupme.com/720x960.jpeg.78e1eb1cccc94fa1879f5d29d7a6961e");
	issueRequest(options);	
}

var diningHall = function(msg) {	
	
	var diningHalls = [
		"Ricker",
		"Stern",
		"Wilbur",
		"Arrillaga",
		"Lag",
		"Manz",
		"FloMo"
	];
	var rand = Math.floor(Math.random() * 7);

	var date = new Date();
	var day = date.getDay();
	var choice;
	if(day == 0) { // Sunday
		choice = "Ricker, ya dumbass.";
	} else {
		var choice = diningHalls[rand];
	}

	var options = extend(true, {}, optionsTemplate);
	options.form.bot_id = botKey;
	options.form.text = choice;
	issueRequest(options);
}

var odds = function(msg) {
	var regex = /.*odds 1 in (\d+).*/g
	var result = regex.exec(msg);
	var bound = parseInt(result[1]);
	var num = Math.floor(Math.random() * bound) + 1;
	
	var options = extend(true, {}, optionsTemplate);
	options.form.bot_id = botKey;
	options.form.text = num;
	issueRequest(options);
}

var beer = function(msg) {	

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

	var options = extend(true, {}, optionsTemplate);
	options.form.bot_id = botKey;
	options.form.text = choice;
	issueRequest(options);
}

var orly = function(msg) {
		
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("", "https://i.groupme.com/480x360.jpeg.028247499b06466893165608fa56363f");
	issueRequest(options);
}


var orlmente = function(msg) {
		
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("", "https://i.groupme.com/470x470.jpeg.7eff61d68dd4462283005d37ad6c4c92");
	issueRequest(options);
}

var rekt = function(msg) {
	
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("", "https://i.groupme.com/400x225.gif.2581b2961bd24924acf371fb32d297e7");
	issueRequest(options);
}

var moonmoon = function(msg) {

	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("", "https://i.groupme.com/460x345.jpeg.bdcb09f23d5b404499acabc24d8db1b7");
	issueRequest(options);
}

var ohyeah = function(msg) {
		
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("OH YEAH!!", "https://i.groupme.com/335x230.gif.bc96351b0f474869b785795a3b54ce16");
	issueRequest(options);
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
			
		var options = extend(true, {}, optionsTemplate);
		options.form.bot_id = botKey;
		var finalText = obj + "'s karma has " + (inc > 0 ? "increased" : "decreased") + " to " + finalVal.toString();
		options.form.text = finalText;
		issueRequest(options);
	}
}

var champ = function(msg) {
			
	var options = extend(true, {}, optionsTemplate);
	options.form.bot_id = botKey;
	options.form.text = "THAT QUESTION WILL BE ANSWERED THIS SUNDAY NIGHT...";
	issueRequest(options);
}

var drama = function(msg) {
	
	var options = extend(true, {}, optionsTemplate);
	delete options.form;
	options.body = makeImageBody("", "https://i.groupme.com/300x200.gif.66b5a6cbe2d44194858cf88cf6471963");
	issueRequest(options);	
}

var weather = function(msg) {
	var key = process.env.WUNDERGROUND_KEY;

	request('http://api.wunderground.com/api/' + key + '/conditions/q/94305.json', function(err, res, body) {
		
		// TO HELL WITH ERROR CHECKING!

		// console.log(JSON.stringify(JSON.parse(body)));
		var data = JSON.parse(body);
		var weather = data.current_observation.weather;
		var temp = data.current_observation.temp_f;
		var feel = data.current_observation.feelslike_f;

		var finalText = "It's " + temp.toString() + " degrees and " + weather + ". It feels like " + feel.toString() + ".  Also, I'm contractually obligated to tell you that this weather data comes from Weather Underground."
		
		var options = extend(true, {}, optionsTemplate);
		options.form.bot_id = botKey;
		options.form.text = finalText;
		issueRequest(options);
	});
}
