import { getRandomInt } from "../util/random.js";
import { count } from "../util/number-functions.js";
const minId = 100000;
const maxId = 1000000;

export default class CompanyService {

    #employees;

    constructor(minId, maxId) {
        this.#employees = {};
    }

    addEmployee(employee) {
        const id = this.#getID();
        this.#employees[id] = { ...employee, id }
        return this.#employees[id];
    }

    removeEmployee(id) {
        const removedEmployee = this.#employees[`${id}`];
        delete this.#employees[`${id}`];
        return removedEmployee;
    }

    editEmployee(employee) {
        const id = +employee.id;
        this.#employees[id] = { ...employee }
    }

    getEmployee(id) {
        const employee = this.#employees[id];
        return employee;
    }

    #getID() {
        let id;
        do {
            id = getRandomInt(minId, maxId)
        } while (this.#employees[id])
        return id;
    }

    async getStatistics(field, interval) {
        // return new Promise(resolve => {
        let array = Object.values(this.#employees);
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
        // resolve(res);
        return getPromise(res, 2000);
        // })

    }

    async getAllEmployees() {
        // return new Promise(resolve => {
        //     resolve(Object.values(this.#employees));
        // })
        return getPromise(Object.values(this.#employees), 500);
    }
}

function getPromise(state, timeout) {
    return new Promise(resolve => setTimeout(() => resolve(state), timeout));
}