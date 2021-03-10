var express = require('express');
var path = require('path');
var port = process.env.PORT || 8080;
var app = express();

app.use(express.static(path.join(__dirname,'/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('index.html'))
});

app.listen(port);

console.log('Server started.');


/*
const DIST_DIR = path.join(__dirname, '/dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};


app.use(express.static(DIST_DIR)); // NEW


app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/', (req, res) => {
 res.sendFile(HTML_FILE); // EDIT
});
app.listen(port, function () {
 console.log('App listening on port: ' + port);
});
*/