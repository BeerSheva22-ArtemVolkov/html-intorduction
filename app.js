const rectangle = new Rectangle(3, 4); // new возвращает this этого объекта

function Rectangle(width, height) {

    this.width = width;
    this.height = height;
}

Rectangle.prototype.square = function () { // присваивам функцию square классу prototype
    return this.width * this.height;
}

Rectangle.prototype.perimetr = function () {
    return 2 * (this.width + this.height);
}

class RectangleNew {
    #width; // приватное поле класса

    constructor(width, height) {
        this.#width = width;
        this.height = height;
    }

    square() {
        return this.#width * this.height;
    }

    perimetr() {
        return 2 * (this.#width + this.height);
    }
}

console.log(rectangle.square());

// 

class Square extends Rectangle {
    constructor(width) {
        super(width, width);
    }

}

const square = new Square(5);
console.log(square.square());

Array.prototype.myForEach = function (func) {
    for (i = 0; i < this.length; i++) {
        func(this[i], i, this);
    }
}

Array.prototype.myMap = function (func) {
    for (i = 0; i < this.length; i++) {
        this[i] = func(this[i], i, this);
    }
    return this;
}

Array.prototype.myFilter = function (func) {
    let res = [];
    for (i = 0; i < this.length; i++) {
        if (func(this[i], i, this)) {
            res.push(this[i]);
        }
    }
    return res;
}

Array.prototype.myReduce = function (func, start) {
    let res = start != undefined ? func(start, this[0]) : this[0];
    for (i = 1; i < this.length; i++) {
        res = func(res, this[i], i, this);
    }
    return res;
}

const ar = [1, 2, 3];

ar.myForEach(x => console.log(x));

console.log("myMap:", ar.myMap(x => x * 2));

console.log("myFilter:", ar.myFilter(x => x > 2));

const ob = [
    { id: 'abc' },
    { id: 'abc' },
    { id: 'abc' }
]
console.log(ar.myReduce((res, x) => res + x, 1));
console.log(ob.myReduce((res, x) => res + x.id));
console.log(ob.reduce((res, x) => res + x.id));

//

class Deferred {

    arr = [];

    resolve(str){
        this.arr.forEach(func => str = func(str));
    }

    then(func){
        this.arr.push(func)
    }
}

const d = new Deferred()

d.then(function (res) { 
    console.log("1 ", res);
    return "a"; 
});

d.then(function (res) { 
    console.log("2 ", res); 
    return "b"; 
});

d.then(function (res) { 
    console.log("3 ", res); 
    return "c";
});

d.resolve('hello');

// 1  hello
// 2  a
// 3  b

