console.log('js');

$(document).ready(onReady);

let operator;

function onReady() {
    console.log('jquery')
    // $('#addButton').on('click', sendAdd);
    // $('#subtractButton').on('click', subtract);
    // $('#multiplyButton').on('click', multiply);
    // $('#divideButton').on('click', divide);
    $('#calculate').on('click', postInputs)
    getCalc();
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
                <li>${response[i].firstNum} ${response[i].secondNum}</li>
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
            secondNum: secondNum
        }
    }).then(function(response){
        getCalc();
    }).catch(function(error){
        alert(error);
    });
}


