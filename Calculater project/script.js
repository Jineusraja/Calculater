// Variables to store the current value, previous value, operator, and history
let currentValue = '0';
let previousValue = '';
let operator = null;
let history = [];

// Get the display element and history element
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

// Function to update the main display
function updateDisplay() {
  display.textContent = currentValue;
}

// Function to update the history display
function updateHistory() {
  historyDisplay.innerHTML = history.join('<br>');  // Display each history item in a new line
}

// Function to handle digit input
function handleDigit(digit) {
  if (currentValue === '0') {
    currentValue = digit;
  } else {
    currentValue += digit;
  }
  updateDisplay();
}

// Function to handle operator input
function handleOperator(nextOperator) {
  if (operator && previousValue) {
    currentValue = String(eval(`${previousValue} ${operator} ${currentValue}`));
    updateHistory();  // Update history after performing a calculation
  }
  previousValue = currentValue;
  currentValue = '';
  operator = nextOperator;
}

// Function to reset the calculator
function clearCalculator() {
  currentValue = '0';
  previousValue = '';
  operator = null;
  history = [];  // Clear history when calculator is reset
  updateDisplay();
  updateHistory();  // Update history display
}

// Function to handle equal button click
function calculateResult() {
  if (previousValue && currentValue && operator) {
    const result = String(eval(`${previousValue} ${operator} ${currentValue}`));
    
    // Save to history
    const operation = `${previousValue} ${operator} ${currentValue} = ${result}`;
    history.push(operation);  // Add the current operation to history
    
    // Update display and history
    currentValue = result;
    previousValue = '';
    operator = null;
    updateDisplay();
    updateHistory();
  }
}

// Event listeners for number buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    const value = this.value;

    if (!isNaN(value) || value === '.') {
      handleDigit(value);
    }
  });
});

// Event listeners for operator buttons
document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', function() {
    const value = this.value;

    if (value === 'C') {
      clearCalculator();
    } else {
      handleOperator(value);
    }
  });
});

// Event listener for the equal button
document.getElementById('equal').addEventListener('click', calculateResult);
