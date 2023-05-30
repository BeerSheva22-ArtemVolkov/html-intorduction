import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import CompanyService from "./service/CompanyService.js"
import employeesConfig from "./config/employees-config.json" assert {type: 'json'}
import statisticsConfig from "./config/statistic-config.json" assert {type: 'json'}
import { range } from "./util/number-functions.js"
import Spinner from "./ui/Spinner.js";

// employee model
// {id: number of 9 digits, name: string, birthYear: date, gender: male|female, department: QA, Development, Audit, Accounting, Management}

const sections = [
    { title: "Employees", id: "employees-table-place" },
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
const employeeForm = new EmployeeForm("employees-form-place");
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const ageStatisticTable = new DataGrid("ages-statistics-place", statisticColumns);
const salaryStatisticTable = new DataGrid("salary-statistics-place", statisticColumns);

async function menuHandler(index) {
    let spinner;
    if (index == statistcsIndex) {
        spinner = new Spinner("statistics-place");
        spinner.start();
        console.log('spinner start');
        const ageStatistic = await companyService.getStatistics(age.filed, age.interval);
        const salaryStatistic = await companyService.getStatistics(salary.filed, salary.interval);

        ageStatisticTable.fillData(ageStatistic);
        salaryStatisticTable.fillData(salaryStatistic);
        console.log('spinner stop');
        spinner.stop();
    }

    if (index == employeesIndex) {
        spinner = new Spinner("employees-table-place");
        spinner.start();

        const allEmpls = await companyService.getAllEmployees();
        employeeTable.fillData(allEmpls);

        spinner.stop();
    }
}

async function run() {
    await generateEmployees();
    console.log('generate done');
    while (true) {
        await employeeForm.buttonHasPressed();
        const employee = await getRandomEmployee(minSalary, maxSalary, departments);
        const employeeAdded = companyService.addEmployee(employee);
        // employeeTable.insertRow(employeeAdded);
    }
}

async function generateEmployees() {
    for (let i = 0; i < 20; i++){
        const employee = await getRandomEmployee(minSalary, maxSalary, departments);
        await companyService.addEmployee(employee);
    }
    // range(0, 20).forEach(async () => {
    //     const employee = await getRandomEmployee(minSalary, maxSalary, departments);
    //     await companyService.addEmployee(employee);
    // })
}

run();
