const exp = require('constants');
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(__dirname + '/public'));
server.listen(3000, function () {
    console.log('server listening on 3000');
});

//SERIAL
var SerialPort = require('serialport').SerialPort;
var ReadlineParser = require('@serialport/parser-readline').ReadlineParser;
var port = new SerialPort({ path: 'COM5', baudRate: 9600 });
var parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('open', function () {
    console.log('connection is open');
});

parser.on('data', function (data) {
    let temp = (parseInt(data, 10) + "ºC");
    console.log(temp);
    io.emit('temp', data);
});

port.on('error', function () {
    console.log(err);
});