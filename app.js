let result = document.querySelector("#inputText");

function calculate(number) {
    result.value += number;
}

function results() {
    try {
        result.value = eval(result.value)
    }
    catch(err) {
        result.value = "ERROR";
    }
}

function clear() {
    result.value = " ";    
}

function del() {
    result.value = result.value.slice(0,-1);
}

function modulus() {
    result.value / 100;
}

function addition() {
    result.value + result.value;
}