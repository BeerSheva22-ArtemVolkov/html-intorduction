const deleteRadio = "delete-radio";
const editRadio = "edit-radio";
const deleteLabel = "delete-label";
const editLabel = "edit-label";
const checkedColor = "yellow";
const uncheckedColor = "black";

export default class SubmitForm {

    #dataObj;
    #formElement;
    #params;
    #parentElement;
    #selectedRow;
    #selectedId;
    #selectedEmployee;

    constructor(parentId, params) {
        const parentElement = document.getElementById(parentId);
        this.#params = params;
        this.#parentElement = parentElement;
        this.#dataObj = {};
        this.#fillForm(parentElement, parentId);
        this.#addListeners();
        this.#setElements(parentId);
    }

    #fillForm(parentElement, parentId) {

        parentElement.innerHTML += `<form class="edit-control" id="${parentId}-form-id" autocomplete="off">
            <div class="edit-section">
                <div class="input-control">
                    <input type="text" name="name" id="name-id" class="edit-required" required>
                    <label for="name-id">Name</label>
                </div>
                <div class="edit-department">
                    <label for="dep"></label>
                    <select id="dep" name="department" class="edit-required" required>
                        <option value="" hidden>Select department</option>
                        ${this.#params.departments.map(dep => `<option value="${dep}">${dep}</option>`).join('')}
                    </select>
                </div>
                <div class="number-control">
                    <input type="number" name="salary" id="salary-id" placeholder="" min=${this.#params.minSalary * 1000} max=${this.#params.maxSalary * 1000} class="edit-required" required>
                    <label for="salary-id">Salary</label>
                </div>
            </div>
            <div class="choose-section">
                <div>
                    <label for="${editRadio}" id="${editLabel}" style="background-color: ${checkedColor};">Edit</label>
                    <input type="radio" name="choise" id="${editRadio}" checked>
                </div>
                <div>
                    <label for="${deleteRadio}" id="${deleteLabel}">Delete</label>
                    <input type="radio" name="choise" id="${deleteRadio}" >
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>`
    }

    #addListeners() {
        const radioButtons = document.querySelectorAll('input[name="choise"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('click', this.#handlerRadioClick);
        });
    }

    #setElements(parentId) {
        this.#formElement = document.getElementById(`${parentId}-form-id`);
    }

    addHandler(deleteFn, editFn, getEmplFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();

            if (document.getElementById(editRadio).checked) {
                // const empl = getEmplFn(this.#selectedId);
                const formData = new FormData(this.#formElement);
                this.#dataObj.name = formData.get('name');
                this.#dataObj.department = formData.get('department');
                this.#dataObj.salary = formData.get('salary');

                this.#dataObj.gender = this.#selectedEmployee.gender;
                this.#dataObj.birthYear = this.#selectedEmployee.birthYear;
                this.#dataObj.id = this.#selectedEmployee.id;
                await editFn(this.#selectedRow, this.#dataObj);
            } else {
                await deleteFn(this.#selectedRow, this.#selectedId);
            }

            this.hide();
        };
    }

    setParams(nRow, id, empl) {
        this.#selectedRow = nRow;
        this.#selectedId = id;
        this.#selectedEmployee = empl;
    }

    show() {
        this.#parentElement.style.display = "block";
    }

    hide() {
        this.#parentElement.style.display = "none";
    }

    #handlerRadioClick() {
        const editSection = document.querySelector(".edit-section");
        if (document.getElementById(editRadio).checked) {
            setColor(editLabel, checkedColor);
            setColor(deleteLabel, uncheckedColor);
            setRequired(true);
            editSection.style.display = 'block';
        } else {
            setColor(editLabel, uncheckedColor);
            setColor(deleteLabel, checkedColor);
            setRequired(false);
            editSection.style.display = 'none';
        }
    }

    
}

function setRequired(value) {
    document.querySelectorAll(".edit-required").forEach(field => {
        field.required = value;
    })
}

function setColor(label, color){
    document.getElementById(label).style.backgroundColor = color;
}