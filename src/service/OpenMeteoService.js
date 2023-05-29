export default class OpenMeteoService {
    #baseUrl;

    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }

    async getTemperatures(lat, long, startDate, endDate, hourFrom, hourTo) {
        const url = this.#getUrl(lat, long, startDate, endDate);
        const response = await fetch(url);
        const data = await response.json();

        const dates = getDataForHours(data.hourly.time, hourFrom, hourTo);
        const temperatures = getDataForHours(data.hourly.temperature_2m, hourFrom, hourTo);
        const apparentTemperatures = getDataForHours(data.hourly.apparent_temperature, hourFrom, hourTo);
        return dates.map((d, index) => {
            const tokens = d.split("T");
            let date = tokens[0];
            let time = tokens[1];
            return { date, time, temperature: temperatures[index], apperantTemperature: apparentTemperatures[index] }
        })
    }

    #getUrl(lat, long, startDateStr, endDateStr) {
        return `${this.#baseUrl}latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&start_date=${startDateStr}&end_date=${endDateStr}`
    }

}

function getDataForHours(array, hourFrom, hourTo) {
    return array.filter((__, index) => {
        const rem = index % 24;
        return rem >= hourFrom && rem <= hourTo;
    })
}