// what's wrong?
function sleep(timeout) {
    // setTimeout(() => flRunning = false, timeout); // устанавливается событие, но не выполняется. Начнет выполняться только после отработки скрипта до конца
    return new Promise(resolve => setTimeout(() => resolve(), timeout));
}

function f1() {
    console.log('f1 performed');
}

function f2() {
    console.log('f2 performed');
}

function f3() {
    console.log('f3 performed');
}

const promise = sleep(2000);
// promise.then(() => f1()).then(() => f2()).then(() => f3());

function getID(predicate) {
    const IDs = [123, 124, 125];
    const index = IDs.findIndex(predicate);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return index < 0 ? reject('id not found') : resolve(IDs[index]);
        }, 1000);
    })
}

function getCar(id) {
    const cars = {
        '123': 'suzuki',
        '124': 'hundai',
        '125': 'honda',
    }
    const car = cars[id];
    return new Promise((resolve, reject) => setTimeout(() => car ? resolve(car) : reject('no such car'), 1000))
}

// function displayCar(predicate) {
//     getID(predicate)
//         .then(id => getCar(id))
//         .then(car => console.log(car))
//         .catch(error => console.log(error))
// }

async function displayCar(predicate) {
    await sleep(10000)
    try {
        const id = await getID(predicate) //await раскрывает promise
        const car = await getCar(id);
        console.log(car);
    } catch (error) {
        console.log(error);
    }


}

// displayCar(id => id == 126)
displayCar(id => id == 126).then(() => console.log('thanks for waiting'))
// если в вызываемой функции нет catch, то обработку ошибки rejet надо обрабатывать здесь в .catch()
console.log('waiting for the data...');