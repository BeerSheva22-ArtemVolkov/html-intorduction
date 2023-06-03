const maleLabel = "male-label";
const femaleLabel = "female-label";
const checkedColor = "yellow";
const uncheckedColor = "black";

export default class EmployeeForm {

    #dataObj;
    #formElement;
    #params;

    constructor(parentId, params) {
        const parentElement = document.getElementById(parentId);
        this.#params = params;
        // this.#dataObj = { name: 'Vasya', department: 'QA', salary: 5000, birthYear: 2000 };
        this.#dataObj = {};
        this.#fillForm(parentElement, parentId);
        this.#addListeners();
        this.#setElements(parentId);
    }

    #fillForm(parentElement, parentId) {
        parentElement.innerHTML = `<form class="form-control" id="${parentId}-form-id" autocomplete="off">
            <div class="input-group">
                <div class="input-control">
                    <input type="text" name="name" id="name-id" required>
                    <label for="name-id">Name</label>
                </div>
            </div>
            <div class="date-group">
                <div class="date-control">
                    <label for="date-id"></label>
                    <input type="date" name="birthday" id="date-id" placeholder="--Birth date--" required>
                </div>
            </div>
            <div class="radio-group">
                <div class="radio-control" id="${maleLabel}">
                    <label for="male-id">male</label>
                    <input type="radio" name="gender" value="male" id="male-id" required unchecked>
                </div>
                <div class="radio-control" id="${femaleLabel}">
                    <label for="female-id">female</label>
                    <input type="radio" name="gender" value="female" id="female-id" required unchecked>
                </div>
            </div>
            <div class="select-group">
                <div class="select-control">
                    <label for="dep"></label>
                    <select id="dep" name="department" required>
                        <option value="" hidden>Select department</option>
                        ${this.#params.departments.map(dep => `<option value="${dep}">${dep}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="number-group">
                <div class="number-control">
                    <input type="number" name="salary" id="salary-id" autocomplete="off" placeholder="" min=${this.#params.minSalary * 1000} max=${this.#params.maxSalary * 1000} required>
                    <label for="salary-id">Salary</label>
                </div>
            </div>
            
            <button class="submitBtn" type="submit">Submit</button>
        </form>`
    }

    #addListeners() {
        const radioButtons = document.querySelectorAll('input[name="gender"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('click', this.#handlerRadioClick);
        });
    }

    #handlerRadioClick() {
        if (document.getElementById('male-id').checked) {
            setColor(maleLabel, checkedColor);
            setColor(femaleLabel, uncheckedColor);
        } else {
            setColor(femaleLabel, checkedColor);
            setColor(maleLabel, uncheckedColor);
        }
    }

    #setElements(parentId) {
        this.#formElement = document.getElementById(`${parentId}-form-id`);
    }

    addHandler(submitFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObj.gender = formData.get('gender'); // исходя из name="gender" в radio 
            this.#dataObj.name = formData.get('name');
            this.#dataObj.department = formData.get('department'); 
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.birthYear = new Date(formData.get('birthday')).getFullYear();
            await submitFn(this.#dataObj)
        };
    }
}

function setColor(label, color){
    document.getElementById(label).style.backgroundColor = color;
}