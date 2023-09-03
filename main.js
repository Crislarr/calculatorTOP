const $display = document.querySelector("#display");
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

let displayedNumber = [];
let firstNumber = "";
let operator = "";
let secondNumber = "";

$numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    ConcatenateNumber(button.innerText);
    actualizeDisplay();
  })
);

$operators.forEach((currentOperator) =>
  currentOperator.addEventListener("click", () => {
    if (currentOperator.id === "substract" && !displayedNumber[0]) {
      handleNegativeSign();
      return;
    }
    if (!firstNumber) {
      firstNumber = $display.innerText;
      operator = currentOperator.id;
      cleanDisplay();
      enableDecimal();
      return;
    }
    if (firstNumber) {
      $equalButton.click();
      operator = currentOperator.id;
    }
  })
);

$equalButton.addEventListener("click", () => {
  secondNumber = $display.innerText;
  if (!firstNumber || !secondNumber || !operator) {
    return;
  }
  let solution = parseFloat(
    operate(firstNumber, operator, secondNumber).toFixed(4)
  );

  displayedNumber = Array.from(String(solution));

  firstNumber = displayedNumber;

  actualizeDisplay();

  operator = "";

  secondNumber = "";

  enableDecimal();
});

$decimalButton.addEventListener("click", () => {
  disableDecimal();
});

$acButton.addEventListener("click", () => {
  resetCalculator();
  actualizeDisplay();
});

$deleteButton.addEventListener("click", () => {
  displayedNumber.pop();
  actualizeDisplay();
});

function operate(a, operator, b) {
  return operations[`${operator}`](Number(a), Number(b));
}

function ConcatenateNumber(number) {
  displayedNumber.push(number);
}

function actualizeDisplay() {
  $display.innerText = displayedNumber.join("");
}

function disableDecimal() {
  $decimalButton.disabled = true;
}

function enableDecimal() {
  $decimalButton.disabled = false;
}

function resetCalculator() {
  displayedNumber = [];

  firstNumber = "";

  secondNumber = "";

  operator = "";
}

function handleNegativeSign() {
  if ($display.innerText === "-") {
    return;
  }
  displayedNumber.push("-");
  actualizeDisplay();
  return;
}

function cleanDisplay() {
  displayedNumber = [];
}
