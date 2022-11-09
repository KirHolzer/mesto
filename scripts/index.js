const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const CloseButton = popup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__form-container');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');

editButton.addEventListener('click', () => (
  popup.classList.add('popup_opened')
))

CloseButton.addEventListener('click', () => popup.classList.remove('popup_opened'));

function popupClose () {
  popup.classList.remove('popup_opened');
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

