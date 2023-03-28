import "./index.css";

import { Card } from "../scripts/card.js";
import { UserInfo } from "../scripts/userInfo";
import { Section } from "../scripts/section";

import { initialCards } from "../scripts/test_images.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { PopupWithForm } from "../scripts/popupWithForm";
import { PopupwithImage } from "../scripts/popupWithImage";

const buttonEdit = document.querySelector(".profile__edit-button");
const popupEditSelector = ".popup_type_edit";
const popupList = document.querySelectorAll(".popup");
const profileName = ".profile__name";
const profileProfession = ".profile__profession";
const nameJobForm = document.querySelector(".popup__form-container");
const nameInput = nameJobForm.querySelector(".popup__input_type_name");
const jobInput = nameJobForm.querySelector(".popup__input_type_job");
const elementsContainerSelector = ".elements__grid-table";
// КНОПКА ДОБАВИТЬ элемент
const buttonAdd = document.querySelector(".profile__add-button");
const popupNewCardSelector = ".popup_type_new-place";
const nameLinkForm = document
  .querySelector(popupNewCardSelector)
  .querySelector(".popup__form-container_type_new-place");
const cardNewName = nameLinkForm.querySelector(".popup__input_type_name");
const cardNewLink = nameLinkForm.querySelector(".popup__input_type_job");
// ПОПАП картинка
const imagePopupSelector = ".popup_type-image";
const imageBody = document
  .querySelector(imagePopupSelector)
  .querySelector(".popup__image");
const imageCaption = document
  .querySelector(imagePopupSelector)
  .querySelector(".popup__image-caption");
// ЗАКРЫТИЕ/ОТКРЫТИЕ ПОПАПОВ

const elementsTemplate = document
  .querySelector("#elements__template")
  .content.querySelector(".elements__grid-item");
const elementsTemplateSelector = "#elements__template";

const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileProfession,
});

const popupEdit = new PopupWithForm(popupEditSelector, {
  submitCallback: ({ name, job }) => {
    userInfo.setUserInfo({ name, info: job });
  },
});

const popupNewCard = new PopupWithForm(popupNewCardSelector, {
  submitCallback: ({ name, link }) => {
    cardsList.addItem(renderElement({ name, link }));
    addFormClear();
  },
});

const imagePopup = new PopupwithImage(imagePopupSelector);

popupEdit.setEventListeners();
popupNewCard.setEventListeners();
imagePopup.setEventListeners();

buttonEdit.addEventListener("click", () => {
  formJobValidator.resetValidation();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().info;
  popupEdit.open();
});

buttonAdd.addEventListener("click", () => {
  addFormClear();
  formLinkValidator.resetValidation();
  popupNewCard.open();
});

const addFormClear = () => {
  cardNewName.value = "";
  cardNewLink.value = "";
};

const renderElement = (obj) => {
  obj["selector"] = elementsTemplateSelector;
  const cardElement = new Card(obj, handleCardClick);
  const newCard = cardElement.createCard();
  return newCard;
};

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(renderElement(item));
    },
  },
  elementsContainerSelector
);

cardsList.render();

// Начало части "FormValidator"
// FormValidator Модуль

const validationData = {
  formSelector: ".popup__form-container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  // создать
  inputErrorClass: "popup__input_type_error",
  // красит в карсный цвет нижняя граница
  errorClass: "popup__error_visible",
  // класс делает ошибку видимой span
};

let formJobValidator = new FormValidator(validationData, nameJobForm);
formJobValidator.enableValidation();
let formLinkValidator = new FormValidator(validationData, nameLinkForm);
formLinkValidator.enableValidation();

// Конец части "FormValidator"
