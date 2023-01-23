const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const popupList = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__form-container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const elementsContainer = document.querySelector('.elements__grid-table');
// КНОПКА ДОБАВИТЬ элемент
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-place');
const formNewElement = popupNewCard.querySelector('.popup__form-container_type_new-place');
const cardNewName = formNewElement.querySelector('.popup__input_type_name');
const cardNewLink = formNewElement.querySelector('.popup__input_type_job');
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

// Начало части "Card"
// Card Модуль
import { Card, initialCards } from "./card.js";


const elementsTemplate = document.querySelector('#elements__template').content.querySelector('.elements__grid-item');
const elementsTemplateSelector = '#elements__template';

const renderElement = (element) => {
  element['selector'] = elementsTemplateSelector;
  elementsContainer.prepend(new Card(element).createCard());
}

initialCards.forEach((element) => {
  renderElement(element);
})

// Конец части "Card"

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

import { FormValidator } from "./FormValidator.js";

var form1Validator = new FormValidator(validationData, formElement);
form1Validator.enableValidation();
var form2Validator = new FormValidator(validationData, formNewElement);
form2Validator.enableValidation();

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
  closePopup(editPopup);
}
function addFormHandler(evt) {
  evt.preventDefault();

  const placeName = cardNewName.value;
  const placeLink = cardNewLink.value;

  renderElement({ name: `${placeName}`, link: `${placeLink}` });
  closePopup(popupNewCard);
  addFormClear();
}

formNewElement.addEventListener('submit', addFormHandler);
formElement.addEventListener('submit', submitFormHandler);

editButton.addEventListener('click', () => {
  form1Validator.resetErrors(editPopup, validationData);
  fillEditPopup();
  openPopup(editPopup);
});
addButton.addEventListener('click', () => {
  addFormClear();
  form2Validator.resetErrors(popupNewCard, validationData);
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


// closePopupAddButton.addEventListener('click', () => {
//   closePopup(); // TODO: вынести в отдельный метод
//   addFormClear();
// });
