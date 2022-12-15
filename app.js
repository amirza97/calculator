let firstNumber = 0;
let secondNumber = 0;
let operator = null;
let operatorActive = false;
let percentageActive = false;

const operators = ['/','*','-','+'];
const inputDisplay = document.getElementById('display');
const equalButton = document.getElementById('=');
const acButton = document.getElementById('ac');
const deleteButton = document.getElementById('del');
const percentageButton = document.getElementById('percent');
const decimalButton = document.getElementById('decimal');

function setDisplay(value){
    inputDisplay.innerHTML = value;
}

function operate (numA,numB,operator) {
    switch (operator) {
        case ('+'): {
            return numA + numB;
        }
        case ('/'): {
            return numA / numB;
        }
        case ('-'): {
            return numA - numB;
        }
        case ('*'): {
            return numA * numB;
        }
        default: {
            return 0;
        }
    }
}

function typeNumber (value) {
    if (!operatorActive && !percentageActive) {
        if (inputDisplay.innerHTML === '0') {
            setDisplay(value);
        } else {
            setDisplay(inputDisplay.innerHTML + value);
        }
    } else {
        setDisplay(value);
        operatorActive = false;
        percentageActive = false;
    }
}

function calculate(numA,numB,operand) {
    const result = operate(numA,numB,operand);
    setDisplay(result);
    firstNumber = result;
    operatorActive = true;
    operator = null;
}

function typeOperator(op) {
    const displayValue = parseFloat(inputDisplay.innerHTML);
    if (operator && !operatorActive) {
        calculate(firstNumber, displayValue, operator);
    } else {
        firstNumber = displayValue;
    }
    operator = op;
    operatorActive = true;
}

equalButton.addEventListener('click',() => {
    if (!operatorActive && operator !== null) {
        secondNumber = parseFloat(inputDisplay.innerHTML)
        calculate(firstNumber,secondNumber,operator)
    }
})

acButton.addEventListener('click',() => {
    firstNumber = 0;
    secondNumber = null;
    operator = null;
    operatorActive= false;
    setDisplay(0);
})

deleteButton.addEventListener('click',() =>{
    if (operatorActive || inputDisplay.innerHTML.length === 1  ) {
        setDisplay(0);
    } else {
        setDisplay(inputDisplay.innerHTML.slice(0,-1));
    }
})

percentageButton.addEventListener('click',() => {
    setDisplay(parseFloat(inputDisplay.innerHTML) /100);
    percentageActive = true;
})

decimalButton.addEventListener('click',() => {
    if (operatorActive) {
        setDisplay('0.');
        operatorActive= false
    } else if (inputDisplay.innerHTML.indexOf('.') === -1) {
        setDisplay(inputDisplay.innerHTML + '.');
    }

})

for (let i = 0; i < 10; i++) {
    const element = document.getElementById(`number-${i}`);
    element.addEventListener('click', () => typeNumber(i));
}

operators.forEach((operator) => {
    const element = document.getElementById(operator);
    element.addEventListener('click', () => {
        typeOperator(operator);
    })
})

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});