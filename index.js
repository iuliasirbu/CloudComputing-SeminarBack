const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const messagesRouter = require('./router/messagesRouter');

const app = express();
app.use(cors());

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/json
app.use(bodyParser.urlencoded({extended : true}));

app.use("/messages", messagesRouter);

const port = process.env.PORT || 8080;

// app.get('/', (req, res) => {
//     res.send('Hello World again!')
// });

app.listen(port, () => {
    console.log(`Cloud computing app listening on port ${port}!`)
});