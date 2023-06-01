export default class SubmitForm {

    #dataObj;
    #formElement;
    #params;
    #parentElement;

    constructor(parentId) {
        const parentElement = document.getElementById(parentId);
        // this.#params = params;
        this.#parentElement = parentElement;
        this.#dataObj = {};
        this.#fillForm(parentElement, parentId);
        this.#setElements(parentId);
    }

    #fillForm(parentElement, parentId) {
        parentElement.innerHTML += `<form class="form-control" id="${parentId}-form-id">
            <input type="text" name="name" id="name-id" required>
            <label for="name-id">Name</label>
            <label for="choise">Edit</label>
            <input type="radio" name="choise" id="editBtn">
            <label for="choise">Delete</label>
            <input type="radio" name="choise" id="deleteBtn">
            <button type="submit">Submit</button>
        </form>`
    }

    #setElements(parentId) {
        this.#formElement = document.getElementById(`${parentId}-form-id`);
    }

    addHandler(deleteFn, editFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            console.log('here');
            const formData = new FormData(this.#formElement);
            this.#dataObj.gender = formData.get('gender'); // исходя из name="gender" в radio 
            this.#dataObj.name = formData.get('name');
            this.#dataObj.department = formData.get('department');
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.birthYear = new Date(formData.get('birthday')).getFullYear();
            await submitFn(this.#dataObj)
        };
    }

    show() {
        console.log('show', this.#parentElement);
        this.#parentElement.style.display = "block";
        console.log('show', this.#parentElement);
    }

    hide() {
        this.#parentElement.style.display = "none";
    }
}