// references to elements
const calcBody = document.querySelector("#calculator");
const display = document.querySelector("#display");
const displayContent = document.querySelector("#displayContent");

// operation functions
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
    // prevent division by 0
    if (num2 != 0) {
        return parseFloat((num1 / num2).toFixed(13));
    } 
    else {
        console.log("divie by 0 detected");
        dividebyZero()
        return "Go hit the math textbooks.";
    }
    
}

function dividebyZero() {
    displayContent.textContent = "Go hit the math textbooks.";
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

// functions to get, set, and modify the display's content
function getDisplayContent() {
    return displayContent.textContent;
}
const maxDisplayChars = 13; // limit to prevent overflow
function setDisplayContent(content) {
    lengthOfNum = content.toString().length;
    // enforce character limit
    if (lengthOfNum < maxDisplayChars) {
        console.log(content);
        displayContent.textContent = content;
    }
}
function addDisplayContent(content) {
    // enforce character limit
    if (display.textContent.length < maxDisplayChars) {
        displayContent.textContent += content;
    }
}

// clear function and button that resets display
function clear(){
    setDisplayContent("");
}
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    clear();
    theBigThree.length = 0;
});


// max size of the big three array
const maxSize = 3;
// theBigThree is the list of num1, operator, and num2
let theBigThree = [];
// boolean flags used to avoid weird behaviour if the user enters multiple operators in a row ex: "+++"
operatorWasLastEntry = false;
equalsWasLastEntry = false;

/* This function handles the logic for the operator buttons:
- If theBigThree is full (num1, operator, num2), compute the result before adding the new operator.
- Prevents issues with consecutive operator presses or operations following equals. */
function operatorButtonLogic(operator) {
    if (getDisplayContent() != "" && !operatorWasLastEntry && theBigThree.length == maxSize-1) {
        resultAndOperator = equals(); // compute result
        theBigThree[0] = resultAndOperator[0]; // store result
        theBigThree[1] = resultAndOperator[1]; // store new operator
    }
    // add display value and operator to theBigThree
    else if (getDisplayContent() != "" && !operatorWasLastEntry || getDisplayContent() != "" && equalsWasLastEntry){
        theBigThree.push(getDisplayContent())
        theBigThree.push(operator);
        operatorWasLastEntry = true;
    } 
}

// operation buttons
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


/*
- Handles the equals button functionality
- Operates on num1, operator, and num2 (stored in theBigThree array).
*/
function equals() {
    // prevents execution if the last button was an operator or no input exists.
    if (!operatorWasLastEntry && !equalsWasLastEntry && theBigThree.length != 0) {
        theBigThree.push(getDisplayContent());
        operatorWasLastEntry = true;
    
        // extracting values for the operation
        num1 = parseFloat(theBigThree[0]);
        operator = theBigThree[1];
        num2 = parseFloat(theBigThree[2]);
        
        // compute the result and reset theBigThree
        result = operate(num1, operator, num2);
        setDisplayContent(result);
        theBigThree.length = 0;
        return [result, operator];
    }
}

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
    equals();
    equalsWasLastEntry = true;
});


const digitButtons = document.querySelectorAll(".digits");
digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // prevents invalid numbers like 00123 or 00.234
        if (getDisplayContent() != 0 || button.id == "." || getDisplayContent().includes(".")) {
            if (operatorWasLastEntry) {
                clear();
                operatorWasLastEntry = false;
                equalsWasLastEntry = false;
            }
            // prevents invalud numbers like 1....23 or 124..3
            if (button.id != "." || button.id == "." && !getDisplayContent().includes(".")) {
                addDisplayContent(button.id);
            }
        } else {
            if (operatorWasLastEntry) {
                clear();
                operatorWasLastEntry = false;
                equalsWasLastEntry = false;
            }
            setDisplayContent(button.id);
        }
    });
});

// colorful box shadow animation button
const funButton = document.querySelector("#fun");
funButton.addEventListener("click", () => {
    calcBody.classList.remove('animate'); 
    void calcBody.offsetWidth; // trigger a reflow to reset the animation <- this line is from chatgpt
    calcBody.classList.add('animate'); 
});

// convert to percentage decimal button
const percentButton = document.querySelector("#percent");
percentButton.addEventListener("click", () => {
    setDisplayContent(parseFloat(getDisplayContent()) / 100);
});

// toggle sign button
positive = true;
const signToggle = document.querySelector("#signToggle");
signToggle.addEventListener("click", () => {
    setDisplayContent(parseFloat(getDisplayContent() * (-1)));
});