this.x = 100;
// console.log(this);

function f1() {
    return this;
}
const f2 = () => {
    return this;
}

// console.log('f1 call result', f1());
// console.log('f2 call result', f2());
// console.log((() => {console.log(this)}));

const x = {
    f1: function () {
        return this;
    },
    f2: () => { return this }
}

console.log(`x.f1 call result`, x.f1()); // передается "будто бы" x
console.log(`x.f2 call result`, x.f2()); // у стрелочной функции нет своего this, поэтому берется глобальный

const rectangle = {
    width: 20, height: 20, square: function () {
        return this.width * this.height
    }, perimeter: () => 2 * (this.width + this.height)
};

const rectangle2 = {
    width: 20, height: 20, square: function () {
        return this.width * this.height
    }, perimeter: () => 2 * (this.width + this.height)
};

console.log(`square = ${rectangle.square()}`);
console.log(`perimeter = ${rectangle.perimeter()}`);

const point = { x: 3, y: 4 }
function displayPoint(z, t) {
    console.log(`x = ${this.x}, y = ${this.y}, z = ${z}, t = ${t}`);
}

const displayPoint1 = displayPoint.bind(point, 100, 200); // прикрепляет this к displayPoint и возвращает (НЕ ВЫЗЫВАЕТ) "копию" с привязанным аргументами
displayPoint1(9, -9); // параметры не выведутся на экран, тк эти значения уже заложены в объекте выше. У bind выше приоритет
displayPoint.call(point, 200, 300);
// displayPoint.apply(point, 300, 400);

console.log(JSON.stringify(rectangle), JSON.stringify(rectangle2));
console.log(`rectangle == rectangle2 is ${rectangle == rectangle2}`);
console.log(`JSON.stringify(rectangle) == JSON.stringify(rectangle2) is ${JSON.stringify(rectangle) == JSON.stringify(rectangle2)}`);

const rectangele3 = JSON.parse(JSON.stringify(rectangle)); // глубокая копия объекта со всеми уровнями