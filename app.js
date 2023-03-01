// METHODS 

// function add(num1, num2) {
//     return num1 + num2;
// }

// function subtract(num1, num2) {
//     return num1 - num2;
// }

// function multiply(num1, num2) {
//     return num1 * num2;
// }

// function divide(num1, num2) {
//     return num1 / num2;
// }

// OPERATE

function operate(operator, a, b) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
      default:
        throw new Error(`Unknown operator '${operator}'`);
    }
  }


// DISPLAYING THE NUMBERS
const numDisplay = document.querySelector('.num-display');
const numButtons = document.querySelectorAll('.num-button');
const operators = document.querySelectorAll('.operator');

const number = document.querySelector('.number');
const secNum = document.querySelector('.sec-num');

let isFirstNum = true;

let storedNums = '';
let secondNums = '';

function addNumToDisplay(button) {
  if (isFirstNum) {
    storedNums += button.innerText;
    document.querySelector('.number').innerText = storedNums;
  } else {
    secondNums += button.innerText;
    document.querySelector('.sec-num').innerText = secondNums;
  }
}

numButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addNumToDisplay(button);
  });
});

function switchLoop() {
  isFirstNum = !isFirstNum;
}

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    switchLoop();

    // create the second number element
    const secNumEl = document.createElement('h2');
    secNumEl.classList.add('sec-num');
    numDisplay.appendChild(secNumEl);

    // clear the second number
    // secondNums = '';
    // numDisplay.querySelector('.sec-num').innerText = '';

    // display the operator
    numDisplay.querySelector('.number').innerText += ` ${operator.innerText}`;
  });
});


// CALCULATE 
const equalsSign = document.querySelector('.equals-sign')
const result = document.querySelector('.result');

equalsSign.addEventListener('click', function() {
  let fullNumbers = '';

  fullNumbers += number.innerHTML + " " + secondNums;

  console.log(fullNumbers)  

  result.textContent = calculate(fullNumbers);
})


function calculate(str) {
  const [num1, operator, num2] = str.split(' ');
  // if string is: "50 + 10", 
  // num1 = 50
  // operator = +
  // num2 = 10
  
  // turns the string numbers into real numbers
  const n1 = parseInt(num1);
  const n2 = parseInt(num2);

  // looks at the operator, calculates based on what operator you picked;
  switch (operator) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
    case '%':
      return n1 / n2;
    default:
      return NaN;
  }
}

