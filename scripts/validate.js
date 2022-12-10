const validationData = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  // создать
  inputErrorClass: 'popup__input_type_error',
  // красит в карсный цвет нижняя граница
  errorClass: 'popup__error_visible'
  // класс делает ошибку видимой span
};

const showInputError = (formElement, inputElement, errorMessage, validationData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationData.errorClass);
};

const hideInputError = (formElement, inputElement, validationData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationData.inputErrorClass);
  errorElement.classList.remove(validationData.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationData);
  } else {
    hideInputError(formElement, inputElement, validationData);
  }
};

const setEventListeners = (formElement, validationData) => {
  const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));
  const buttonElement = formElement.querySelector(validationData.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationData);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationData);
      toggleButtonState(inputList, buttonElement, validationData);
    });
  });
};

const enableValidation = (validationData) => {
  const formList = Array.from(document.querySelectorAll(validationData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationData)
  });
};

enableValidation(validationData);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationData) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationData);
  }
  else {
    buttonElement.classList.remove(validationData.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function disableButton(buttonElement, validationData) {
  buttonElement.classList.add(validationData.inactiveButtonClass);
  buttonElement.disabled = true;
}

function resetErrors(popup, validationData) {
  const popupForm = popup.querySelector(validationData.formSelector);
  // const popupForm = popup.querySelector('.popup__form-container');
  Array.from(popupForm.querySelectorAll(validationData.inputSelector)).forEach(input => {
    hideInputError(popupForm, input, validationData);
  });
}



