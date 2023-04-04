export const validationData = {
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

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const elementsTemplateSelector = "#elements__template";

export const imagePopupSelector = ".popup_type-image";

export const buttonEdit = document.querySelector(".profile__edit-button");
export const popupEditSelector = ".popup_type_edit";
export const profileName = ".profile__name";
export const profileProfession = ".profile__profession";
export const nameJobForm = document.querySelector(".popup__form-container");
export const nameInput = nameJobForm.querySelector(".popup__input_type_name");
export const jobInput = nameJobForm.querySelector(".popup__input_type_job");
export const elementsContainerSelector = ".elements__grid-table";
export const buttonAdd = document.querySelector(".profile__add-button");
export const popupNewCardSelector = ".popup_type_new-place";
export const nameLinkForm = document
  .querySelector(popupNewCardSelector)
  .querySelector(".popup__form-container_type_new-place");

export const avatarSelector = ".profile__avatar";
export const buttonAvatar = document.querySelector(".profile__avatar-button");
export const popupAvatarSelector = ".popup_type_new-avatar";
export const popupDeleteSelector = ".popup_type_delete-card";
export const avatarLinkForm = document
  .querySelector(popupAvatarSelector)
  .querySelector(".popup__form-container_type_avatar");
