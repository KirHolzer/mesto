export class Card {
    #data;
    #name;
    #link;
    
    newElement;
    elementsTitle;
    elementsImage;
    buttonDelete; 
    buttonLike;

    #initClass(data){
        this.#data = data;
        this.#name = data.name;
        this.#link = data.link;
        this.elementsTemplate = document.querySelector(data.selector).content.querySelector('.elements__grid-item');

        this.newElement = this.elementsTemplate.cloneNode(true);
        this.elementsTitle = this.newElement.querySelector('.elements__text');
        this.elementsImage = this.newElement.querySelector('.elements__image');
        this.buttonDelete = this.newElement.querySelector('.elements__delete-button');
        this.buttonLike = this.newElement.querySelector('.elements__like-reaction');
    }

    constructor(data){
        if (!(Object.keys(data).includes("name"))){
            console.log("Ошибка ввода данных - 'name' в классе 'card' не введено");
            return null;
        } else if (!(Object.keys(data).includes("link"))){
            console.log("Ошибка ввода данных - 'link' в классе 'card' не введено");
            return null;
        } else if (!(Object.keys(data).includes("selector"))){
            console.log("Ошибка ввода данных - 'selector' в классе 'card' не введено");
            return null;
        }

        this.#initClass(data);
    }

    #likeButtonHandler = function (){
        this.buttonLike.classList.toggle('elements__like-reaction_active');
    }

    #deleteButtonHandler = function (){
        this.newElement.remove();
    }

    #addPopupListner = function (imported) {
        imported.fillPopupImage(this.#data);
        imported.openPopup(imported.imagePopup);
    }
    
    createCard (){
        this.elementsTitle.textContent = this.#name;
        this.elementsImage.src = this.#link;
        this.elementsImage.alt = this.#name;
      
        this.buttonLike.addEventListener('click', () => this.#likeButtonHandler());
      
        this.buttonDelete.addEventListener('click', () => this.#deleteButtonHandler());
        import('../index.js').then((imported) => {
            this.elementsImage.addEventListener('click', () => this.#addPopupListner(imported));
        });
      
        return this.newElement;
      }

}