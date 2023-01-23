// ЗАКРЫТИЕ/ОТКРЫТИЕ ПОПАПОВ
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handlePopupCloseEsc);
  }
  
  const closePopup = function (popup) { // popup in params
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlePopupCloseEsc);
  }
  
  const handlePopupCloseEsc = function (evt) {
    if (evt.key === "Escape") {
      closePopup(document.querySelector('.popup_opened'));
    }
  }
  
export class Card {
    #name;
    #link;
    #selector;

    imagePopup;
    imageBody;
    imageCaption;

    newElement;
    elementsTitle;
    elementsImage;
    deleteButton; 
    likeButton;

    #initClass(data){
        this.#name = data.name;
        this.#link = data.link;
        this.#selector = data.selector;
        this.elementsTemplate = document.querySelector(data.selector).content.querySelector('.elements__grid-item');

        // ПОПАП картинка
        this.imagePopup = document.querySelector('.popup_type-image');
        this.imageBody = this.imagePopup.querySelector('.popup__image');
        this.imageCaption = this.imagePopup.querySelector('.popup__image-caption');

        this.newElement = this.elementsTemplate.cloneNode(true);
        this.elementsTitle = this.newElement.querySelector('.elements__text');
        this.elementsImage = this.newElement.querySelector('.elements__image');
        this.deleteButton = this.newElement.querySelector('.elements__delete-button');
        this.likeButton = this.newElement.querySelector('.elements__like-reaction');
    }

    constructor(data){
        if (!(Object.keys(data).includes("name"))){
            console.log("Ошибка ввода данных - 'name' в классе 'card' не введено");
            return null;
        } else if (!(Object.keys(data).includes("link"))){
            console.log("Ошибка ввода данных - 'link' в классе 'card' не введено");
            return null;
        } else if (!(Object.keys(data).includes("selector"))){
            console.log("Ошибка ввода данных - 'selector' в классе 'card' не введено");
            return null;
        }

        this.#initClass(data);
    }

    #fillPopupImage () {
        this.imageBody.src = this.#link;
        this.imageBody.alt = `Изображение ${this.#name}`;
        this.imageCaption.textContent = this.#name;
      }

    #likeButtonHandler = function (){
        this.likeButton.classList.toggle('elements__like-reaction_active');
    }

    #deleteButtonHandler = function (){
        this.newElement.remove();
    }

    #popUpHandler = function (){
        this.#fillPopupImage();
        openPopup(this.imagePopup);
    }

    createCard (){
        this.elementsTitle.textContent = this.#name;
        this.elementsImage.src = this.#link;
        this.elementsImage.alt = this.#name;
      
        this.likeButton.addEventListener('click', () => this.#likeButtonHandler());
      
        this.deleteButton.addEventListener('click', () => this.#deleteButtonHandler());
      
        this.elementsImage.addEventListener('click', () => this.#popUpHandler());

        this.imagePopup.addEventListener('click', closePopup);
      
        return this.newElement;
      }

}

// для тестирования
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
  ];
  