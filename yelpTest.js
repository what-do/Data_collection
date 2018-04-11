var https = require('https');

var gate = true;

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
  sleep(1000);
  term = searchTerms[i];




  const options = {
    hostname: 'api.yelp.com',
    port: 443,
  //path: '/v3/businesses/search?latitude=30.2669444&longitude=-97.7427778&radius=40000&categories=bowling&limit=50',
  path: '/v3/businesses/search?location=Austin,78704&radius=40000&categories=' + term + '&limit=50',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer A2czL4xmBFkpfeyPZnF3k8VYFOZYsWSiyYMY1rhLQZ5EpPpYTu7uIX6qH1xUj8dwm9quS_geNbU22165jI_Ub3Yj21rPs2JwAooLQtl62NZLLx3PMPk9S5PD1muxWnYx'
  }
};


var results = [];


console.log('---------------------------------------------------------------------');
console.log('Conducting Yelp search for term :"'+ term + '"');
console.log('---------------------------------------------------------------------');

const req = https.request(options, (res) => {

  
  
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData+= chunk;
  });
  res.on('end', () => {

    try{
      parsedData = JSON.parse(rawData);
      console.log('');
      console.log('');
      console.log('Found '+parsedData['total']+ ' results');
      for(var i=0; i<parsedData['total']; i++){
        
        console.log(parsedData['businesses'][i]['alias']);
        var b = parsedData['businesses'][i];
        var bname = b['alias'];
        var bimage = b['image_url'];
        var btags = b['categories'];
        var baddress = b['location'];
        var byelplink = b['url'];
        var result = {'name': bname, 'image': bimage, 'tags': btags, 'address': baddress, 'yelp': byelplink}
        results.push(result);
      }
      
      


      // console.log(parsedData['businesses'][10]['alias'])
      // console.log(parsedData['businesses'][10]['categories']);
      


    }
    catch(e){
      console.error(e.message);
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.end();
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}