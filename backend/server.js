const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server running on port ${PORT}');
});