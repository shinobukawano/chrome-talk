var port = 3000;
// var port = process.env.PORT || 5000
var io = require('socket.io').listen(port);
console.log((new Date()) + " Server is listening on port " + port);

io.sockets.on('connection', function(socket) {
    socket.on('message', function(message) {
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', function() {
        socket.broadcast.emit('user disconnected');
    });
});
