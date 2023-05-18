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
let temp = 0;
parser.on('open', function () {
    console.log('connection is open');
});

parser.on('data', function (data) {
    temp = (parseInt(data, 10) + "ºC");
    console.log(temp);
    enviar_datos(data);
    io.emit('temp', data);
});

port.on('error', function () {
    console.log(err);
});

function enviar_datos(medicion) {
    fetch('http://192.168.1.13:8000/app/em/envio-lecturas', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "medicion": medicion, "sensor_id": 1, "estacion_id": 1 })
})
   .then(response => response.json())
   .then(response => console.log(JSON.stringify(response)))}