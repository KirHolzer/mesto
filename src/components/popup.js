export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handlePopupCloseEsc = this._handlePopupCloseEsc.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handlePopupCloseEsc);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handlePopupCloseEsc);
  }

  _handlePopupCloseEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-button");
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup || evt.target === closeButton) {
        this.close();
      }
    });
  }
}
