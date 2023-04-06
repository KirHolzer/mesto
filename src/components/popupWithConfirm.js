import Popup from "./popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__save-button");
    this.__buttonInitialText = this._button.textContent;
  }

  handleConfirm(removeCardClb) {
    this._confirmRmv = removeCardClb;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._confirmRmv();
    });
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = this.__buttonInitialText;
    }
  }
}
