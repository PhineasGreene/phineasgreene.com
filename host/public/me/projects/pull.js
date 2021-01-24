const fetch = require('node-fetch');
const fs = require('fs');
const pulled = require('./pulled.json');

var matchesPulled = 0;

function getNewMatches(page){
	var ids = [];

	fetch(`https://backgammongalaxy.com/api/current_user/finished_matches?page=${page}`, {
	  "headers": {
	    "accept": "application/json",
	    "accept-language": "en-US,en;q=0.9",
	    "authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjU5NzM5IiwiZXhwIjoxNjEzNDkxMzYyLCJpYXQiOjE2MTA4OTkzNjIsImlzcyI6IkJhY2tnYW1tb25CYWNrZW5kIiwianRpIjoiZWQwN2MzODUtY2Y2My00MzlmLTllMTgtYzU0ODc4ZDhmNjkyIiwicGVtIjp7fSwic3ViIjoiVXNlcjo1OTczOSIsInR5cCI6InRva2VuIn0.tOmwkxkGm9M8Yl5VO5hlnOXK0uLQouQJpIP8rtXFYNBP2m9Tb46_jgaLe_BEOPS93qUNLh0GKLfwQ6Mf0h02cQ",
	    "content-type": "application/json",
	    "sec-fetch-dest": "empty",
	    "sec-fetch-mode": "cors",
	    "sec-fetch-site": "same-origin",
	    "sec-gpc": "1",
	    "cookie": "_fbp=fb.1.1610899322405.807872884; state={%22token%22:%22eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjU5NzM5IiwiZXhwIjoxNjEzNDkxMzYyLCJpYXQiOjE2MTA4OTkzNjIsImlzcyI6IkJhY2tnYW1tb25CYWNrZW5kIiwianRpIjoiZWQwN2MzODUtY2Y2My00MzlmLTllMTgtYzU0ODc4ZDhmNjkyIiwicGVtIjp7fSwic3ViIjoiVXNlcjo1OTczOSIsInR5cCI6InRva2VuIn0.tOmwkxkGm9M8Yl5VO5hlnOXK0uLQouQJpIP8rtXFYNBP2m9Tb46_jgaLe_BEOPS93qUNLh0GKLfwQ6Mf0h02cQ%22}; cookies_policy=true"
	  },
	  "referrer": "https://backgammongalaxy.com/analysis",
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": null,
	  "method": "GET",
	  "mode": "cors"
	}).then(res => res.text())
	.then(text => {
		let d = JSON.parse(text);
		if(d.data.length > 0){
			for(let i = 0; i < d.data.length; i++){
				let id = d.data[i].id;

				if(pulled.indexOf(id) == -1){
					console.log(`Fetching match ${id}.`);
					getMatch(id);
					pulled.push(id);
					matchesPulled++;
				}
			}
			// recurse to check the next page
			getNewMatches(page + 1);
		}else{
			fs.writeFile('/home/notroot/.gnubg/matches/pulled.json', JSON.stringify(pulled), (err) => {
			    if (err) {
				throw err;
			    }
			    console.log(`${matchesPulled} new matches saved.`);
			});
		}
	});
};

function getMatch(id){
	fetch(`https://backgammongalaxy.com/api/matches/${id}`, {
	  "headers": {
	    "accept": "application/vnd.galaxy+mat",
	    "accept-language": "en-US,en;q=0.9",
	    "authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjU5NzM5IiwiZXhwIjoxNjEzNDkxMzYyLCJpYXQiOjE2MTA4OTkzNjIsImlzcyI6IkJhY2tnYW1tb25CYWNrZW5kIiwianRpIjoiZWQwN2MzODUtY2Y2My00MzlmLTllMTgtYzU0ODc4ZDhmNjkyIiwicGVtIjp7fSwic3ViIjoiVXNlcjo1OTczOSIsInR5cCI6InRva2VuIn0.tOmwkxkGm9M8Yl5VO5hlnOXK0uLQouQJpIP8rtXFYNBP2m9Tb46_jgaLe_BEOPS93qUNLh0GKLfwQ6Mf0h02cQ",
	    "content-type": "application/json",
	    "sec-fetch-dest": "empty",
	    "sec-fetch-mode": "cors",
	    "sec-fetch-site": "same-origin",
	    "sec-gpc": "1",
	    "cookie": "_fbp=fb.1.1610899322405.807872884; state={%22token%22:%22eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjU5NzM5IiwiZXhwIjoxNjEzNDkxMzYyLCJpYXQiOjE2MTA4OTkzNjIsImlzcyI6IkJhY2tnYW1tb25CYWNrZW5kIiwianRpIjoiZWQwN2MzODUtY2Y2My00MzlmLTllMTgtYzU0ODc4ZDhmNjkyIiwicGVtIjp7fSwic3ViIjoiVXNlcjo1OTczOSIsInR5cCI6InRva2VuIn0.tOmwkxkGm9M8Yl5VO5hlnOXK0uLQouQJpIP8rtXFYNBP2m9Tb46_jgaLe_BEOPS93qUNLh0GKLfwQ6Mf0h02cQ%22}; cookies_policy=true"
	  },
	  "referrer": "https://backgammongalaxy.com/analysis",
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": null,
	  "method": "GET",
	  "mode": "cors"
	})	.then(res => res.text())
		.then(text => {
			fs.writeFile(`/home/notroot/.gnubg/matches/${id}.match`, text, (err) => {
			    if (err) {
				throw err;
			    }
			    console.log(`Match ${id} saved.`);
			});
		});
};

console.log("Looking for new matches.");
getNewMatches(1);
