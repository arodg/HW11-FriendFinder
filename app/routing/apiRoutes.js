
var friendsArray = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

  app.post("/api/friends", function(req, res) {
  	var closestMatch = {
  		name: "",
  		photo: "",
  		userDiff: 50 //Set initial userDiff for comparison 
  	};

  	var currentUser = req.body;
  	var userScores = currentUser.scores;

  	var totalDiff;

  	for (var i = 0; i < friendsArray.length; i++) {
  		totalDiff = 0; //set totalDiff to 0 for each friend, perform compatibility calculation below

  		for (var j = 0; j < 10; j++) {
  			totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friendsArray[i].scores[j]));
        
  			if (totalDiff <= closestMatch.userDiff) {
  				closestMatch.name = friendsArray[i].name;
  				closestMatch.photo = friendsArray[i].photo;
  				closestMatch.userDiff = totalDiff;
  			}
  		}
  	}


  	friendsArray.push(req.body);
  	res.json(closestMatch);
   });
}
