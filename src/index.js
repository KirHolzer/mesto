import "@babel/polyfill";
import './index.html';
import './blocks/button/button.css';
import './blocks/content/content.css';
import './blocks/elements/elements.css';
import './blocks/elements/__delete-button/elements__delete-button.css';
import './blocks/elements/__grid-item/elements__grid-item.css';
import './blocks/elements/__grid-table/elements__grid-table.css';
import './blocks/elements/__image/elements__image.css';
import './blocks/elements/__image-box/elements__image-box.css';
import './blocks/elements/__info-box/elements__info-box.css';
import './blocks/elements/__like-reaction/elements__like-reaction.css';
import './blocks/elements/__text/elements__text.css';
import './blocks/footer/footer.css';
import './blocks/footer/__copyright/footer__copyright.css';
import './blocks/header/__logo/header__logo.css';
import './blocks/header/header.css';
import './blocks/list/list.css';
import './blocks/page/page.css';
import './blocks/popup/__close-button/popup__close-button.css';
import './blocks/popup/__content/popup__content.css';
import './blocks/popup/__error/popup__error.css';
import './blocks/popup/__form-container/popup__form-container.css';
import './blocks/popup/__image/popup__image.css';
import './blocks/popup/__image-caption/popup__image-caption.css';
import './blocks/popup/__image-container/popup__image-container.css';
import './blocks/popup/__input/popup__input.css';
import './blocks/popup/__save-button/popup__save-button.css';
import './blocks/popup/__title/popup__title.css';
import './blocks/popup/_opened/popup_opened.css';
import './blocks/popup/_type/popup_type-image.css';

import './blocks/popup/popup.css';
import './blocks/profile/profile.css';
import './blocks/profile/__avatar/profile__avatar.css';
import './blocks/profile/__edit-button/profile__edit-button.css';
import './blocks/profile/__info/profile__info.css';
import './blocks/profile/__name/profile__name.css';
import './blocks/profile/__profession/profile__profession.css';
import './blocks/profile/__title-container/profile__title-container.css';
import './blocks/profile/__add-button/profile__add-button.css';
import { Card }  from "./scripts/card.js";
// import { PopupWithForm }  from "./popupWithForm.js";
// import { PopupwithImage }  from "./PopupwithImage.js";
// import { Section }  from "./section.js";
// import { UserInfo }  from "./userInfo.js";
// для тестирования
import { initialCards } from "./scripts/test_images.js"
import { FormValidator } from "./scripts/FormValidator.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupList = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameJobForm = document.querySelector('.popup__form-container');
const nameInput = nameJobForm.querySelector('.popup__input_type_name');
const jobInput = nameJobForm.querySelector('.popup__input_type_job');
const elementsContainer = document.querySelector('.elements__grid-table');
// КНОПКА ДОБАВИТЬ элемент
const buttonAdd = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-place');
const nameLinkForm = popupNewCard.querySelector('.popup__form-container_type_new-place');
const cardNewName = nameLinkForm.querySelector('.popup__input_type_name');
const cardNewLink = nameLinkForm.querySelector('.popup__input_type_job');
// ПОПАП картинка
export const imagePopup = document.querySelector('.popup_type-image');
const imageBody = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__image-caption');
// ЗАКРЫТИЕ/ОТКРЫТИЕ ПОПАПОВ
export const openPopup = function (popup) {
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

export const fillPopupImage = function (element) {
  imageBody.src = element.link;
  imageBody.alt = `Изображение ${element.name}`;
  imageCaption.textContent = element.name;
}


const elementsTemplate = document.querySelector('#elements__template').content.querySelector('.elements__grid-item');
const elementsTemplateSelector = '#elements__template';

const renderElement = (obj) => {
  obj['selector'] = elementsTemplateSelector;
  const cardElement = new Card(obj)
  elementsContainer.prepend(cardElement.createCard());
}

imagePopup.addEventListener('click', closePopup);

initialCards.forEach((element) => {
  renderElement(element);
})

// Начало части "FormValidator"
// FormValidator Модуль

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

let formJobValidator = new FormValidator(validationData, nameJobForm);
formJobValidator.enableValidation();
let formLinkValidator = new FormValidator(validationData, nameLinkForm);
formLinkValidator.enableValidation();

// Конец части "FormValidator"

const addFormClear = () => {
  cardNewName.value = "";
  cardNewLink.value = "";
};

const fillEditPopup = function (){
  const name = profileName.textContent
  const profession = profileProfession.textContent
  nameInput.value = name;
  jobInput.value = profession;
}

function submitFormHandler(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const profession = jobInput.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;
  closePopup(popupEdit);
}
function addFormHandler(evt) {
  evt.preventDefault();

  const placeName = cardNewName.value;
  const placeLink = cardNewLink.value;

  renderElement({ name: `${placeName}`, link: `${placeLink}` });
  closePopup(popupNewCard);
  addFormClear();
}

nameLinkForm.addEventListener('submit', addFormHandler);
nameJobForm.addEventListener('submit', submitFormHandler);

buttonEdit.addEventListener('click', () => {
  formJobValidator.resetValidation();
  fillEditPopup();
  openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => {
  addFormClear();
  formLinkValidator.resetValidation();
  openPopup(popupNewCard);
});

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  }
  )
});
