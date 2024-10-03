// Get references to elements
const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';
let result = '';
let isScientificOp = false; 
const deleteButton = document.getElementById('delete');

const buttons = document.querySelectorAll('.button');
const scientificButtons = document.querySelectorAll('.scientific');

// Event listener for basic buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        // Clear button
        if (value === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            result = '';
            display.textContent = '0';
            isScientificOp = false; // Reset scientific flag
            return;
        }

        // Operator buttons
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '' && result !== '') {
                previousInput = result;
            } else {
                previousInput = currentInput;
            }
            operator = value;
            currentInput = '';
            return;
        }

        // Equals button handling
        if (value === '=') {
            if (isScientificOp) {
                // If a scientific operation was used
                const num = parseFloat(currentInput.slice(currentInput.indexOf('(') + 1, -1)); // Get number inside parentheses
                const operation = currentInput.slice(0, currentInput.indexOf('(')); // Get scientific operation
                result = scientific(num, operation);
            } else if (currentInput !== '' && previousInput !== '') {
                result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
            }

            // Display the result
            display.textContent = result;
            currentInput = '';
            previousInput = '';
            operator = '';
            isScientificOp = false; // Reset after calculation
            return;
        }

        // Number and decimal point buttons
        if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
        currentInput += value;
        display.textContent = currentInput;
    });
});

// Event listener for scientific buttons
scientificButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        if (['sin', 'cos', 'tan', 'log', 'ln'].includes(value)) {
            isScientificOp = true; // Set scientific operation flag
            currentInput = value + '('; // Add scientific operation with parentheses
            display.textContent = currentInput;
        } else if (value === 'π') {
            currentInput = Math.PI; // Append π directly as a number
            display.textContent = currentInput;
        } else if (value === 'e') {
            currentInput = Math.E; // Append e directly as a number
            display.textContent = currentInput;
        }
    });
});

// Calculation function for basic operations
function calculate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return '';
    }
}

// Function for scientific operations
function scientific(num, operation) {
    switch (operation) {
        case 'sin':
            return Math.sin(num);
        case 'cos':
            return Math.cos(num);
        case 'tan':
            return Math.tan(num);
        case 'log':
            return Math.log10(num);
        case 'ln':
            return Math.log(num);
        default:
            return num; // return the original number if no operation matches
    }
}

function deleter(){
    // Convert the current input to a string and remove the last character
    currentInput = currentInput.toString().slice(0, -1);

    // If the current input becomes empty, reset it to '0'
    if (currentInput === '') {
        currentInput = '0';
    }

    // Update the display with the new current input
    display.textContent = currentInput;
}
