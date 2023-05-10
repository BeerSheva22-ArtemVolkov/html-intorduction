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

// console.log(("A" + +"A" + "AS").toLocaleLowerCase());  // ananas

// console.log(myToStingInt(-260124, 16));
// console.log((-260124).toString(16));

// errors = 0;
// for (radix = 2; radix < 37; radix ++) {
//     for (i = -100000; i < 100001; i++) {
//         if (myToStingInt(i, radix).toLowerCase() != i.toString(radix)) {
//             errors++;
//         }
//     }
// }
// console.log("Errors count " + errors);

function myToStingInt(number, radix) {

    // number - число
    // radix - система счисления if radix < 2 or radix > 36 then radix = 10

    if (radix < 2 || radix > 36) {
        radix = 10;
    }

    let isNegative = number < 0;
    number = Math.round(Math.abs(number));
    let res = '';
    while (number >= radix) {
        let letter = getDigit(number % radix);
        res = letter + res;
        number = Math.floor(number / radix);
    }
    res = getDigit(number) + res;

    return isNegative ? "-" + res : res;
}

function getDigit(num) {
    if (num > 9) {
        num = String.fromCharCode('A'.charCodeAt(0) + num - 10);
    }
    return num;
}

function yuriToStingInt(number, radix) {
    const sign = number < 0 ? '-' : '';
    number = Math.abs(number);
    number = Math.round(number);

    if (radix < 2 || radix > 36) {
        radix = 10;
    }

    let res = '';
    do {
        res = getSymbol(number, radix) + res;
        number = Math.trunc(number / radix);
    } while (number != 0);
    return sign + res;
}

function getSymbol(number, radix) {
    const aCode = 'a'.charCodeAt(0);
    const delta = aCode - 10;
    const remainder = number % radix;
    return remainder < 10 ? remainder + '' : String.fromCharCode(remainder + delta);
}

// console.log((1234567).toString(36));
// console.log(yuriToStingInt(1234567, 36));
// console.log(yuriToStingInt(124515.2, 16));
// console.log(yuriToStingInt(-12345674, 16));
// console.log(yuriToStingInt(0, 36));

const strNum = '1java';
// console.log(`string with number ${strNum} with radix 2 is ${parseInt(strNum, 2)}`);

console.log(parseInt("0xff", 16));
console.log(yuriParseInt("0xff", 16));

function myParseInt(number, radix) {
    let count = 0;
    let res = 0;
    let isNegative = false;
    number = number.toLocaleLowerCase();

    if (radix < 2 || radix > 36) {
        radix = 10;
    }

    if (number.charAt(0) == '-') {
        isNegative = true;
        number = number.substring(1);
    }

    number = checkNumber(number, radix);

    if (number.length != 0) {
        while (count < number.length) {
            res += getNum(number.charAt(count)) * (Math.pow(radix, number.length - count++ - 1));
        }
        res = isNegative ? -res : res;
    }
    else {
        res = NaN;
    }
    return res;
}

function checkNumber(num, radix) {
    let res = '';
    let count = 0;
    while (count < num.length && getNum(num.charAt(count)) < radix) {
        res += num.charAt(count++);
    }
    return res;
}

function getNum(ch) {
    return isNaN(Number(ch)) ? ch.charCodeAt(0) - 87 : ch;
}

//

function yuriParseInt(strNum, radix) {
    strNum = strNum.trim();
    let index = strNum.charAt(0) == '-' || strNum.charAt(0) == '+' ? 1 : 0;

    if ((!radix || radix == 16) && getHexdecimalIndex(strNum.substring(index)) > 0) {
        index += 2;
        radix = 16;
    }
    if (!radix) {
        radix = 10;
    }

    let res = radix > 1 && radix < 37 ? getDigitCode(strNum, index, radix) : NaN;
    if (!isNaN(res)) {
        let digit;
        index++;
        while (index < strNum.length && !isNaN(digit = getDigitCode(strNum, index, radix))) {
            res = res * radix + digit;
            index++;
        }
        if (strNum[0] == '-') {
            res = -res;
        }
    }
    return res;
}

function getDigitCode(strNum, index, radix) {
    const delta = 'a'.charCodeAt(0) - 10;
    const symbol = strNum.charAt(index).toLowerCase();
    const code = symbol >= '0' && symbol <= '9' ? +symbol : symbol.charCodeAt(0) - delta;
    return code >= 0 && code < radix ? code : NaN;
}

function getHexdecimalIndex(str) {
    return str.toLowerCase().startsWith('0x') ? 2 : 0;
}