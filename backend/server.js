const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const http = require('http').Server(app);

//handle cross origin requests
app.use(cors());

app.use(bodyParser.json());

//serve static content from angular build dir
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend/browser')));

//redirect catch all to angular entry point
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/browser.index.html'))
});

const PORT = process.env.PORT || 3000;
let server = http.listen(PORT, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Server listening on: "+ host +" port: " + port);
});