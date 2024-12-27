function addOperation(num1, num2){
    console.log("addOperation reached");
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
            console.log("+ operate reached");
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
    console.log(display.textContent);
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
});

const maxSize = 3;
let theBigThree = [];
console.log(theBigThree);
operatorWasLastEntry = false;

const addButton = document.querySelector("#plus");
addButton.addEventListener("click", () => {
    if (getDisplayContent() != "" && !operatorWasLastEntry){
        theBigThree.push(getDisplayContent())
        theBigThree.push("+");
        console.log("the big three: " + theBigThree)
        operatorWasLastEntry = true;
        console.log("operator was pressed: " + operatorWasLastEntry)
    } else {
        console.log("empty display");
    }
});
const subtractButton = document.querySelector("#minus");
subtractButton.addEventListener("click", () => {
    setDisplayContent("-");
});
const multiplyButton = document.querySelector("#multiply");
multiplyButton.addEventListener("click", () => {
    setDisplayContent("*");
});
const divideButton = document.querySelector("#divide");
divideButton.addEventListener("click", () => {
    setDisplayContent("/");
});




const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
    console.log(theBigThree);
    theBigThree.push(getDisplayContent());
    console.log("the big three: " + theBigThree);
    console.log("the big one1: " + theBigThree[0]);
    console.log("the big two2: " + theBigThree[1]);
    console.log("the big three3: " + theBigThree[2]);
    
    result = operate(parseInt(theBigThree[0]), theBigThree[1], parseInt(theBigThree[2]));
    setDisplayContent(result);
    console.log(result);
});


const digitButtons = document.querySelectorAll(".digits");
digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorWasLastEntry) {
            clear();
            displayDigit(button.id);
            operatorWasLastEntry = false;
        } else {
            displayDigit(button.id);
        }
        
    });
});