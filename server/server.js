// requiring express and body parser
const express = require('express');
const bodyParser = require('body-parser');

// I used VS Code's built in formatting feature and the line below was added
// It didn't break anything, so I just kept it in
const { allowedNodeEnvironmentFlags } = require('process');

// setting up the PORT to be used and the app of express
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// global variable for information being sent to and from the server
let calculationsArray = [];

// sends the array to the client side
app.get('/calculations', (req, res) => {
    res.send(calculationsArray);
})

// Logical operators based on what is coming from the client side
// Initially, the .push() method was outside of the conditionals, 
// but I didn't want it to happen even during the error condition.
// Ended up being more copying and pasting than I would like, 
 // but if an operator is not selected by the user, their inputs are not pushed
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
        // catches with a 400 error, but returns what seems to be extra errors in the terminal 
        // isnt catching blank input for numbers
        // could have done an if/else in the ajax post (ajax being in the else and if conditionals being empty strings/undefined checks) 
    }
    res.sendStatus(200);
})


// sets up port 5000 for access
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});