const enableValidation = (
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorVisibleClass
) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const submitButton = form.querySelector(submitButtonSelector);
    const inputElements = Array.from(form.querySelectorAll(inputSelector));
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(form, inputElement, inputErrorClass, errorVisibleClass);
        toggleButtonState(inputElements, submitButton, inactiveButtonClass);
      });
    });
  });
};

const showInputError = (
  inputElement,
  inputErrorClass,
  errorElement,
  errorMessage,
  errorVisibleClass
) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorVisibleClass);
};

const hideInputError = (
  inputElement,
  inputErrorClass,
  errorElement,
  errorVisibleClass
) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorVisibleClass);
};

const isValid = (form, inputElement, inputErrorClass, errorVisibleClass) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.validationMessage;
    switch (true) {
      case inputElement.validity.patternMismatch:
        errorMessage = inputElement.dataset.errorPatternMismatchMessage;
        break;
      case inputElement.validity.valueMissing:
        errorMessage = inputElement.dataset.errorEmptyValueMessage;
    }
    showInputError(
      inputElement,
      inputErrorClass,
      errorElement,
      errorMessage,
      errorVisibleClass
    );
  } else {
    hideInputError(
      inputElement,
      inputErrorClass,
      errorElement,
      errorVisibleClass
    );
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    doButtonDisabled(buttonElement, inactiveButtonClass);
  } else {
    doButtonEnabled(buttonElement, inactiveButtonClass);
  }
};

const doButtonDisabled = (buttonElement, inactiveButtonClass) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
};

const doButtonEnabled = (buttonElement, inactiveButtonClass) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(inactiveButtonClass);
};

const clearValidation = (form, validationConfig) => {
  const inputElements = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = form.querySelector(
    validationConfig.buttonElementSelector
  );
  inputElements.forEach((inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    hideInputError(
      inputElement,
      validationConfig.inputErrorClass,
      errorElement,
      validationConfig.errorVisibleClass
    );
  });
  doButtonDisabled(buttonElement, validationConfig.inactiveButtonClass);
};

export { enableValidation, clearValidation };
