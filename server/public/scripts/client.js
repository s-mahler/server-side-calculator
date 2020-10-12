$(document).ready(onReady);

let operator;

function onReady() {
    // event listeners
    $('#calculate').on('click', postInputs)
    $('.operatorButton').on('click', whichOperator);
    $('#clear').on('click', clearFields);
    
    //initial get values for the DOM
    getCalc();
}

// function that selects the operator of the button pressed
function whichOperator() {
    operator = $(this).val();
}


// clear number one and number two input fields
function clearFields() {
    $('#firstNumIn').val('');
    $('#secondNumIn').val('');
}

// uses GET to append information from the server to the DOM
function getCalc() {
    $.ajax({
        type: 'GET',
        url: '/calculations'
    }).then(function(response) {
        $('#calcList').empty();
        for (let i = 0; i < response.length; i++) {
            $('#answer').empty().append(`${response[response.length - 1].answer}`)
            $('#calcList').append(`
                <li>${response[i].firstNum} ${response[i].operator} ${response[i].secondNum} = ${response[i].answer}</li>
            `);
        }
    }).catch(function(error){
        alert(error);
    })
}

// POSTs inputs from the DOM to the server and then runs the GET function to append
function postInputs() {
    let firstNum = $('#firstNumIn').val();
    let secondNum = $('#secondNumIn').val();
    $.ajax({
        type: 'POST',
        url: '/calculations',
        data: {
            firstNum: firstNum,
            secondNum: secondNum,
            operator: operator
        }
    }).then(function(response){
        getCalc();
    }).catch(function(error){
        alert(error);
    });
}


