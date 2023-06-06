const URL = 'http://localhost:3500/employees'

import { count } from "../util/number-functions.js";

export default class ServerCompanyService {

    #emplsCache;
    #refreshCallbackFn;
    #intervalID;

    constructor(callbackFn, timeout) {
        this.#emplsCache = {};
        this.#refreshCallbackFn = callbackFn;
        this.#intervalID = setInterval(this.#poller.bind(this), timeout);
    }

    async addEmployee(employee) {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        })
        const addedEmployee = await response.json();
        this.#emplsCache = await this.getAllEmployees();
        return addedEmployee;
    }

    async removeEmployee(id) {
        const response = await fetch(URL + `/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
        const removedEmployee = await response.json();
        this.#emplsCache = await this.getAllEmployees();
        return removedEmployee;
    }

    async editEmployee(employee) {
        const response = await fetch(`${URL}/${employee.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        })
        const editedEmployee = await response.json();
        this.#emplsCache = await this.getAllEmployees();
        return editedEmployee;
    }

    async getEmployee(id) {
        const response = await fetch(`${URL}/${id}`)
        const gettedEmployee = await response.json();
        return gettedEmployee;
    }

    async getStatistics(field, interval) {
        let array = await this.getAllEmployees();
        const currentYear = new Date().getFullYear();

        if (field == 'birthYear') {
            array = array.map(e => ({ 'age': currentYear - e.birthYear }));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        const res = Object.entries(statisticsObj).map(e => {
            const min = e[0] * interval;
            const max = min + interval - 1;
            return { min, max, count: e[1] };
        });
        return res;
    }

    async getAllEmployees() {
        const response = await fetch(URL);
        const allEmployees = await response.json();
        return allEmployees;
    }

    async #poller() {
        const allEmployees = await this.getAllEmployees();
        if (JSON.stringify(allEmployees) != JSON.stringify(this.#emplsCache)) {
            this.#refreshCallbackFn(allEmployees);
            this.#emplsCache = allEmployees;
        }
    }

}