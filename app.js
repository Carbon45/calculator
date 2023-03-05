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

// function operate(operator, a, b) {
//     switch (operator) {
//       case '+':
//         return add(a, b);
//       case '-':
//         return subtract(a, b);
//       case '*':
//         return multiply(a, b);
//       case '/':
//         return divide(a, b);
//       default:
//         throw new Error(`Unknown operator '${operator}'`);
//     }
//   }


// DISPLAYING THE NUMBERS
const numDisplay = document.querySelector('.num-display');
const numButtons = document.querySelectorAll('.num-button');
const operators = document.querySelectorAll('.operator');

const number = document.querySelector('.number');
const secNumEl = document.querySelector('.sec-num');

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
    calcClick.currentTime = 0;
    calcClick.play();
  });
});

function switchLoop() {
  isFirstNum = !isFirstNum;
}

// OPERATORS
operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    // flag for if there is an operator
    let operatorPresent = false;

    // plays audio
    calcClick.currentTime = 0;
    calcClick.play();

    if (isFirstNum === true && number.innerHTML !== '0' && storedNums !== '') {
      operatorPresent = true;

      switchLoop();

      // create the second number element
      const secNumEl = document.createElement('h2');
      secNumEl.classList.add('sec-num');
      numDisplay.appendChild(secNumEl);
  
      // display the operator
      numDisplay.querySelector('.number').innerText += ` ${operator.innerText}`;
    }

    else if (number.innerHTML === '0' && storedNums === '') {
      return;
    }
    
    else if (operatorPresent = true) {
      // if there there is an operator, then we want to delete the current operator and then replace it with the other operator
      number.textContent = `${storedNums}`;                          
      number.textContent += ` ${operator.innerText}`;
    }
    else {
      isFirstNum === false;

      let fullNumbers = '';

      fullNumbers += number.innerHTML + " " + secondNums;
    
      const numResult = calculate(fullNumbers);
    
      number.textContent = `${numResult} ${operator.textContent}`
      document.querySelector('.sec-num').remove();
    
      // resets the values
      secondNums = '';
      storedNums = numResult.toString();

      // create second element
      const secNumEl = document.createElement('h2');
      secNumEl.classList.add('sec-num');
      numDisplay.appendChild(secNumEl);
    
    }

  });
});

// ZERO 

const zeroBtn = document.querySelector('.num-button-zero');

zeroBtn.addEventListener('click', function() {
  calcClick.currentTime = 0;
  calcClick.play();

  if (isFirstNum) {
    if (storedNums === '') {
      return; // Prevent adding a second zero at the beginning
    }
    storedNums += zeroBtn.innerText;
    document.querySelector('.number').innerText = storedNums;
  } 
  else {

    if (secondNums === '') {
      document.querySelector('.sec-num').textContent = '0'; // displays 0, but does not actually contribute to the real number
      return;
    } 

    secondNums += zeroBtn.innerText;  
    document.querySelector('.sec-num').innerText = secondNums;
  }
});

// CALCULATE 
const equalsSign = document.querySelector('.equals-sign')

equalsSign.addEventListener('click', function() {
  calcClick3.currentTime = 0;
  calcClick3.play();

  // prevents from calculating, if first or second num is empty;
  if (storedNums === '' || secondNums === '') {
    return;
  }

  let fullNumbers = '';

  fullNumbers += number.innerHTML + " " + secondNums;

  const numResult = calculate(fullNumbers);

  number.textContent = numResult
  document.querySelector('.sec-num').remove();

  // resets the values
  secondNums = '';
  storedNums = numResult.toString();

  isFirstNum = true;
  


})


function calculate(str) {
  const [num1, operator, num2] = str.split(' ');
  // if string is: "50 + 10", 
  // num1 = 50
  // operator = +
  // num2 = 10
  
  // turns the string numbers into real numbers
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

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

// CLEAR BTN 

const clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', function() {
  calcClick2.currentTime = 0;
  calcClick2.play();

  if (document.querySelector('.sec-num') !== null) {
    number.innerHTML = '';
    document.querySelector('.sec-num').remove();
  }
  else {
    number.innerHTML = '';
  }

  fullNumbers = '';
  secondNums = '';
  storedNums = '';
})

// DELETE BTN

const deleteBtn = document.querySelector('.delete-btn');

deleteBtn.addEventListener('click', function() {
  calcClick2.currentTime = 0;
  calcClick2.play();

  if (isFirstNum === true) {
    storedNums.toString();

    storedNums = storedNums.slice(0, -1);
  
    number.textContent = storedNums;
  
  }
  else {
    secondNums.toString();

    secondNums = secondNums.slice(0, -1);

    document.querySelector('.sec-num').textContent = secondNums;
  }

})

// DOT 

const dot = document.querySelector('.dot');

dot.addEventListener('click', function() {
  calcClick.currentTime = 0;
  calcClick.play();

  if (isFirstNum) {

    if (storedNums === '') {
      storedNums = '0.';
    } else if (!storedNums.includes('.')) {
      // if number doesnt already include a dot, it will add a dot
      storedNums += '.';
    }
    number.textContent = storedNums;
    
  } else {
    if (secondNums === '') {
      secondNums = '0.';
    } else if (!secondNums.includes('.')) {
      secondNums += '.';
    }
    document.querySelector('.sec-num').textContent = secondNums;
  }
});                  

// AUDIO 

const calcClick = document.querySelector('.calc-click')
const calcClick2 = document.querySelector('.calc-click-2');
const calcClick3 = document.querySelector('.calc-click-3');