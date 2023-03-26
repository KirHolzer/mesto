export class PopupwithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popupElement.querySelector('.popup__image');
      this._popupCaption = this._popupElement.querySelector('.popup__caption');
    }
  
    open({name, link}) {
      this._popupImage.src = link;
      this._popupCaption.textContent = name;
      super.open();
    }
  }
  
  
