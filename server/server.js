const express = require('express');
const bodyParser = require('body-parser');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

let calculationsArray = [];

app.get('/calculations', (req, res) => {
    res.send(calculationsArray);
})


app.post('/calculations', (req, res) => {
    if (req.body.operator == '+') {
        req.body.answer = Number(req.body.firstNum) + Number(req.body.secondNum);
        calculationsArray.push(req.body);
    } else if (req.body.operator == '-') {
        req.body.answer = req.body.firstNum - req.body.secondNum;
        calculationsArray.push(req.body);
    } else if (req.body.operator == '*') {
        req.body.answer = req.body.firstNum * req.body.secondNum;
        calculationsArray.push(req.body);
    } else if (req.body.operator == '/') {
        req.body.answer = req.body.firstNum / req.body.secondNum;
        calculationsArray.push(req.body);
    } else if (req.body.operator == undefined || req.body.firstNum == '' || req.body.secondNum == '') {
        res.sendStatus(400);
        // want to add catches if the user doesnt complete all fields
        // catches with a 400 error, but returns errors in the terminal 
        // isnt catching blank input for numbers
    }
    res.sendStatus(200);
})



app.listen(PORT, () => {
    console.log('listening on port', PORT);
});