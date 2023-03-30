import "./index.css";

import { Card } from "../scripts/card.js";
import { UserInfo } from "../scripts/userInfo";
import { Section } from "../scripts/section";
import { FormValidator } from "../scripts/FormValidator.js";
import { PopupWithForm } from "../scripts/popupWithForm";
import { PopupwithImage } from "../scripts/popupWithImage";

import {
  validationData,
  initialCards,
  elementsTemplateSelector,
  imagePopupSelector,
  buttonEdit,
  popupEditSelector,
  profileName,
  profileProfession,
  nameJobForm,
  nameInput,
  jobInput,
  elementsContainerSelector,
  buttonAdd,
  popupNewCardSelector,
  nameLinkForm,
} from "../utils/constants";

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
  formLinkValidator.resetValidation();
  popupNewCard.open();
});

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

const formJobValidator = new FormValidator(validationData, nameJobForm);
formJobValidator.enableValidation();
const formLinkValidator = new FormValidator(validationData, nameLinkForm);
formLinkValidator.enableValidation();

// Конец части "FormValidator"
