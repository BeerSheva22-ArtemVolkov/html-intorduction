const URL = 'http://localhost:3500/employees'

import { count } from "../util/number-functions.js";

export default class CompanyService {


    async addEmployee(employee) {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        })
        const addedEmployee = await response.json();
        return addedEmployee;
    }

    async removeEmployee(id) {
        const response = await fetch(URL + `/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
        const removedEmployee = await response.json();
        return removedEmployee;
    }

    async editEmployee(employee) {
        const response = await fetch(`${URL}/${employee.id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(employee)
        })
        const editedEmployee = await response.json();
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
}