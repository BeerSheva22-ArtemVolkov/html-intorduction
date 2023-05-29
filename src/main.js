import openMeteoConfig from "./config/service-config.json" assert {type: "json"};
import OpenMeteoService from "./service/OpenMeteoService.js";
import DataGrid from "./ui/DataGrid.js";
import WeatherForm from "./ui/WeatherForm.js";
import { getEndDate } from './util/date-functions.js';

// constants definition
const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'temperature', headerName: 'Temperature' },
    { field: 'apperantTemperature', headerName: 'Feels like' }
]

// const fromFormData = { city: 'Rehovot', startDate: getISODate(new Date()), days: 5, hourFrom: 22, hourTo: 23 }

//objects
const weatherForm = new WeatherForm('form-place', Object.keys(openMeteoConfig.cities), openMeteoConfig.maxDays)
const openMeteoSerice = new OpenMeteoService(openMeteoConfig.baseUrl);
const table = new DataGrid("table-place", columns);

async function run() {
    while (true) {
        const fromFormData = await weatherForm.getDataFromForm();

        const { lat, long } = openMeteoConfig.cities[fromFormData.city];
        const { startDate, days, hourFrom, hourTo } = fromFormData;

        const temperatures = await openMeteoSerice.getTemperatures(lat, long, startDate, getEndDate(startDate, Number(days)), hourFrom, hourTo)
        table.filldata(temperatures);
    }

}

run();