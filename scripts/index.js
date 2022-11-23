const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const closeButton = editPopup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__form-container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const elementsContainer = document.querySelector('.elements__grid-table');
// КНОПКА ДОБАВИТЬ элемент
const addButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_type_new-place');
const addFormElement = addPlacePopup.querySelector('.popup__form-container_type_new-place');
const addNameInput= addFormElement.querySelector('.popup__input_type_name');
const addLinkInput = addFormElement.querySelector('.popup__input_type_job');
const closePopupAddButton = addPlacePopup.querySelector('.popup__close-button');
// ПОПАП картинка
const imagePopup = document.querySelector('.popup_type-image');
const imageBody = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__image-caption');

// ЗАКРЫТИЕ/ОТКРЫТИЕ ПОПАПОВ

const openPopup = function () {
  editPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}

const closePopup = function() { // popup in params
  // popup.classList.remove('popup_opened');
  editPopup.classList.remove('popup_opened');
  imagePopup.classList.remove('popup_opened');
  addPlacePopup.classList.remove("popup_opened");
}
// closePopup(editPopup)
function addPlacePopupOpen() {
  addPlacePopup.classList.add('popup_opened');
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

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('elements__like-reaction_active');
  });

  deleteButton.addEventListener('click', function () {
    newElement.remove();
  });

  elementsImage.addEventListener('click', function() {
    popupOpenImage(element);
  });

  return newElement;
}
const popupOpenImage = function (element) {
  imageBody.src = element.link;
  imageCaption.textContent = element.name;
  imagePopup.classList.add('popup_opened');
}

const renderElement = (element) => {
  elementsContainer.prepend(generateElement(element));
}

initialCards.forEach((element)=> {
  renderElement(element);
})

const addFormClear = () => {
  addNameInput.value = "";
  addLinkInput.value = "";
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const profession = jobInput.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;

  closePopup();
}
function formAddHandler (evt) {
  evt.preventDefault();

  const placeName = addNameInput.value;
  const placeLink = addLinkInput.value;

  renderElement({ name: `${placeName}`, link: `${placeLink}` });
  closePopup();
  addFormClear();
}

addFormElement.addEventListener('submit', formAddHandler);
closePopupAddButton.addEventListener('click', () => {
  closePopup(); // TODO: вынести в отдельный метод
  addFormClear();
});
addButton.addEventListener('click',addPlacePopupOpen);
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', () => {
  closePopup();
  addFormClear();
});
imagePopup.addEventListener('click', closePopup);
