const JsonFind = require('json-find');
// import newdata from './stock_data.json';
// var jsonString = JSON.stringify(newdata);


const test = {
    "a": 1,
    "b": 2,
    "c": [
        3, 
        4, 
        {
            "d": {
                "e": 5
            },
            "f": {
                "e": 8
            }
        }
    ],
    "d": 7
}

const doc = JsonFind(test);
console.log('yayy' + doc.findValues('z'));

    