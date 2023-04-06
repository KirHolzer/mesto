import "./index.css";

import Api from "../components/api";
import { Card } from "../components/card.js";
import { UserInfo } from "../components/userInfo";
import { Section } from "../components/section";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/popupWithForm";
import { PopupwithImage } from "../components/popupWithImage";
import { PopupWithConfirm} from "../components/popupWithConfirm";

import {
  validationData,
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
  avatarSelector,
  buttonAvatar,
  popupAvatarSelector,
  popupDeleteSelector,
  avatarLinkForm,
} from "../utils/constants";

const formJobValidator = new FormValidator(validationData, nameJobForm);
formJobValidator.enableValidation();
const formLinkValidator = new FormValidator(validationData, nameLinkForm);
formLinkValidator.enableValidation();
const formAvatarValidator = new FormValidator(validationData, avatarLinkForm);
formAvatarValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileProfession,
  avatarSelector: avatarSelector,
});

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "e4e17742-217d-4b1e-9a10-af4edab6fd5e",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([newUser, initialCards]) => {
    userInfo.setUserInfo({
      name: newUser.name,
      info: newUser.about,
      avatar: newUser.avatar,
      id: newUser._id,
    });
    cardsList.render(initialCards.reverse());
  })
  .catch((err) => console.log(err));

const popupEdit = new PopupWithForm(popupEditSelector, {
  submitCallback: ({ name, job }) => {
    popupEdit.setLoading(true);
    api
      .editProfile({ name, about: job })
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          info: data.about,
          avatar: data.avatar,
          id: data._id,
        });
        popupEdit.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupEdit.setLoading(false);
      });
  },
});

const popupNewCard = new PopupWithForm(popupNewCardSelector, {
  submitCallback: ({ name, link }) => {
    popupNewCard.setLoading(true);
    api
      .createNewCard({ name, link })
      .then((data) => {
        cardsList.addItem(renderElement(data, data.owner._id));
        popupNewCard.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupNewCard.setLoading(false);
      });
  },
});

const imagePopup = new PopupwithImage(imagePopupSelector);

const popupAvatar = new PopupWithForm(popupAvatarSelector, {
  submitCallback: (avatar) => {
    popupAvatar.setLoading(true);
    api
      .updateAvatar(avatar)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          info: data.about,
          avatar: data.avatar,
          id: data._id,
        });
        popupAvatar.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupAvatar.setLoading(false);
      });
  },
});

const popupConfirm = new PopupWithConfirm(popupDeleteSelector);

popupEdit.setEventListeners();
popupNewCard.setEventListeners();
imagePopup.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();

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

buttonAvatar.addEventListener("click", () => {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
});

const renderElement = (obj, user) => {
  obj["selector"] = elementsTemplateSelector;
  const cardElement = new Card(
    obj,
    handleCardClick,
    handleCardLike,
    handleCardDelete,
    user
  );
  const newCard = cardElement.createCard();
  return newCard;
};

const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};

const handleCardDelete = (card, cardId) => {
  popupConfirm.open();
  popupConfirm.handleConfirm(() => {
    popupConfirm.setLoading(true);
    api
      .removeExistingCard(cardId)
      .then((res) => {
        card.removeCard();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupConfirm.close();
        popupConfirm.setLoading(false);
      });
  });
};

const handleCardLike = (isCardLiked, cardId, card) => {
  isCardLiked
    ? api
        .removeLike(cardId)
        .then((response) => {
          card.checkLikes(response);
        })
        .catch((error) => console.log(error))
    : api
        .putLike(cardId)
        .then((response) => {
          card.checkLikes(response);
        })
        .catch((error) => console.log(error));
};
const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(renderElement(item, userInfo.getUserInfo().id));
    },
  },
  elementsContainerSelector
);

cardsList.render();
