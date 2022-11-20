const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const closeButton = editPopup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__form-container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');


// const newElement = elementsTemplate.querySelector(".elements__item").cloneNode(true);
function addElement(item) {
  newElement.querySelector(".elements__text").textContent = item.name;
  newElement.querySelector(".elements__image").src = item.link;
  return newElement;
}












const popupOpen = function () {
  editPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}

const popupClose = function() {
  editPopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const profession = jobInput.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;
  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
