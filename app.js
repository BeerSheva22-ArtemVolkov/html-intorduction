const person = { name: 'Vasya', id: 132, birthYear: 1990, address: { country: 'Israel', city: 'Beer Sheva' } };

function createPerson(id, name, birthYear, country, city) {
    return { id, name, birthYear, address: { country, city } };
}

const person1 = createPerson(96, 'Artem', 1996, 'Russia', 'Kazan');
const person2 = createPerson(96, 'Artem', 1996, 'Russia', 'Kazan');
console.log(`person1 == person2 is ${person1 == person2}`);
console.log(person1.name);
console.log(person1["id"]);

function displayKeyValue(person, key1, key2) {
    if (key2) {
        console.log(`key1 ${key1}, key2 ${key2}, value is ${person[key1][key2]}`);
    } else {
        console.log(`key1 ${key1}, value is ${person[key1]}`);
    }
}

displayKeyValue(person1, 'name');
displayKeyValue(person1, 'address', 'city');

console.log(Object.keys(person1));

// Method 'keys' of Object returns array of keys
console.log("keys", Object.keys(person1));
// Method 'values' of Object returns array of values
console.log("values", Object.values(person1));
// Method 'entries' of Object returns array of arrays with key as first element and values as second
console.log("entries", Object.entries(person1));

const x = {};
console.log(x["ab"]); //undefind
x["ab"] = 10;
console.log(x["ab"]); //10
x["ab"]++;
console.log(x["ab"]); //11

function displayOccurences(array) {
    // array of strings
    // display strings with their coccurency counts in the descending order of the count
    // if counts are equaled then in asscending string values order
    // let res = {};
    // let resArr = [];

    // array.map(el => Object.keys(res).indexOf(el) > -1 ? res[el]++ : res[el] = 1);    
    // Object.entries(res).forEach(x => resArr.push([x[0], x[1]]));
    // resArr.sort((x, y) => y[1] == x[1] ? x[0].localeCompare(y[0]) : y[1] - x[1]);
    // resArr = resArr.map(el => `${el[0]} -> ${el[1]}`);

    // return resArr;

    const occurrnces = array.reduce((obj, s) => ({...obj, [s]: obj[s] ? obj[s] + 1 : 1}), {});
    Object.entries(occurrnces).sort((x, y) => y[1] == x[1] ? x[0].localeCompare(y[0]) : y[1] - x[1])
            .forEach(e => console.log(`${e[0]} -> ${e[1]}`));

}

displayOccurences(["lmn", "ab", "lmn", "c", "d", "ab", "a", "a", "lmn"]);

// res
// lmn -> 3
// a -> 2

// ab -> 2
// c -> 1
// d -> 1

const y = {xx: 0}
console.log(y.xx);
delete (y.xx);
console.log(y.xx);

// 

function isAnagram(word, anagram){
    // let res;
    // if (word == anagram){
    //     res = true;
    // } else if (word.length != anagram.length){
    //     res = false
    // } else {
    //     const wordLetters = [...(word.toLowerCase())].reduce((obj, s) => ({...obj, [s]: obj[s] ? obj[s] + 1 : 1}), {});
    //     let anagramLetters = [...(anagram.toLowerCase())].reduce((obj, s) => ({...obj, [s]: obj[s] - 1}), wordLetters);
    //     res = Object.entries(anagramLetters).every(v => v[1] == 0);
    // }
    // return res;

    let res = false;
    if (word.length === anagram.length){
        word = word.toLowerCase();
        anagram = anagram.toLowerCase();
        const occurences = getOccurances(Array.from(word));
        res = Array.from(anagram).every(s => occurences[s]-- > 0); 
    }
    return res;
}

function getOccurances(array){
    return array.reduce((obj, s) => ({...obj, [s]: obj[s] ? obj[s] + 1 : 1}), {});
}

let word1 = "Tom Marvolo Riddle";
let word2 = "Iam Lord Voldemort";
console.log(`"${word1}" ${isAnagram(word1, word2) ? "is anagram" : "is not anagram"} for "${word2}"`);