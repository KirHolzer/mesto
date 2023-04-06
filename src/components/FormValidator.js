export class FormValidator {
    #validationData;
    #element;
    #inputList;
    #buttonElement;

    #initClass(params, element){
        this.#validationData = params;
        this.#element = element;
        this.#inputList = Array.from(this.#element.querySelectorAll(this.#validationData.inputSelector));
        this.#buttonElement = this.#element.querySelector(this.#validationData.submitButtonSelector);
    }

    constructor(params, element)
    {
        if (!(Object.keys(params).includes("formSelector"))){
            console.log("Ошибка ввода данных - 'formSelector' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(params).includes("inputSelector"))){
            console.log("Ошибка ввода данных - 'inputSelector' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(params).includes("submitButtonSelector"))){
            console.log("Ошибка ввода данных - 'submitButtonSelector' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(params).includes("inactiveButtonClass"))){
            console.log("Ошибка ввода данных - 'inactiveButtonClass' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(params).includes("inputErrorClass"))){
            console.log("Ошибка ввода данных - 'inputErrorClass' в классе 'FormValidator' не введено");
            return null;
        }else if (!(Object.keys(params).includes("errorClass"))){
            console.log("Ошибка ввода данных - 'errorClass' в классе 'FormValidator' не введено");
            return null;
        }

        this.#initClass(params, element);

    }

    #showInputError (inputElement, errorMessage) {
        const errorElement = this.#element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.#validationData.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.#validationData.errorClass);
      };



    #hideInputError (inputElement) {
        const errorElement = this.#element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.#validationData.inputErrorClass);
        errorElement.classList.remove(this.#validationData.errorClass);
        errorElement.textContent = '';
      };

    #checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
          this.#showInputError(inputElement, inputElement.validationMessage);
        } else {
          this.#hideInputError(inputElement);
        }
      };

    #disableButton() {
        this.#buttonElement.classList.add(this.#validationData.inactiveButtonClass);
        this.#buttonElement.disabled = true;
      }

    #hasInvalidInput() {
        return this.#inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }

    #toggleButtonState() {
        if (this.#hasInvalidInput()) {
          this.#disableButton();
        }
        else {
          this.#buttonElement.classList.remove(this.#validationData.inactiveButtonClass);
          this.#buttonElement.disabled = false;
        }
      }

    #checkInputList(inputElement){
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
    }

    #setEventListeners (){
        this.#toggleButtonState();
        
        this.#inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => this.#checkInputList(inputElement));
        });
      };

    resetValidation() {
        this.#inputList.forEach(input => {this.#hideInputError(input);});
        this.#disableButton();
      }

    enableValidation (){
        // this.#element.addEventListener('submit', function (evt) { evt.preventDefault(); });
        this.#setEventListeners();
    };
}