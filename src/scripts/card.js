export class Card {
  #data;
  #name;
  #link;
  #handleCardClick;

  newElement;
  elementsTitle;
  elementsImage;
  buttonDelete;
  buttonLike;

  #initClass(data, handleCardClick) {
    this.#data = data;
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
    this.#handleCardClick = handleCardClick;
  }

  constructor(data, handleCardClick) {
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
    } else if (!handleCardClick) {
      console.log(
        "Ошибка ввода данных - 'handleCardClick' в классе 'card' не введено"
      );
      return null;
    }
    this.#initClass(data, handleCardClick);
  }

  #likeButtonHandler = function () {
    this.buttonLike.classList.toggle("elements__like-reaction_active");
  };

  #deleteButtonHandler = function () {
    this.newElement.remove();
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
    this.#setEventListeners();
    return this.newElement;
  }
}
