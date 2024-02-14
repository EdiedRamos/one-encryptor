function getById(id) {
  return document.getElementById(id);
}

function initialConfig(references) {
  console.log(references.encryptButton);
  // references.encryptButton.disabled = true;
  // references.decryptButton.disabled = true;
}

function getContent(node) {
  return node.value;
}

function getReferences() {
  return {
    userInput: getById("user-input"),
    userResult: getById("user-result"),
    decryptButton: getById("decrypt-button"),
    encryptButton: getById("encrypt-button"),
  };
}

function getEncryptRules() {
  return [
    { from: "e", to: "enter" },
    { from: "i", to: "imes" },
    { from: "a", to: "ai" },
    { from: "o", to: "ober" },
    { from: "u", to: "ufat" },
  ];
}

function encryptText(text) {
  return getEncryptRules().reduce((acum, rule) => {
    return acum.replaceAll(rule.from, rule.to);
  }, text);
}

function decryptText(text) {
  return getEncryptRules().reduce((acum, rule) => {
    return acum.replaceAll(rule.to, rule.from);
  }, text);
}

function validateText(text) {
  return [...text].every((letter) => /[a-z\s]/.test(letter));
}

function encryptHandler(references) {
  const original = getContent(references.userInput);

  const isValid = validateText(original);

  if (isValid) {
    references.userResult.value = encryptText(original);
  } else {
    references.userResult.value = "Solo letras minusculas y espacios";
  }

  // references.userInput.value = changed;
  // references.userResult.value = changed;
}

function decryptHandler(references) {
  const original = getContent(references.userInput);

  const isValid = validateText(original);
  if (isValid) {
    references.userResult.value = decryptText(original);
  } else {
    references.userResult.value = "Encriptado invalido";
  }
}

function addEvents(references) {
  references.encryptButton.addEventListener("click", () =>
    encryptHandler(references)
  );
  references.decryptButton.addEventListener("click", () =>
    decryptHandler(references)
  );
  // references.userInput.addEventListener("input", () =>
  //   // encryptHandler(references)
  //   decryptHandler(references)
  // );
}

// main function
function run() {
  const references = getReferences();
  addEvents(references);
  initialConfig(references);
}

document.addEventListener("DOMContentLoaded", run);
