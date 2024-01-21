var result = 0;
var firstKey = "";
var operator = "";
var secondKey = "";
var plusMinusToggle = false;
let dotAdded = false;

let display = document.querySelector('.display');
let subDisplay = document.querySelector('.sub-display');

let ac = document.querySelector('.key-ac');
ac.addEventListener('click', () => {
    display.textContent = 0;
    subDisplay.textContent = 0;
    firstKey = '';
    secondKey = '';
    operator = '';
    result = 0;
    dotAdded = false;
    display.style.fontSize = '60px';
})

let dotKey = document.querySelector('.key-dot');
dotKey.addEventListener('click', handleDotKey);

function handleDotKey() {
    if (!dotAdded) {
        // Add the dot to the current key
        if (operator === "") {
            firstKey += '.';
        } else {
            secondKey += '.';
        }
        display.textContent += '.';
        dotAdded = true;
    }
}

let plusMinusKey = document.querySelector('.key-plus-minus');
plusMinusKey.addEventListener('click', handlePlusMinusKey);

// Function to handle plus-minus key
function handlePlusMinusKey() {
    if (operator === "") {
        firstKey = toggleSign(firstKey);
    } else {
        secondKey = toggleSign(secondKey);
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = operator === "" ? firstKey : (secondKey !== "" ? secondKey : firstKey);
}

// Function to toggle the sign of a number
function toggleSign(number) {
    if(display.textContent == 0) {
        return 0;
    }
    const parsedNumber = parseFloat(number || firstKey);
    firstKey = -(firstKey);
    operator = '';
    if (!isNaN(parsedNumber)) {
        return (-parsedNumber).toString();
    }
    return ""; 
}

let percentage = document.querySelector('.key-percentage')
percentage.addEventListener('click', (e) => {
    let value = parseFloat(firstKey) / 100;
    display.textContent = value;
})

document.querySelector(".calculator-container").addEventListener("click", function(event) {
    const clickedKey = event.target;
    const keyType = clickedKey.getAttribute("data-type");
    
    if (keyType === "percentage") {
        handlePercentageKey();
    }else if (keyType === "number") {
      if(display.textContent == 0){
            display.textContent = clickedKey.textContent;
            handleNumberKey(clickedKey.textContent);
      }else {
       if(operator != '') {

            handleNumberKey(clickedKey.textContent);
        }
        else if(display.textContent.length !== 10 && operator === ''){
            display.textContent += clickedKey.textContent;
            handleNumberKey(clickedKey.textContent);
        }
      }
    } else if (keyType === "operator") {
        handleOperatorKey(clickedKey.textContent);
    } else if (keyType === "result") {
        handleResultKey();
      }
  });

  function handlePercentageKey() {
    mainDisplay.style.display = 'none';
    subDisplay.style.display = 'flex';
    if (firstKey !== "") {
        result = parseFloat(firstKey) / 100;
        display.textContent = result;
    }
    display.textContent = '';
    subDisplay.textContent = result;
    
    firstKey = "";
    secondKey = "";
    result = 0;
}
  

  function handleNumberKey(value) {
    if(mainDisplay.style.display === 'none'){
        mainDisplay.style.display = 'flex';
        subDisplay.style.display = 'none';
    }
    if (operator === "") {
      // If no operator is selected, update the first key
      firstKey += value;
    } else {
      // If an operator is selected, update the second key
      if(secondKey.length < 10) {
        secondKey += value;
        display.textContent = secondKey;
      }
    }
  }
  
  function handleOperatorKey(op) {
    secondKey = '';
    if(firstKey != '' && secondKey != ''){
        handleResultKey();
    }
    operator = op;
    dotAdded = false;
  }
  
  function handleResultKey() {
    if (firstKey !== "" && operator !== "" && secondKey !== "") {
      // Perform the calculation and display the result
      result = calculateResult();
      if (result > 9999999999999999999n){
            display.style.fontSize = '35px';
      } else if (result > 999999999999999) {
        display.style.fontSize = '40px';
      }else if (result > 99999999999) {
        display.style.fontSize = '45px';
      }else {
        display.style.fontSize = '60px';
      } 
        display.textContent = formatNumber(result);
    
      // Reset the state for the next calculation
      firstKey = result;
      secondKey = "";
      result = 0;
    }
  }

  function formatNumber(number) {
    const roundedNumber = roundUp(number, 10);
    return roundedNumber.toLocaleString(undefined, { maximumFractionDigits: 10 });
  }

  function roundUp(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    const roundedNumber = Math.ceil(number * factor) / factor;

    // Ensure the total number of digits (including decimal) is at most 10
    const numberString = roundedNumber.toString();
    const totalDigits = numberString.length;

    if (totalDigits > 11) {
        const integerDigits = numberString.split('.')[0].length;
        const decimalDigits = Math.max(0, 10 - integerDigits);
        return roundedNumber.toFixed(decimalDigits);
    }

    return roundedNumber;
  }

  function calculateResult() {
    const num1 = parseFloat(firstKey);
    const num2 = parseFloat(secondKey);
  
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      case "%":
        return num1 / 100;
      default:
        return "Invalid operator";
    }
  }

  