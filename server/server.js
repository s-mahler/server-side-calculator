const express = require('express');
const bodyParser = require('body-parser');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

let calculationsArray = [];

app.get('/calculations', (req, res) => {
    res.send(calculationsArray);
})


app.post('/calculations', (req, res) => {
    calculationsArray.push(req.body);
    res.sendStatus(200);
})



app.listen(PORT, () => {
    console.log('listening on port', PORT);
});