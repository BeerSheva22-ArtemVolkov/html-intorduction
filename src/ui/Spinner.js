export default class Spinner {

    #parentId
    #newDiv
    #childCollection

    constructor(parentId) {
        this.#parentId = parentId;
        this.#newDiv = document.createElement("div");
        this.#childCollection = document.getElementById(this.#parentId).children;
    }

    start() {
        this.#newDiv.classList.add("loader");
        this.#setDisplay('none');
        document.getElementById(this.#parentId).appendChild(this.#newDiv);
    }

    stop() {
        document.getElementById(this.#parentId).removeChild(this.#newDiv);
        this.#setDisplay('block');
    }

    #setDisplay(displayType){
        for (let i = 0; i < this.#childCollection.length; i++) {
            this.#childCollection[i].style.display = displayType;
        }
    }
}