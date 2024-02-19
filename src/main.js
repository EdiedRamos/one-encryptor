const MESSAGES = {
  INVALID_TEXT: "Solo letras minúsculas y sin acentos",
  INVALID_ENCRYPT: "Encriptado inválido",
};

function timeoutHandler(time) {
  let timeoutId = null;
  return (callback) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback();
    }, time);
  };
}

function getById(id) {
  return document.getElementById(id);
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
    copyButton: getById("copy-button"),
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
  return !/[^a-z\d\s]/.test(text);
}

function encryptHandler(references) {
  const original = getContent(references.userInput);

  const isValid = validateText(original);

  if (isValid) {
    references.userResult.value = encryptText(original);
  } else {
    references.userResult.value = MESSAGES.INVALID_TEXT;
  }
}

function decryptHandler(references) {
  const original = getContent(references.userInput);

  const isValid = validateText(original);
  if (isValid) {
    references.userResult.value = decryptText(original);
  } else {
    references.userResult.value = MESSAGES.INVALID_ENCRYPT;
  }
}

function addEvents(references) {
  const eventsTimeoutHandler = timeoutHandler(1000);

  references.encryptButton.addEventListener("click", () =>
    encryptHandler(references)
  );
  references.decryptButton.addEventListener("click", () =>
    decryptHandler(references)
  );
  references.copyButton.addEventListener("click", () => {
    navigator.clipboard
      .writeText(getContent(references.userResult))
      .then(() => {
        references.userResult.classList.add("success-state");
        eventsTimeoutHandler(() =>
          references.userResult.classList.remove("success-state")
        );
      });
  });
}

// main function
function run() {
  const references = getReferences();
  addEvents(references);
}

document.addEventListener("DOMContentLoaded", run);
