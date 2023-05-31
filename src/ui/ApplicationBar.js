const ACTIVE = "active";

export default class ApplicationBar {

    #Buttons;
    #sectionElements;
    #activeIndex;
    #callbackFn;

    constructor(parentId, sections, callbackFn) {
        // sections - array of objects
        // {title: string, id: string}
        this.#callbackFn = callbackFn;
        this.#fillButtons(parentId, sections.map(s => s.title));
        this.#setSectionsElements(sections.map(s => s.id));
        this.#addListeners();
    }

    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t => `<button class="menu-button">${t}</button>`).join('');
        this.#Buttons = parentElement.childNodes;
    }

    #setSectionsElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    }

    #addListeners() {
        this.#Buttons.forEach((button, index) => button.addEventListener("click", this.#handler.bind(this, index)),)
    }

    async #handler(index) {

        if (this.#activeIndex == undefined || index != this.#activeIndex) {

            if (this.#activeIndex != undefined) {
                // this.#addStyle(this.#sectionElements[this.#activeIndex], 'none');
                this.#Buttons[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElements[this.#activeIndex].hidden = true;
            }

            await this.#callbackFn(index);

            this.#sectionElements[index].hidden = false;
            this.#Buttons[index].classList.add(ACTIVE);
            this.#activeIndex = index;
            // this.#addStyle(this.#sectionElements[index], 'flex');

        }

    }

    #addStyle(section, typeOfStyle) {
        section.style.display = typeOfStyle;
    }
}