import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import SubmitForm from "./ui/SubmitForm.js";
import { getRandomEmployee, getRandomEmployees } from "./util/random.js";
import CompanyService from "./service/CompanyService.js"
import employeesConfig from "./config/employees-config.json" assert {type: 'json'}
import statisticsConfig from "./config/statistic-config.json" assert {type: 'json'}
import { range } from "./util/number-functions.js"
import Spinner from "./ui/Spinner.js";

const spinner = new Spinner("menu-place");

const N_EMPLOYEES = 5;

const sections = [
    { title: "Employees", id: "employees-place" },
    { title: "Add employee ", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];

const employeeColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'birthYear', headerName: 'Birth Year' },
    { field: 'gender', headerName: 'Gender' },
    { field: 'salary', headerName: 'Salary (ILS)' },
    { field: 'department', headerName: 'Department' }
]

const statisticColumns = [
    { field: 'min', headerName: 'Min value' },
    { field: 'max', headerName: 'Max value' },
    { field: 'count', headerName: 'Count' },
]

const statistcsIndex = sections.findIndex(s => s.title == "Statistics");
const employeesIndex = sections.findIndex(s => s.title == "Employees");

const { minSalary, maxSalary, departments, minYear, maxYear } = employeesConfig;
const { age, salary } = statisticsConfig;

const menu = new ApplicationBar("menu-place", sections, menuHandler);
const companyService = new CompanyService();
const employeeForm = new EmployeeForm("employees-form-place", { minSalary, maxSalary, departments, minYear, maxYear });
const sumbitForm = new SubmitForm("employees-select", { minSalary, maxSalary, departments, minYear, maxYear });
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const ageStatisticTable = new DataGrid("ages-statistics-place", statisticColumns);
const salaryStatisticTable = new DataGrid("salary-statistics-place", statisticColumns);

employeeForm.addHandler(async (employee) => {
    await action(companyService.addEmployee.bind(companyService, employee));
})

sumbitForm.addHandler(async (nRow, id) => {
    // const id = await employeeTable.getID(nRow);
    companyService.removeEmployee(id);
    employeeTable.deleteRow(nRow);
}, async (nRow, empl) => {
    // const id = await employeeTable.getID(nRow);
    companyService.editEmployee(empl);
    employeeTable.editRow(empl, nRow);
}, async (id) => {
    companyService.getEmployee(id);
})

async function tableHandler(nRow) {
    console.log(nRow);
    const id = await employeeTable.getID(nRow);
    const empl = companyService.getEmployee(id);
    sumbitForm.setParams(nRow, id, empl);
    sumbitForm.show();
    // ждем нажатие кнопки submit
    // sumbitForm.hide();
}

async function menuHandler(index) {

    switch (index) {
        case employeesIndex: {
            const employees = await action(companyService.getAllEmployees.bind(companyService));
            employeeTable.fillData(employees);
            employeeTable.addHandler(tableHandler);
            break;
        }

        case statistcsIndex: {
            const ageStatisticData = await action(companyService.getStatistics
                .bind(companyService, age.filed, age.interval));
            ageStatisticTable.fillData(ageStatisticData);

            const salaryStatisticData = await action(companyService.getStatistics
                .bind(companyService, salary.filed, salary.interval));
            salaryStatisticTable.fillData(salaryStatisticData);
        }
    }

    const empls = await companyService.getAllEmployees();
    // companyService.removeEmployee(empls)
}

// async function run() {

//     await generateEmployees();

//     while (true) {
//         await employeeForm.buttonHasPressed();
//         const employee = await getRandomEmployee(minSalary, maxSalary, departments);
//         const employeeAdded = companyService.addEmployee(employee);
//         // employeeTable.insertRow(employeeAdded);
//     }
// }

// async function generateEmployees() {
//     const employees = await getRandomEmployees(N_EMPLOYEES, minSalary, maxSalary, departments);
//     for (let i = 0; i < employees.length; i++) {
//         await companyService.addEmployee(employees[i]);
//     }
// }

// run();

async function generateEmployees() {
    const promises = range(0, N_EMPLOYEES).map(async () => companyService.addEmployee(await getRandomEmployee(minSalary, maxSalary, departments)));
    const res = await Promise.all(promises);
    return res;
}

async function action(serviceFn) {
    spinner.start();
    const res = await serviceFn();
    spinner.stop();
    return res;
}

action(generateEmployees);