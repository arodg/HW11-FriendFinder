
var friendsArray = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

  app.post("/api/friends", function(req, res) {
  	
    var bestMatch = {
      name: "",
      photo: "",
      compatIndex: 50 //Set initial compatibility difference index to max for comparison
    }

    bestieMatch();
    friendsArray.push(req.body);
    res.json(bestMatch);
  
    
    
  function bestieMatch() {
    var currentUser = req.body;
    var userScores = currentUser.scores;

  	

    

  	for (var i = 0; i < friendsArray.length; i++) {
  		var totalDiff = 0; //set totalDiff to 0 for each friend, perform compatibility calculation below
  		
      for (var j = 0; j < 10; j++) {
  			totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friendsArray[i].scores[j]));
      }
        
      if (totalDiff <= bestMatch.compatIndex) {
  			bestMatch.name = friendsArray[i].name;
  			bestMatch.photo = friendsArray[i].photo;
  			bestMatch.compatIndex = totalDiff;
      }
  	}
  }
  	
  });
};

