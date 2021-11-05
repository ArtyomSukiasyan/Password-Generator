const resultEl = document.querySelector("#result");
const lengthEl = document.querySelector("#length");
const uppercaseEl = document.querySelector("#uppercase");
const lowercaseEl = document.querySelector("#lowercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const generateEl = document.querySelector("#generate");
const clipboardEl = document.querySelector("#clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  navigator.clipboard.writeText(password);
  alert("Copied the text: ");
});

generateEl.addEventListener("click", () => {
  const length = Number(lengthEl.value);
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  const min = lengthEl.min;
  const max = lengthEl.max;

  if (length < min || length > max) {
    alert(`Please enter lingth between ${min} and ${max}`);
    return "";
  }

  let generatedPassword = "";
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (!typesArr.length) {
    alert("Invalid properties");
    return "";
  }

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(
      Math.random() * Object.keys(typesArr).length
    );
    const funcNameObj = typesArr[randomNumber];
    const funcName = Object.keys(funcNameObj)[0];
    generatedPassword += randomFunc[funcName]();
  }

  return generatedPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}
