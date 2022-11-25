const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__close-button');
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
const cardNewName= formNewElement.querySelector('.popup__input_type_name');
const cardNewLink = formNewElement.querySelector('.popup__input_type_job');
// ПОПАП картинка
const imagePopup = document.querySelector('.popup_type-image');
const imageBody = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__image-caption');
// ЗАКРЫТИЕ/ОТКРЫТИЕ ПОПАПОВ
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function(popup) { // popup in params
  popup.classList.remove('popup_opened');
}

const elementsTemplate = document.querySelector('#elements__template').content.querySelector('.elements__grid-item');

const generateElement = (element) => {
  const newElement = elementsTemplate.cloneNode(true);
  const elementsTitle = newElement.querySelector('.elements__text');
  const elementsImage = newElement.querySelector('.elements__image');
  const deleteButton = newElement.querySelector('.elements__delete-button');
  const likeButton = newElement.querySelector('.elements__like-reaction');

  elementsTitle.textContent = element.name;
  elementsImage.src = element.link;
  elementsImage.alt = element.name;

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('elements__like-reaction_active');
  });

  deleteButton.addEventListener('click', function () {
    newElement.remove();
  });

  elementsImage.addEventListener('click', function() {
    fillPopupImage(element);
    openPopup(imagePopup);
  });

  return newElement;
}
const fillPopupImage = function (element) {
  imageBody.src = element.link;
  imageBody.alt = `Изображение ${element.name}`;
  imageCaption.textContent = element.name;
}

const renderElement = (element) => {
  elementsContainer.prepend(generateElement(element));
}

initialCards.forEach((element)=> {
  renderElement(element);
})

const addFormClear = () => {
  cardNewName.value = "";
  cardNewLink.value = "";
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const profession = jobInput.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;

  closePopup(editPopup);
}
function formAddHandler (evt) {
  evt.preventDefault();

  const placeName = cardNewName.value;
  const placeLink = cardNewLink.value;

  renderElement({ name: `${placeName}`, link: `${placeLink}` });
  closePopup(popupNewCard);
  addFormClear();
}

formNewElement.addEventListener('submit', formAddHandler);
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', () => openPopup (editPopup));
addButton.addEventListener('click', () =>
  { addFormClear();
    openPopup(popupNewCard);
  });
imagePopup.addEventListener('click', closePopup);

closeButtons.forEach((closeButton) => closeButton.addEventListener('click', () => closePopup(closeButton.closest('.popup'))));

// closePopupAddButton.addEventListener('click', () => {
//   closePopup(); // TODO: вынести в отдельный метод
//   addFormClear();
// });
