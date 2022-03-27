var o = {a: 1, b: 2}

Object.defineProperty(o, 'enumerable_true', {
    value : "yes i am enumerable", 
    enumerable: true
});

console.log(JSON.stringify(o)) // {"a":1,"b":2,"enumerable_true":"yes i am enumerable"}



Object.defineProperty(o, 'enumerable_false', {
    value : "no i am not enumerable", 
    enumerable: false
});

console.log(JSON.stringify(o)) // {"a":1,"b":2,"enumerable_true":"yes i am enumerable"}