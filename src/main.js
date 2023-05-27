import openMeteoConfig from "./config/service-config.json" assert {type: "json"};
import OpenMeteoService from "./service/OpenMeteoService.js";
import DataGrid from "./ui/DataGrid.js";

// constants definition
const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'temperature', headerName: 'Temperature' },
    { field: 'apperantTemperature', headerName: 'Feels like' }
]

const cities = document.getElementById("form-place-city");
const refreshBtn = document.getElementById("form-place-submit");
const tbody = document.querySelector("#tbody");


// functions 
function getISODate(date) {
    return date.toISOString().substring(0, 10);
}

function getEndDate(startDateStr, days) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(startDate.setDate(startDate.getDate() + days));
    return getISODate(endDate);
}

// const fromFormData = { city: 'Rehovot', startDate: getISODate(new Date()), days: 5, hourFrom: 22, hourTo: 23 }
// fromFormDate.endDate = getEndDate(fromFormDate.startDate, 5);

//objects
console.log(openMeteoConfig);
const openMeteoSerice = new OpenMeteoService(openMeteoConfig.baseUrl);

const table = new DataGrid("table-place", columns);
// const latLong = openMeteoConfig.cities[fromFormData.city];
// const { lat, long } = latLong;
// let a = 10;
// let b = 20;
// [a, b] = [b, a]; // swap

const { startDate, days, hourFrom, hourTo } = fromFormData;

// openMeteoSerice.getTemperatures(lat, long, startDate, getEndDate(startDate, days), hourFrom, hourTo)
//     .then(data => table.filldata(data))

cities.innerHTML = Object.keys(openMeteoConfig.cities).map(c => `<option>${c}</option>`).join('');

refreshBtn.onclick = function () {
    const latLong = openMeteoConfig.cities[fromFormData.city];
    const { lat, long } = latLong;
    const fromFormData = { city: cities.nodeValue, startDate: getISODate(new Date()), days: 5, hourFrom: 22, hourTo: 23 }
}