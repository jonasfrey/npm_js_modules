const express = require('express');
const app = express()
const path = require('path')
const http = require('http');
// const https = require('https');

const fs = require('fs')

app.use(express.static(__dirname + '/'))

// var key = fs.readFileSync(__dirname + '/selfsigned_certificates/selfsigned.key');
// var cert = fs.readFileSync(__dirname + '/selfsigned_certificates/selfsigned.crt');
// var options = {
//   key: key,
//   cert: cert
// };
// var server = https.createServer(options, app);
var server = http.createServer({}, app);

server.listen(3000, () => console.log('Visit http://127.0.0.1:3000/demo.html'))
