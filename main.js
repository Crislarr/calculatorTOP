const $display = document.querySelector("#display");
const $topDisplay = document.querySelector("#top-display");
const $bottomDisplay = document.querySelector("#bottom-display");
const $operators = document.querySelectorAll(".operator");
const $numberButtons = document.querySelectorAll(".number");
const $equalButton = document.querySelector("#equal-button");
const $deleteButton = document.querySelector("#delete-button");
const $acButton = document.querySelector("#ac-button");
const $decimalButton = document.querySelector("#decimal-button");
const $substractButton = document.querySelector("#substract");

const operations = {
  add: (a, b) => a + b,
  substract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

let topDisplayedArr = [];
let bottomDisplayedArr = [];
let firstNumber = "";
let operator = "";
let secondNumber = "";

$numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (bottomDisplayedArr[10]) {
      return;
    }
    ConcatenateNumber(button.innerText);
    actualizeBottomDisplay();
  })
);

$operators.forEach((currentOperator) =>
  currentOperator.addEventListener("click", () => {
    if (currentOperator.id === "substract" && !bottomDisplayedArr[0]) {
      handleNegativeSign();
      return;
    }

    if (bottomDisplayedArr[0] == "-" && !bottomDisplayedArr[1]) {
      return;
    }

    if (operator) {
      $operators.forEach((a) => {
        a.classList.remove("pressed");
      });
    }

    currentOperator.classList.add("pressed");
    operator = currentOperator.id;

    if (!firstNumber) {
      firstNumber = $bottomDisplay.innerText;
      updateTopDisplay();
      cleanBottomDisplay();
      enableDecimal();
      return;
    }
    if (firstNumber) {
      $equalButton.click();
      currentOperator.classList.add("pressed");
      operator = currentOperator.id;
    }
  })
);

$equalButton.addEventListener("click", () => {
  secondNumber = $bottomDisplay.innerText;
  if (!firstNumber || !secondNumber || !operator) {
    return;
  }
  let solution = parseFloat(
    operate(firstNumber, operator, secondNumber).toFixed(4)
  );

  if (operator === "divide" && secondNumber === "0") {
    $topDisplay.innerText = "):";
    $bottomDisplay.innerText = ":(";

    return;
  }

  topDisplayedArr = Array.from(String(solution));

  firstNumber = solution;

  actualizeTopDisplay();
  actualizeBottomDisplay();

  $operators.forEach((a) => {
    a.classList.remove("pressed");
  });

  operator = "";

  secondNumber = "";

  $bottomDisplay.innerText = "";

  bottomDisplayedArr = [];

  enableDecimal();
});

$decimalButton.addEventListener("click", () => {
  disableDecimal();
});

$acButton.addEventListener("click", () => {
  resetCalculator();
  actualizeTopDisplay();
  actualizeBottomDisplay();
});

$deleteButton.addEventListener("click", () => {
  bottomDisplayedArr.pop();
  actualizeBottomDisplay();
});

function operate(a, operator, b) {
  return operations[`${operator}`](Number(a), Number(b));
}

function ConcatenateNumber(number) {
  bottomDisplayedArr.push(number);
}

function actualizeBottomDisplay() {
  $bottomDisplay.innerText = bottomDisplayedArr.join("");
}

function actualizeTopDisplay() {
  $topDisplay.innerText = topDisplayedArr.join("");
}

function disableDecimal() {
  $decimalButton.disabled = true;
}

function enableDecimal() {
  $decimalButton.disabled = false;
}

function resetCalculator() {
  topDisplayedArr = [];

  bottomDisplayedArr = [];

  firstNumber = "";

  secondNumber = "";

  operator = "";

  $operators.forEach((a) => {
    a.classList.remove("pressed");
  });

  enableDecimal();
}

function handleNegativeSign() {
  if ($bottomDisplay.innerText === "-") {
    return;
  }
  bottomDisplayedArr.push("-");
  actualizeBottomDisplay();
  return;
}

function cleanBottomDisplay() {
  bottomDisplayedArr = [];
  $bottomDisplay.innerText = [];
}

function cleanTopDisplay() {
  topDisplayedArr = [];
}

function updateTopDisplay() {
  $topDisplay.innerText = firstNumber;
}
