import { range } from "../util/number-functions.js";
import { getISODate, getEndDate } from '../util/date-functions.js';

//constants
const CITY_ID = 'city-id';
const DATE_ID = 'date-id';
const DAYS_ID = 'days-id';
const HOUR_FROM_ID = 'hour-from-id';
const HOUR_TO_ID = 'hour-to-id';
const FROM_ID = 'form-id';

export default class WeatherForm {

    #parentID;
    #formElement;
    #cityElement;
    #dateElement;
    #daysElement;
    #hourFromElement;
    #hourToElement;
    #formData;
    #maxDays;
    #cities;
    #daySetBy;

    constructor(parentID, cities, maxDays) {
        this.#parentID = parentID;
        this.#maxDays = maxDays;
        this.#cities = cities;

        this.#formData = {};

        this.#buildForm();
        this.#setElements();
        this.#setHandlers();
        this.#setSelectOptions();
    }

    #cityHandler() {
        this.#formData.city = this.#cityElement.value;
    }

    #daysHandler() {
        // FIXME
        const days = this.#daysElement.value;
        if (this.#daySetBy == 'dayshandler' || this.#daySetBy == undefined) {
            const minDate = getISODate(new Date());
            this.#dateElement.min = minDate;
            this.#dateElement.max = getEndDate(minDate, this.#maxDays - Number(days));
            this.#dateElement.innerText = '';
            this.#daySetBy = 'dayshandler'
        }
        this.#formData.days = days;
    }

    #dateHandler() {
        const dateFrom = this.#dateElement.value;
        this.#formData.startDate = dateFrom;

        let dateDifference = new Date(dateFrom) - new Date();
        let TotalDays = Math.ceil(dateDifference / (1000 * 3600 * 24));
        if (this.#formData.days == undefined || this.#formData.days > TotalDays) {
            delete this.#formData.days;
            setOptionItems(this.#daysElement, range(0, this.#maxDays - TotalDays), 'forecast days');
        }

    }

    #hourFromHandler() {
        const hourFrom = +this.#hourFromElement.value;
        this.#formData.hourFrom = hourFrom;
        if (this.#formData.hourTo == undefined || this.#formData.hourTo < hourFrom) {
            delete this.#formData.hourTo;
            setOptionItems(this.#hourToElement, range(hourFrom, 24), 'hour to');
        }

    }

    #hourToHandler() {
        const hourTo = +this.#hourToElement.value;
        this.#formData.hourTo = hourTo;
        if (this.#formData.hourFrom == undefined || this.#formData.hourFrom < hourTo) {
            delete this.#formData.hourFrom;
            setOptionItems(this.#hourFromElement, range(0, hourTo), 'hour from');
        }
    }

    #buildForm() {
        const parentElement = document.getElementById(this.#parentID);
        parentElement.innerHTML = `<form id="${this.#parentID}-${FROM_ID}" class="form-control">
            <div class="row-input">
                <select id="${this.#parentID}-${CITY_ID}" class="select-control" required></select>
                <select id="${this.#parentID}-${DAYS_ID}" class="select-control" required></select>
            </div>
            <div class="row-input">
                <select id="${this.#parentID}-${HOUR_FROM_ID}" class="select-control" required></select>
                <select id="${this.#parentID}-${HOUR_TO_ID}" class="select-control" required></select>
            </div>
            <div class="date-group-control">
                <label class="label-input">Enter start date</label>
                <input class="date-input" type="date" id="${this.#parentID}-${DATE_ID}" required>
            </div>
            <div class="buttons-group">
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </div>
        </form>`
    }

    #setElements() {
        this.#formElement = document.getElementById(`${this.#parentID}-${FROM_ID}`);
        this.#cityElement = document.getElementById(`${this.#parentID}-${CITY_ID}`);
        this.#daysElement = document.getElementById(`${this.#parentID}-${DAYS_ID}`);
        this.#dateElement = document.getElementById(`${this.#parentID}-${DATE_ID}`);
        this.#hourFromElement = document.getElementById(`${this.#parentID}-${HOUR_FROM_ID}`);
        this.#hourToElement = document.getElementById(`${this.#parentID}-${HOUR_TO_ID}`);
    }

    #setHandlers() {
        // this.#cityElement.onchange = () => this.#cityHandler();
        this.#cityElement.onchange = this.#cityHandler.bind(this);
        this.#daysElement.onchange = this.#daysHandler.bind(this);
        this.#dateElement.onchange = this.#dateHandler.bind(this);
        this.#hourFromElement.onchange = this.#hourFromHandler.bind(this);
        this.#hourToElement.onchange = this.#hourToHandler.bind(this);

        // this.#formElement.onsubmit = (event) => {
        //     event.preventDefault();
        //     console.log(this.#formData);
        //     resolve(this.#formData);
        // }
        this.#formElement.onreset = () => {
            this.#formData = {};
            this.#setSelectOptions();
        }
    }

    #setSelectOptions() {
        const minDate = getISODate(new Date());
        this.#dateElement.min = minDate;
        this.#dateElement.max = getEndDate(minDate, this.#maxDays - 1);
        setOptionItems(this.#cityElement, this.#cities, 'select city');
        setOptionItems(this.#daysElement, range(0, this.#maxDays + 1), 'forecast days');
        setOptionItems(this.#hourFromElement, range(0, 24), 'hour from');
        setOptionItems(this.#hourToElement, range(0, 24), 'hour to');
    }

    getDataFromForm() {
        return new Promise(resolve => {
            this.#formElement.onsubmit = (event) => {
                event.preventDefault();
                resolve(this.#formData);
            }
        })
    }
}

function setOptionItems(element, options, placeholder) {
    element.innerHTML = `<option value hidden selected>--${placeholder}--</option>`;
    element.innerHTML += options.map(o => `<option value="${o}">${o}</option>`);
}

