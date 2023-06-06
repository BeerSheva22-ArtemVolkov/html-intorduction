import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import SubmitForm from "./ui/SubmitForm.js";
import { getRandomEmployee, getRandomEmployees } from "./util/random.js";
// import CompanyService from "./service/CompanyService.js"
import ServerCompanyService from "./service/ServerCompanyService.js"
import employeesConfig from "./config/employees-config.json" assert {type: 'json'}
import statisticsConfig from "./config/statistic-config.json" assert {type: 'json'}
import { range } from "./util/number-functions.js"
import Spinner from "./ui/Spinner.js";

const spinner = new Spinner("menu-place");

const N_EMPLOYEES = 5;
const TIMEOUT = 10000;

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
const serverCompanyService = new ServerCompanyService(companyServiceHandler, TIMEOUT);
const employeeForm = new EmployeeForm("employees-form-place", employeesConfig);
const sumbitForm = new SubmitForm("employees-select", employeesConfig);
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const ageStatisticTable = new DataGrid("ages-statistics-place", statisticColumns);
const salaryStatisticTable = new DataGrid("salary-statistics-place", statisticColumns);

employeeForm.addHandler(async (employee) => {
    await action(serverCompanyService.addEmployee.bind(serverCompanyService, employee));
})

sumbitForm.addHandler(async (nRow, id) => {
    await serverCompanyService.removeEmployee(id);
    employeeTable.deleteRow(nRow);
}, async (nRow, empl) => {
    await serverCompanyService.editEmployee(empl);
    employeeTable.editRow(empl, nRow);
})

async function editTableHandler(nRow) {
    if (employeeTable.selectRow(nRow)){
        const id = await employeeTable.getID(nRow);
        const empl = await serverCompanyService.getEmployee(id);
        sumbitForm.setParams(nRow, id, empl);
        sumbitForm.fillParams();
        sumbitForm.show();
    } else {
        sumbitForm.hide();
    }
    
}

async function menuHandler(index) {

    switch (index) {
        case employeesIndex: {
            const employees = await action(serverCompanyService.getAllEmployees.bind(serverCompanyService));
            employeeTable.fillData(employees);
            employeeTable.addHandler(editTableHandler);
            break;
        }

        case statistcsIndex: {
            const ageStatisticData = await action(await serverCompanyService.getStatistics
                .bind(serverCompanyService, age.filed, age.interval));
            ageStatisticTable.fillData(ageStatisticData);

            const salaryStatisticData = await action(await serverCompanyService.getStatistics
                .bind(serverCompanyService, salary.filed, salary.interval));
            salaryStatisticTable.fillData(salaryStatisticData);
        }
    }

}

async function companyServiceHandler(employees){

    const index = menu.getActiveIndex();

    switch (index) {
        case employeesIndex: {
            employeeTable.fillData(employees);
            break;
        }

        case statistcsIndex: {
            const ageStatisticData = await action(await serverCompanyService.getStatistics
                .bind(serverCompanyService, age.filed, age.interval));
            ageStatisticTable.fillData(ageStatisticData);

            const salaryStatisticData = await action(await serverCompanyService.getStatistics
                .bind(serverCompanyService, salary.filed, salary.interval));
            salaryStatisticTable.fillData(salaryStatisticData);
        }
    }
}

async function action(serviceFn) {
    spinner.start();
    try {
        const res = await serviceFn();
        return res;
    } catch (error) {
        alert(error.code ? 'server responded with ' + code : 'server is unavailable')
    } finally {
        spinner.stop();
    }
}

async function restoreEmployees(){
    const employees = await serverCompanyService.getAllEmployees();
}

action(restoreEmployees);