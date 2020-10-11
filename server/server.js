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
    if (req.body.operator == '+') {
        req.body.answer = Number(req.body.firstNum) + Number(req.body.secondNum);
    } else if (req.body.operator == '-') {
        req.body.answer = req.body.firstNum - req.body.secondNum;
    } else if (req.body.operator == '*') {
        req.body.answer = req.body.firstNum * req.body.secondNum;
    } else if (req.body.operator == '/') {
        req.body.answer = req.body.firstNum / req.body.secondNum;
    } else if (req.body.operator == undefined) {
        // want to add catches if the user doesnt complete all fields
        console.log('needs operator');
    }
    calculationsArray.push(req.body);
    res.sendStatus(200);
})



app.listen(PORT, () => {
    console.log('listening on port', PORT);
});