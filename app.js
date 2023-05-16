const x = { x: "x", toString: function () { return "x" } };
const y = { y: "y", toString: function () { return "kuku" } };
const d = { x: 10, y: 20 }

x.toString = function () { return "xx" };
d[x] = 100;
d[y] = 200;
const f = function () { };
const num = 2;
f.x = function (a, b) {
    return a + b;
}

console.log(d);
console.log(d[x]); // 100
console.log(f.x()); // NaN
console.log(f.x(10, 20)); // 30

(2).x = 10;
console.log((2).x); // undefind

const ar = [2, 3];
ar.x = 10;
console.log(ar); // [2, 3, x : 10]
console.log(ar.x); // 10
console.log(Array.from({ length: 2 }));
console.log(Array.from({length: 5}).map((__, index) => index + 5)); // [5, 6, 7, 8, 9]
console.log(Array.from({length: 26})
    .map((__, index) => String.fromCharCode(index + 'a'.charCodeAt(0)))
    .map(s => `<div>${s}</div>`).join('')); // экранная клавиатура из div