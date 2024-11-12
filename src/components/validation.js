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
    const inputElements = Array.from(form.querySelectorAll(inputSelector));
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>
        isValid(form, inputElement, inputErrorClass, errorVisibleClass)
      );
    });
  });
  // const submitButton = form.querySelector(submitButtonSelector);
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

const clearValidation = () => {};

export { enableValidation };
