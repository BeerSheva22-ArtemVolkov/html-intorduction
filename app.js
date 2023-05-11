const ar = []; // длина массива = 0
ar[10] = 100; // длина массива = 11
ar[0] = 'hello'; // установаить значение String
ar[3] = true; // установаить значение Boolean
ar[5] = []; // удаление элементов массива
ar.forEach((i) => console.log(i));

ar.length = 0; // стереть массив,установить длину = 0
ar[0] = 1;
[] && console.log(true); // пустой массив = true
ar[ar.length] = 10; // добавление в конец массива

const ar2 = [1, 2, 3];
ar.push(ar2); // добавляет элемент(ы) в конец массива
console.log(ar.length); // length = 3 тк был добавлен МАССИВ
ar.push(...ar2); // добавление значений из массива
console.log(ar.length); // length = 6 тк были добавлены ЗНАЧЕНИЯ МАССИВА

// method MAP - Возвращает массив такой же размерности, но с преобразованными значениями

console.log([1, 2, 3].map(n => n ** 2)); // возведение в степень каждого элемента массива

// функция, которая возвращает случаное целое число в диапазоне
function getRandomIntNumber(min, max, minInclusive = true, maxInclusive = false) {
    let res;
    if (minInclusive) {
        res = Math.floor(Math.random() * (max - min + maxInclusive - !minInclusive)) + min;
    }
    else {
        res = Math.ceil(Math.random() * (max - min + maxInclusive - !minInclusive)) + min;
    }
    return min < max ? res : undefined;
}

function getArrayRandomIntNumbers(nNumbers, min, max, minInclusive = true, maxIclusive = false) {
    const res = []; // Объявляем массив
    res.length = nNumbers; // устанавливаем длину массива
    return min < max ? ([...res].map(() => getRandomIntNumber(min, max, minInclusive, maxIclusive))) : undefined;
}

function yuriGetRandomIntNumber(min, max, minInclusive = true, maxInclusive = false) {
    if (!minInclusive) {
        min++;
    }
    if (maxInclusive) {
        max++;
    }
    return min < max ? Math.trunc(min + Math.random() * (max - min)) : NaN;
}

function getOrderedList(array) {
    //returns HTML string of element <ol> with items from a given array elements
    //example : [1, 2, 3]
    //output : "<ol><li>1</li><li>2</li><li>3</li></ol>"

    // return Array.isArray(array) ? `<ol> ${array.map(num => `<li> ${getDiv(num)} </li>`).join('')} </ol>` : ''; // My
    // return Array.isArray(array) ? `<ol> ${array.map(num => `<li class="${getDiv(num)}"></li>`).join('')} </ol>` : ''; // Lena
    return Array.isArray(array) ? `<ol> ${getListItem(array)} </ol>` : ''; //Yuri
}

function getListItem(array) {
    let res = array.map(v => `<li style="width: 30px; height: 30px; border: solid 1px gray; background-color: ${v ? 'black' : 'white'}"</li>`);
    return res.join('');
}

function getDiv(num) {
    let res = num;
    if (num == 0) {
        // res = '<div style="background-color: white;"></div>'; // My
        res = 'white';
    }
    else if (num == 1) {
        // res = '<div style="background-color: black;"></div>'; // My
        res = 'black';
    }
    return res;
}

bodyID.innerHTML = getOrderedList(getArrayRandomIntNumbers(10, 0, 1, true, true));

function getMatrixRandomIntNumbers(rows, columns, min, max) {
    const res = [];
    res.length = rows;
    return [...res].map(() => getArrayRandomIntNumbers(columns, min, max, true, true));
}