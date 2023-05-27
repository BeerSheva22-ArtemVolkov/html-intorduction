// async function getTemperatures(lat, long) {
//     const response =
//         await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature?timezone=Asia%2FSingapore`)
//     // let res = await response.json();
//     return response.json();
// }

// getTemperatures(31.89, 34.81).then(response => console.log(response)).catch(error => console.log(error));

// написать функциональность: принимает дату, лонг и лотт, кол-во дней (не более 16) и часы (с такого то по такой то)
// возвращает массив объектов

async function getTemperatures(lat, long, startDate, days, hourFrom, hourTo) {
    // params: startDate - ISO date of forecast; hourFrom, hourTo - closed range of the goures for each day
    // return: array of objects {date: <string> YYYY-MM-DD,
    //                           time: <hour number from the given range>
    //                           temperature: <number>
    //                           apperantTemperature: <number>}
    // let startD = new Date(startDate);
    // let lastD = startD.setDate(startD.getDate() + days);

    // const response =
    //     await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&start_date=${new Date(startDate).toISOString().slice(0, 10)}&end_date=${new Date(lastD).toISOString().slice(0, 10)}`)
    // const data = await response.json();
    // let result = [];
    // let len = data.hourly.time.length;

    // for (let i = 0; i < len; i++) {
    //     date = data.hourly.time[i].split("T")[0];
    //     time = data.hourly.time[i].split("T")[1];
    //     if (time.slice(0, 2) >= hourFrom && time.slice(0, 2) <= hourTo) {
    //         temperature = data.hourly.temperature_2m[i];
    //         apperantTemperature = data.hourly.apparent_temperature[i];
    //         result.push({ date, time, temperature, apperantTemperature })
    //     }
    // }

    // return result;

    const endDate = getEndDate(startDate, days);
    const url = getUrl(lat, long, startDate, endDate);
    const response = await fetch(url);
    const data = await response.json();
    const dates = getDataForHours(data.hourly.time, hourFrom, hourTo);
    const temperatures = getDataForHours(data.hourly.temperature_2m, hourFrom, hourTo);
    const apparentTemperatures = getDataForHours(data.hourly.apparent_temperature, hourFrom, hourTo);
    console.log(dates);
    return dates.map((d, index) => {
        const tokens = d.split("T");
        let date = tokens[0];
        let time = tokens[1];
        return { date, time, temperature: temperatures[index], apperantTemperature: apparentTemperatures[index] }
    })
}

function getEndDate(startDateStr, days) {
    let startDate = new Date(startDateStr);
    const endDate = new Date(startDate.setDate(startDate.getDate() + days));
    return endDate.toISOString().slice(0, 10);
}

function getUrl(lat, long, startDateStr, endDateStr) {
    return `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&start_date=${startDateStr}&end_date=${endDateStr}`
}

function getDataForHours(array, hourFrom, hourTo) {
    return array.filter((__, index) => {
        const rem = index % 24;
        return rem >= hourFrom && rem <= hourTo;
    })
}

getTemperatures(31.89, 34.81, '2023-05-24', 0, 10, 12).then(data => console.log(data)).catch(error => console.log(error));