const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const closeButton = editPopup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__form-container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const elementsContainer = document.querySelector('.elements__grid-table')

// КНОПКА ДОБАВИТЬ элемент
const addButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_type_new-place');
const addFormElement = addPlacePopup.querySelector('.form_type_new-place');
const addNameInput= addFormElement.querySelector('.popup__input_type_name');
const addLinkInput = addFormElement.querySelector('.popup__input_type_job');
const closePopupAddButton = addPlacePopup.querySelector('.popup__close-button');


// const newElement = elementsTemplate.querySelector(".elements__item").cloneNode(true);
// function addElement(item) {
//   newElement.querySelector(".elements__text").textContent = item.name;
//   newElement.querySelector(".elements__image").src = item.link;
//   return newElement;
// }



// ЗАКРЫТИЕ/ОТКРЫТИЕ ПОПАПОВ
const popupOpen = function () {
  editPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}
const popupClose = function() {
  editPopup.classList.remove('popup_opened');
}

function addPlacePopupOpen() {
  addPlacePopup.classList.add('popup_opened');
}
function addPlacePopupClose() {
  addPlacePopup.classList.remove("popup_opened");
}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// const elementsContainer = document.querySelector('.elements__grid-item');
const elementsTemplate = document.querySelector('#elements__template').content.querySelector('.elements__grid-item');
// const newElement = elementsTemplate.cloneNode(true);
// console.log (newElement);
// const elementsTitle = newElement.querySelector('.elements__text');
// const elementsImage = newElement.querySelector('.elements__image');

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
  elementsImage.addEventListener('click', function () {
    kkjdflgkjhsdlfkjghljkdfhglskjfgsdfghlskdjfhglksjdfhgljkshf
  })
  return newElement;
}
const renderElement = (element) => {
  elementsContainer.prepend(generateElement(element));
  // elementsContainer .prepend(generateElement(element));
}
initialCards.forEach((element)=> {
  renderElement(element);
})




function formSubmitHandler (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const profession = addLinkInput.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;
  popupClose();
}
function formAddHandler (evt) {
  evt.preventDefault();
  const placeName = addNameInput.value;
  const placeLink = addLinkInput.value;
  console.log(addLinkInput);
  renderElement({ name: `${placeName}`, link: `${placeLink}` });
  addPlacePopupClose();
}

addFormElement.addEventListener('submit', formAddHandler);
closePopupAddButton.addEventListener('click', addPlacePopupClose);
addButton.addEventListener('click',addPlacePopupOpen)
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
