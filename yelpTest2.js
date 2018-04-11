var https = require('https');





  _term = process.argv[2];

  function doSearch(term, success){

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
  	if(res.statusCode == 429){
  		success['value'] = false;
  	}
  	else{
    try{
      parsedData = JSON.parse(rawData);
      console.log('STATUS: ' + res.statusCode);
      console.log('Found '+parsedData['total']+ ' results');
      for(var i=0; i<parsedData['total']; i++){
        
        console.log(parsedData['businesses'][i]['name']);
        var b = parsedData['businesses'][i];
        var type = 'activity';
        var name = b['name'];
        var image_link = b['image_url'];
        var tags = b['categories'];
        var address = b['location'];
        var yelp_link = b['url'];
        var result = {'name': name, 'image': image_link, 'tags': tags, 'address': address, 'yelp': yelp_link}
        results.push(result);
        success['value'] = true;
      }

      


      // console.log(parsedData['businesses'][10]['alias'])
      // console.log(parsedData['businesses'][10]['categories']);
      


    }
    catch(e){
      console.error(e.message);
    }
}
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.end();
}

var success = {'value': false};
while(!success['value']){
	var ret = doSearch(_term, success);
	if(!success['value']){
		sleep(3000);
	}
}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

