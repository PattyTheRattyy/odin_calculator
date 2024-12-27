

function addOperation(num1, num2){
    return num1 + num2;
}
function subtractOperation(num1, num2){
    return num1 - num2;
}
function multiplyOperation(num1, num2){
    return num1 * num2;
}
function divideOperation(num1, num2){
    return num1 / num2;
}

function operate(num1, operator, num2){
    switch (operator){
        case '+':
            return addOperation(num1, num2);
        case '-':
            return subtractOperation(num1, num2);
        case '*':
            return multiplyOperation(num1, num2);
        case '/':
            return divideOperation(num1, num2);
    }
}

const calcBody = document.querySelector("#calculator");
const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

function getDisplayContent() {
    return display.textContent;
}

function setDisplayContent(content) {
    display.textContent = content;
}

function addDisplayContent(content) {
    display.textContent += content;
}

function displayDigit(buttonID) {
    addDisplayContent(buttonID);
}

function clear(){
    setDisplayContent("");
}

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    clear();
    theBigThree.length = 0;
});

const maxSize = 3;
let theBigThree = [];
operatorWasLastEntry = false;

function operatorButtonLogic(operator) {
    if (getDisplayContent() != "" && !operatorWasLastEntry && theBigThree.length == maxSize-1) {
        resultAndOperator = equals();
        theBigThree[0] = resultAndOperator[0];
        theBigThree[1] = resultAndOperator[1];
    }
    else if (getDisplayContent() != "" && !operatorWasLastEntry || getDisplayContent() != "" && equalsWasLastEntry){
        theBigThree.push(getDisplayContent())
        theBigThree.push(operator);
        console.log("the big three: " + theBigThree)
        operatorWasLastEntry = true;
        console.log("operator was pressed: " + operatorWasLastEntry)
    } 
}

const addButton = document.querySelector("#plus");
addButton.addEventListener("click", () => {
    operatorButtonLogic("+");
});
const subtractButton = document.querySelector("#minus");
subtractButton.addEventListener("click", () => {
    operatorButtonLogic("-");
});
const multiplyButton = document.querySelector("#multiply");
multiplyButton.addEventListener("click", () => {
    operatorButtonLogic("*");
});
const divideButton = document.querySelector("#divide");
divideButton.addEventListener("click", () => {
    operatorButtonLogic("/");
});


function equals() {
    theBigThree.push(getDisplayContent());
    operatorWasLastEntry = true;

    console.log("the big three: " + theBigThree);

    num1 = parseInt(theBigThree[0]);
    operator = theBigThree[1];
    num2 = parseInt(theBigThree[2]);
    
    result = operate(num1, operator, num2);
    setDisplayContent(result);
    console.log(result);
    theBigThree.length = 0;
    console.log(theBigThree);
    return [result, operator];
}


const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
    equals();
    equalsWasLastEntry = true;
});


const digitButtons = document.querySelectorAll(".digits");
digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorWasLastEntry) {
            clear();
            displayDigit(button.id);
            operatorWasLastEntry = false;
            equalsWasLastEntry = false;
        } else {
            displayDigit(button.id);
        }
        
    });
});