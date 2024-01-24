var result = 0;
var firstKey = "";
var operator = "";
var secondKey = "";
var plusMinusToggle = false;
let dotAdded = false;
var per = 0;
var wasPercent = false;
var wasMinus = false;
var inPer = false;

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
    per = 0;
    wasMinus = false;
    wasPercent = false;
    inPer = false;
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
        if(wasPercent){
            firstKey = toggleSign(firstKey);
            updateDisplay()
        }else {
            firstKey = toggleRegSign(firstKey);
            display.textContent = firstKey;
        }
    } else {
        if(wasPercent){
            secondKey = toggleSign(secondKey);
            updateDisplay()
        }else {
            secondKey = toggleRegSign(secondKey);
            display.textContent = secondKey;
        }
    }
}

function updateDisplay() {
    display.textContent = operator === "" ? -firstKey : (secondKey !== "" ? secondKey : -firstKey);
}

// Function to toggle the sign of a number
function toggleRegSign(number) {
    const parsedNumber = parseFloat(number);
    if (!isNaN(parsedNumber)) {
        return (-parsedNumber);
    }
    return ""; // Return empty string for non-numeric values
}


// Function to toggle the sign of a number
function toggleSign(number) {
    wasMinus = !wasMinus;
    if(wasMinus){
        subDisplay.textContent = -result;
    }else {
        subDisplay.textContent = result;
    }
    if(firstKey != '' && operator != '' && secondKey != ''){
        subDisplay.textContent = -secondKey;
    }
        
    if (result != '') {
        number = result;
        firstKey = number;
        display.textContent = subDisplay.textContent;
    }
    if(display.textContent == 0) {
        return 0;
    }else {
        if (firstKey != '' && secondKey == ''){
            display.textContent = firstKey;
        }
    }
   
    per = firstKey;
    const parsedNumber = parseFloat(number || firstKey);
    operator = '';
    if (!isNaN(parsedNumber)) {
        return (-parsedNumber).toString();
    }
    return ""; 
}

document.querySelector(".calculator-container").addEventListener("click", function(event) {
    const clickedKey = event.target;
    const keyType = clickedKey.getAttribute("data-type");
    
    if (keyType === "percentage") {
        handlePercentageKey();
    }else if (keyType === "number") {
      if(display.textContent == 0 && !dotAdded){
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
    wasPercent = true;
    mainDisplay.style.display = 'none';
    subDisplay.style.display = 'flex';
    if (firstKey !== "" && secondKey == '') {
        result = parseFloat(firstKey) / 100;
        display.textContent = result;
    } 
    
    else if (firstKey != '' && secondKey != '' && operator != ""){
        secondKey = parseFloat(secondKey) / 100;
        switch (operator) {
            case "+":
              result = (parseFloat(firstKey)) + secondKey
              break;
            case "-":
                result = (parseFloat(firstKey) ) - secondKey
                break;
            case "*":
                result = (parseFloat(firstKey) ) * secondKey
                break;
            case "/":
                result = (parseFloat(firstKey) ) / secondKey
                break;
            default:
              return "Invalid operator";
          }
          inPer = true;
    }
        
    if(!inPer) {
        display.textContent = '';
        subDisplay.textContent = result;
        per = result;
        firstKey = '';
        secondKey = '';
    }else {
        display.textContent = '';
        subDisplay.textContent = secondKey;
    }  
  }
  
  function handleNumberKey(value) {
    if(mainDisplay.style.display === 'none'){
        mainDisplay.style.display = 'flex';
        subDisplay.style.display = 'none';
    }
    if (operator === "") {
      // If no operator is selected, update the first key
      firstKey += value;
      if(wasMinus){
        display.textContent = -(firstKey);
      }
    } else {
      // If an operator is selected, update the second key
      if(secondKey.length < 10) {
        secondKey += value;
        display.textContent = secondKey;
      }
    }
    if (wasPercent && operator != ''){
        if(wasMinus){
            firstKey = -per;
        }else {
            firstKey = per;
        }
    }
    wasPercent = false;
  }
  
  function handleOperatorKey(op) {
    secondKey = '';
    if (wasPercent) {
        firstKey = result;
    }
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
      if (inPer) {
        subDisplay.textContent = formatNumber(result);
      } else {
        display.textContent = formatNumber(result);
      }
        
      // Reset the state for the next calculation
      firstKey = result;
      secondKey = "";
      result = 0;
    }
  }

  function formatNumber(number) {
    const roundedNumber = roundUp(number, 10);
    const formattedNumber = roundedNumber.toLocaleString(undefined, { maximumFractionDigits: 10 });
    return removeTrailingZeros(formattedNumber);
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

  function removeTrailingZeros(numberString) {
      return numberString.replace(/\.?0+$/, '');
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

  