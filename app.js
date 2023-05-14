//splice method for updating array
let arS = [10, 20, -70, 100, 6, -10, 0];
const arI = [1, 2, 3];

let index = arS.indexOf(-70);
arS.splice(index + 1, 0, ...arI);   // вставляет в массив значения из другого массива, начиная с индекса
// 2ой параметр - количество удаляемых элементов
console.log(arS);
console.log(arS.splice(index + 1, 3)); // Удаляем вставленные элементы
console.log(arS);

arS.splice(index + 1, 0, ...arI);
console.log(arS.slice(index + 1, index + 4)); // получить массив значений, не меняя исходный
console.log(arS);

let indexFirstNegative = arS.findIndex(v => v < 0); // возвращает первый индекс, удовлетворяющий условию
console.log(index == indexFirstNegative);

let newArr = arS.filter(el => el > 0); // возвращает новый массив, удовлетворяющий условию
console.log(newArr);

console.log(arS.every(v => v > 0)); // возвращает true, если каждый элемент удовлетворяет условию
console.log(arS.some(v => v < 0)); // возвращает true, если любой элемент удовлетворяет условию

// HW
function arrayCopy(srcArray, posSrc, destArray, posDest, length) {
    //TODO 
    // copy "length" elements from position "posSrc" of array "srcArray" to array "destArray" from "posDest"
    // Заменяет существующие элементы
    if (length != 0 && srcArray.length != 0 && destArray.length != 0){
        destArray.splice(posDest, length, ...srcArray.slice(posSrc, posSrc + length));
    }
    return destArray;
}

function moveElement(array, pos, shift) {
    //TODO 
    // перемещает элемент из "array" с позиции "pos" на "shift" позиций, но не дальше длины массива
    // example: array = [1, 2, 3, 4, 5], pos = 2, shift = 1  =>  [1, 2, 4, 3, 5];
    if (shift != 0 || pos >= 0 ) {
        let elToMove = array.splice(pos, 1);
        let newPos = pos + shift;
        if (newPos < 0) {
            newPos = 0;
        } else if (newPos > array.length) {
            newPos = array.length;
        }
        array.splice(newPos, 0, ...elToMove);
    }
    return array;
}

let ar1 = [1, 2, -1, 20, 134, -50, 10, 20, -70, 100, 6, -10, 0];
let ar2 = [11, 21, -71, 101, 7, -11, 1];

console.log(arrayCopy(ar1, 3, ar2, 6, 5));
console.log(moveElement(ar1, 2, 4));

// 

console.log(ar1.reduce((res, cur) => cur < res ? cur : res));

// вернуть массив с помощью reduce где первый - min, второй - max

console.log(ar1.reduce((res, cur) => {
    if (res[0] > cur){
        res[0] = cur;
    } else if (res[1] < cur){
        res[1] = cur;
    }
    return res;
}, [ar1[0], ar1[0]]));

//

const ar10 = [2, 3, 123, 200, 99, -5];

grades = grades.sort((x, y) => x - y); // по возрастанию