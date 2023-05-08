// console.log(2 + 3);
// let a = 5 + "5";
// console.log(a, typeof a);
// a = a - 5;
// console.log(a, typeof a);
// a = "abc";
// a = a / 2;
// console.log(a, typeof a);
// a = "123";
// console.log(a, typeof a);
// // a = Number(a);
// a = +a;
// console.log(a, typeof a);
// if (a = 1) {
//     console.log(a + " is true");
// }

// //

// let aa = 1;
// let bb = 3;
// let cc = 2;
// if (aa < bb < cc) { // a < b  дает true (те 1), и, соответственно 1 < c, где c = 2
//     console.log("a < b < c");
// }

// if (2 < "abc"){
//     console.log('"2" < "abc" is true');
// }

// //

// let aaa = "abc";
// a = !!aaa; // преобразование из строки в boolean
// console.log(aaa, typeof aaa);

// let b = new Number(3); // ссылка на объект класса Number
// console.log(b, typeof b);
// console.log(b + 3, typeof b);
// console.log(b = a + 3, typeof b);

// let c = 0.123145
// console.log(c, typeof c);
// c = c.toFixed(2); // Урезание и округление
// c = c + 5; // 5 добавится в конец строки
// console.log(c, typeof c);
// c = +c; // Преобразование в число
// console.log(c + 5, typeof c);

// c = !!new Number(0);
// console.log(c, typeof c); // true
// c = !!0;
// console.log(c, typeof c); // false

// let a = 2.7;
// console.log(Math.trunc(a));

// let b = "256 * 320";
// console.log(+b); // NaN
// console.log(parseInt(b)); // 256
// c = "257.4a"
// console.log(+c, parseInt(c), parseFloat(c)); // NaN 257 257.4
// console.log('B'.charCodeAt(0)); // 66
// console.log(String.fromCharCode(65, 66)); //AB
// console.log(Number.length); // 1
// console.log((123).toString(16)); // перевод в 16-ричную СС

// Use symbols "A", "S"
//print out "ananas"

console.log(("A" + +"A" + "AS").toLocaleLowerCase());  // ananas

// console.log(myToStingInt(-260124, 16));
// console.log((-260124).toString(16));

errors = 0;
for (radix = 2; radix < 37; radix ++) {
    for (i = -1000; i < 1001; i++) {
        if (myToStingInt(i, radix).toLowerCase() != i.toString(radix)) {
            errors++;
        }
    }
}
console.log("Errors count " + errors);

function myToStingInt(number, radix) {
    // number - число
    // radix - система счисления if radix < 2 or radix > 36 then radix = 10
    let isNegative = number < 0;
    number = Math.round(Math.abs(number));
    let res = '';
    while (number >= radix) {
        let letter = getDigit(number % radix);
        res = letter + res;
        number = Math.floor(number / radix);
    }
    res = getDigit(number) + res;
    if (isNegative){
        res = "-" + res;
    }
    return res;
}

function getDigit(num){
    if (num > 9){
        num = String.fromCharCode(65 + num - 10);
    }
    return num;
}

