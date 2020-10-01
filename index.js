var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;

app.get('/',function (req,res) {

    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){

    socket.on('message', function(data){
        io.emit('message',data);
    });

    socket.on('typing',function (data) {
        socket.broadcast.emit('typing',data)
    })
});
http.listen(PORT,function(){
    console.log('el servidor esta escuchando el puerto %s',PORT);
});