import Popup from "./popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector(".popup__form-container");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._button = this._formElement.querySelector(".popup__save-button");
    this._buttonInitialText = this._button.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = this._buttonInitialText;
    }
  }
}
