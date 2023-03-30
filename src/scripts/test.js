// const buttonEdit = document.querySelector('.profile__edit-button');
// const popupEdit = document.querySelector('.popup_type_edit');
// const popupList = document.querySelectorAll('.popup');
// const profileName = document.querySelector('.profile__name');
// const profileProfession = document.querySelector('.profile__profession');
// const nameJobForm = document.querySelector('.popup__form-container');
// const nameInput = nameJobForm.querySelector('.popup__input_type_name');
// const jobInput = nameJobForm.querySelector('.popup__input_type_job');
// const elementsContainer = document.querySelector('.elements__grid-table');
// // КНОПКА ДОБАВИТЬ элемент
// const buttonAdd = document.querySelector('.profile__add-button');
// const popupNewCard = document.querySelector('.popup_type_new-place');
// const nameLinkForm = popupNewCard.querySelector('.popup__form-container_type_new-place');
// const cardNewName = nameLinkForm.querySelector('.popup__input_type_name');
// const cardNewLink = nameLinkForm.querySelector('.popup__input_type_job');
// // ПОПАП картинка
// export const imagePopup = document.querySelector('.popup_type-image');
// const imageBody = imagePopup.querySelector('.popup__image');
// const imageCaption = imagePopup.querySelector('.popup__image-caption');
// // ЗАКРЫТИЕ/ОТКРЫТИЕ ПОПАПОВ
// export const openPopup = function (popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handlePopupCloseEsc);
// }

// const closePopup = function (popup) { // popup in params
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handlePopupCloseEsc);
// }

// const handlePopupCloseEsc = function (evt) {
//   if (evt.key === "Escape") {
//     closePopup(document.querySelector('.popup_opened'));
//   }
// }

// export const fillPopupImage = function (element) {
//   imageBody.src = element.link;
//   imageBody.alt = `Изображение ${element.name}`;
//   imageCaption.textContent = element.name;
// }

// const elementsTemplate = document.querySelector('#elements__template').content.querySelector('.elements__grid-item');
// const elementsTemplateSelector = '#elements__template';

// // const renderElement = (obj) => {
// //   obj['selector'] = elementsTemplateSelector;
// //   const cardElement = new Card(obj)
// //   elementsContainer.prepend(cardElement.createCard());
// // }

// imagePopup.addEventListener('click', closePopup);

// // initialCards.forEach((element) => {
// //   renderElement(element);
// // })

// // Начало части "FormValidator"
// // FormValidator Модуль

// const validationData = {
//   formSelector: '.popup__form-container',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   // создать
//   inputErrorClass: 'popup__input_type_error',
//   // красит в карсный цвет нижняя граница
//   errorClass: 'popup__error_visible'
//   // класс делает ошибку видимой span
// };

// // let formJobValidator = new FormValidator(validationData, nameJobForm);
// // formJobValidator.enableValidation();
// // let formLinkValidator = new FormValidator(validationData, nameLinkForm);
// // formLinkValidator.enableValidation();

// // Конец части "FormValidator"

// const addFormClear = () => {
//   cardNewName.value = "";
//   cardNewLink.value = "";
// };

// const fillEditPopup = function (){
//   const name = profileName.textContent
//   const profession = profileProfession.textContent
//   nameInput.value = name;
//   jobInput.value = profession;
// }

// function submitFormHandler(evt) {
//   evt.preventDefault();
//   const name = nameInput.value;
//   const profession = jobInput.value;
//   profileName.textContent = name;
//   profileProfession.textContent = profession;
//   closePopup(popupEdit);
// }
// function addFormHandler(evt) {
//   evt.preventDefault();

//   const placeName = cardNewName.value;
//   const placeLink = cardNewLink.value;

//   renderElement({ name: `${placeName}`, link: `${placeLink}` });
//   closePopup(popupNewCard);
//   addFormClear();
// }

// nameLinkForm.addEventListener('submit', addFormHandler);
// nameJobForm.addEventListener('submit', submitFormHandler);

// buttonEdit.addEventListener('click', () => {
//   formJobValidator.resetValidation();
//   fillEditPopup();
//   openPopup(popupEdit);
// });
// buttonAdd.addEventListener('click', () => {
//   addFormClear();
//   formLinkValidator.resetValidation();
//   openPopup(popupNewCard);
// });

// popupList.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//   }
//   )
// });
