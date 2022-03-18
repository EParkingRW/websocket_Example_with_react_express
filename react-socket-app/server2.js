ar express = require ('express');
const fetch = require('node-fetch');
const socketIo = require('socket.io');
var app = express();
var port = 9000;

// CONNECT TO SOCKET IO
const server = app.listen(port);
const io = require('socket.io')(server);

io.on('connection', (socket) =>{		
   // GET ALL EARTHQUAKES
   fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')

   .then(resp => resp.json())

   .then((json) => {
      socket.emit('latest_quakes', json);
   })
}); // END SOCKET IO FUNCTION

// LISTENING ON PORT...
console.log(`Server listening in on port ${port}`);