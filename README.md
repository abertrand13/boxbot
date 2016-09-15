# BOXBOT

## TESTING
```
$ git clone
  npm install
  heroku local
```

Direct test requests to localhost:5000/groupme

## GLOSSARY

What follows are some example messages that will trigger an action by boxbot.  Not including the actual parsing here, just a few samples.

`testing boxbot`: Will trigger a short message from boxbot informing us that he's operational.

`boxbot, introduce yourself`: Will make boxbot introduce himself.

`Flip a coin`: Will ask boxbot to flip a coin and give you the result.

`derp`: Picture of derp.

`brendan`: Picture of brendan.

`triple`: Picture of triple.

`brontus`: Picture of BRONTUS.

`GOT HEEM`: Also a picture of Brontus.

`jordnerd`: Picture of Jordan.

`JENNAY`: Picture of Jenny.

`Which dining hall should I go to?`: Will ask boxbot to choose a random dining hall to eat at.  Rumor has it this will always be Ricker on Sundays.

`Odds 1 in 10`: Will ask boxbot for an odds.

`Which beer should I drink?`: Will ask boxbot for a beer suggestion.

`O rly?`: The o rly owl.

`O rlmente?`: The o rly owl with a sombrero.

`rekt`: Rekt.

`moon moon`: A picture of moon moon, bless his dumb husky heart.

`OH YEAH`: A gif of the (not so) Kool-Aid man.

`boxbot++`: Will give 1 karma to boxbot.  Boxbot keeps track of all the accumulated karmas.

`Who has the best karma?`: Will ask boxbot for a list of the top ten karma scores.

`Who has the worst karma?`: Will ask boxbot for a list of the worst ten karma scores.

`Who is champ?`: Will ask boxbot who the champ is.

`drama`: Sends a gif of the dramatic chipmunk.  <3.

`What's the weather?`: Asks boxbot for the weather - conditions, current temp, and what it feels like.


## FEATURE TODO
	- Useless (Drake and Josh gif)
	- Nerd alert?
	- Where is Triple
	- Hangover (?)
	- DEFCON RED
	- Order a pizza
	- Go to sleep
	- Thinks he's tough
	- Gainz
	- Weather high/low
	- Scheduler on my end
	- Karma top list
	- boxcash
	- take a lap
	- NOOOO (Darth Vader)
	- Douchebag Jar (AI)
	- Multiple regexes for same func

## INFRASTRUCTURE TODO
	- Set up local database for testing
	- Fix server-breaking error throws (see karma routines)
	- Write regression tests?
	- make it so you can work offline
	- Refactor - do I really need the extend(true, {}...) for example?
