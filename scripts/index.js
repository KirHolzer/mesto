const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const CloseButton = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');



editButton.addEventListener('click', () => (
  popup.classList.add('popup_opened')
))


CloseButton.addEventListener('click', () => (
  popup.classList.remove('popup_opened')
))

function popupClose () {
  popup.classList.remove('popup_opened');
}

let formElement = document.querySelector('.popup__form-container');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-job');


function formSubmitHandler (evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let profession = jobInput.value;
  profileName.textContent = name;
  profileProfession.textContent = profession;
  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);

