const {spawn} = require('child_process');

var searchTerms = [
  'airsoft',
  'amusementparks',
  'aquariums',
  'archery',
  'axethrowing',
  'bathing_area',
  'beachvolleyball',
  'beaches',
  'bicyclepaths',
  'boating',
  'bocceball',
  'bowling',
  'bubblesoccer',
  'bungeejumping',
  'carousels',
  'challengecourses',
  'climbing',
  'discgolf',
  'diving',
  'escapegames',
  'experiences',
  'fencing',
  'fishing',
  'golf',
  'hiking',
  'lasertag'
]





for(var i in searchTerms){
	//sleep(1000);
	var term = searchTerms[i];
	ls = spawn('node', ['yelpTest2.js', term]);
	ls.stdout.on('data', (data) => {
  console.log(""+data);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});


}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
