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

function operate(operator, num1, num2){
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
const display = document.querySelector(".display");

displayContent = "";
function displayDigit(buttonID) {
    display.textContent += buttonID;
    displayContent = display.textContent;
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    display.textContent = "";
});


const digitButtons = document.querySelectorAll(".digits");
digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        displayDigit(button.id);
    });
});