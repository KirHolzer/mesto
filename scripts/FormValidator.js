export class FormValidator {
    #validationData;
    #element;

    #initClass(validationData, element){
        this.#validationData = validationData;
        this.#element = element;
    }

    constructor(validationData, element)
    {
        if (!(Object.keys(validationData).includes("formSelector"))){
            console.log("Ошибка ввода данных - 'formSelector' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(validationData).includes("inputSelector"))){
            console.log("Ошибка ввода данных - 'inputSelector' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(validationData).includes("submitButtonSelector"))){
            console.log("Ошибка ввода данных - 'submitButtonSelector' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(validationData).includes("inactiveButtonClass"))){
            console.log("Ошибка ввода данных - 'inactiveButtonClass' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(validationData).includes("inputErrorClass"))){
            console.log("Ошибка ввода данных - 'inputErrorClass' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(validationData).includes("errorClass"))){
            console.log("Ошибка ввода данных - 'errorClass' в классе 'FormValidator' не введено");
            return null;
        }

        this.#initClass(validationData, element);

    }

    #showInputError (inputElement, errorMessage) {
        const errorElement = this.#element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.#validationData.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.#validationData.errorClass);
      };



    #hideInputError (formElement, inputElement, validationData) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(validationData.inputErrorClass);
        errorElement.classList.remove(validationData.errorClass);
        errorElement.textContent = '';
      };

    #checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
          this.#showInputError(inputElement, inputElement.validationMessage);
        } else {
          this.#hideInputError(this.#element, inputElement, this.#validationData);
        }
      };

    #disableButton(buttonElement) {
        buttonElement.classList.add(this.#validationData.inactiveButtonClass);
        buttonElement.disabled = true;
      }

    #hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }

    #toggleButtonState(inputList, buttonElement) {
        if (this.#hasInvalidInput(inputList)) {
          this.#disableButton(buttonElement);
        }
        else {
          buttonElement.classList.remove(this.#validationData.inactiveButtonClass);
          buttonElement.disabled = false;
        }
      }

    #checkInputList(inputElement, inputList, buttonElement){
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState(inputList, buttonElement);
    }

    #setEventListeners (){
        const inputList = Array.from(this.#element.querySelectorAll(this.#validationData.inputSelector));
        const buttonElement = this.#element.querySelector(this.#validationData.submitButtonSelector);
      
        this.#toggleButtonState(inputList, buttonElement);
        
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => this.#checkInputList(inputElement, inputList, buttonElement));
        });
      };

    resetErrors(popup, validationData) {
        const popupForm = popup.querySelector(validationData.formSelector);
        // const popupForm = popup.querySelector('.popup__form-container');
        Array.from(popupForm.querySelectorAll(validationData.inputSelector)).forEach(input => {
          this.#hideInputError(popupForm, input, validationData);
        });
      }

    enableValidation (){
        this.#element.addEventListener('submit', function (evt) { evt.preventDefault(); });
        this.#setEventListeners();
    };
}