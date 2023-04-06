export class Card {
  #data;
  #name;
  #link;
  #likes;
  #_id;
  #owner;
  #user;
  #handleCardClick;
  #handleCardLike;
  #handleCardDelete;

  newElement;
  elementsTitle;
  elementsImage;
  buttonDelete;
  buttonLike;
  cardLikesCounter;

  #initClass(data, handleCardClick, handleCardLike, handleCardDelete, user) {
    this.#data = data;
    this.#likes = data.likes;
    this.#_id = data._id;
    this.#owner = data.owner;
    this.#user = user;
    this.#name = data.name;
    this.#link = data.link;
    this.elementsTemplate = document
      .querySelector(data.selector)
      .content.querySelector(".elements__grid-item");

    this.newElement = this.elementsTemplate.cloneNode(true);
    this.elementsTitle = this.newElement.querySelector(".elements__text");
    this.elementsImage = this.newElement.querySelector(".elements__image");
    this.buttonDelete = this.newElement.querySelector(
      ".elements__delete-button"
    );
    this.buttonLike = this.newElement.querySelector(".elements__like-reaction");
    this.cardLikesCounter = this.newElement.querySelector(".elements__likes");

    this.#handleCardClick = handleCardClick;
    this.#handleCardLike = handleCardLike;
    this.#handleCardDelete = handleCardDelete;
  }

  constructor(data, handleCardClick, handleCardLike, handleCardDelete, user) {
    if (!Object.keys(data).includes("name")) {
      console.log("Ошибка ввода данных - 'name' в классе 'card' не введено");
      return null;
    } else if (!Object.keys(data).includes("link")) {
      console.log("Ошибка ввода данных - 'link' в классе 'card' не введено");
      return null;
    } else if (!Object.keys(data).includes("selector")) {
      console.log(
        "Ошибка ввода данных - 'selector' в классе 'card' не введено"
      );
      return null;
    } else if (!Object.keys(data).includes("likes")) {
      console.log("Ошибка ввода данных - 'likes' в классе 'card' не введено");
      return null;
    } else if (!Object.keys(data).includes("_id")) {
      console.log("Ошибка ввода данных - 'id' в классе 'card' не введено");
      return null;
    } else if (!Object.keys(data).includes("owner")) {
      console.log("Ошибка ввода данных - 'owner' в классе 'card' не введено");
      return null;
    } else if (!handleCardLike) {
      console.log(
        "Ошибка ввода данных - 'handleCardLike' в классе 'card' не введено"
      );
      return null;
    } else if (!handleCardDelete) {
      console.log(
        "Ошибка ввода данных - 'handleCardDelete' в классе 'card' не введено"
      );
      return null;
    } else if (!handleCardClick) {
      console.log(
        "Ошибка ввода данных - 'handleCardClick' в классе 'card' не введено"
      );
      return null;
    } else if (!user) {
      console.log("Ошибка ввода данных - 'user' в классе 'card' не введено");
      return null;
    }
    this.#initClass(
      data,
      handleCardClick,
      handleCardLike,
      handleCardDelete,
      user
    );
  }

  #likeButtonHandler = function () {
    if (this.buttonLike.classList.contains("elements__like-reaction_active")) {
      this.#handleCardLike(true, this.#_id, this);
    } else {
      this.#handleCardLike(false, this.#_id, this);
    }
  };

  #deleteButtonHandler = function () {
    this.#handleCardDelete(this, this.#_id);
  };

  #setEventListeners() {
    this.buttonLike.addEventListener("click", () => this.#likeButtonHandler());

    this.buttonDelete.addEventListener("click", () =>
      this.#deleteButtonHandler()
    );

    this.elementsImage.addEventListener("click", () =>
      this.#handleCardClick(this.#name, this.#link)
    );
  }

  createCard() {
    this.elementsTitle.textContent = this.#name;
    this.elementsImage.src = this.#link;
    this.elementsImage.alt = this.#name;
    this.cardLikesCounter.textContent = this.#likes.length;
    this.#checkIfLikedByUser();
    this.#checkRemoveButtons();
    this.#setEventListeners();
    return this.newElement;
  }

  removeCard() {
    this.newElement.remove();
  }

  #checkIfLikedByUser() {
    if (this.#likes.some((like) => like._id === this.#user)) {
      this.buttonLike.classList.add("elements__like-reaction_active");
      return true;
    }
    return false;
  }

  #checkRemoveButtons() {
    if (!(this.#user === this.#owner._id)) {
      this.buttonDelete.remove();
    }
  }

  checkLikes(item) {
    this.#likes = item.likes;
    this.cardLikesCounter.textContent = item.likes.length;
    this.buttonLike.classList.toggle("elements__like-reaction_active");
  }
}
