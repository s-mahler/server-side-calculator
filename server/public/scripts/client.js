console.log('js');

$(document).ready(onReady);

let operator;

function onReady() {
    console.log('jquery')
    $('#calculate').on('click', postInputs)
    $('.operatorButton').on('click', whichOperator);
    getCalc();
}

function whichOperator() {
    operator = $(this).val();
}


function getCalc() {
    $.ajax({
        type: 'GET',
        url: '/calculations'
    }).then(function(response) {
        console.log('get response', response);
        $('#calcList').empty();
        for (let i = 0; i < response.length; i++) {
            $('#calcList').append(`
                <li>${response[i].firstNum} ${response[i].operator} ${response[i].secondNum}</li>
            `);
        }
    }).catch(function(error){
        alert(error);
    })
}

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


