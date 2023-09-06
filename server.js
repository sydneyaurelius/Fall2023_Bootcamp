var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if(url.parse(request.url).pathname == '/listings'){
    // send the data in the listingData variable as a response
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(listingData));
  }
  else{
    response.writeHead(404);
    response.write('404 Not Found');
  }

  response.end();
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
   */

    //Check for errors
    if (err) throw err;
    //console.log(data);

   //Save the state in the listingData variable already defined
   listingData = JSON.parse(data);

  //Creates the server
  var server = http.createServer(requestHandler);

  //Start the server
  server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://127.0.0.1:' + port);
  });

});
