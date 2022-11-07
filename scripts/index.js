const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupClose = popup.querySelector('.popup__close-button');

editButton.addEventListener('click', () => (
  popup.classList.add('popup_opened')
))

