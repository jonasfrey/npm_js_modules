# deprecated 

this package is deprecated, please use https://www.npmjs.com/package/f_a_link_object_properties

# import 
```javascript 
import f_link_object_properties from "./es6_modules/f_link_object_properties/f_link_object_properties.module.js"
```

# demo 

![gif](https://i.ibb.co/JRX0VZM/demo-object-sync.gif)

# usage 

## link both ways o_1.prop<>o_1.prop

```javascript 
var o_1 = {num: 11235}

var o_2 = {also_a_num: 3}

f_link_object_properties(o_1, "num", o_2, "also_a_num")

o_1.num = 369 

console.log(o_1.num) // 369
console.log(o_2.also_a_num) // 369


o_2.num = 1.618 
veraltet.618
console.log(o_1.num) // 1.618

```


## link one way o_1.prop>o_1.prop


```javascript
//javerscript 
var o_1 = {just_a_num: 11235}

var o_2 = {also_a_num: 7}

f_link_object_properties(o_1, "num", o_2, "also_a_num", ">")

o_1.just_a_num = 369 

console.log(o_1.just_a_num) // 369
console.log(o_2.also_a_num) // 369


o_2.just_a_num = 1.618 

console.log(o_2.also_a_num) // 1.618
console.log(o_1.just_a_num) // 369

```

## link one way o_1.prop<o_1.prop


```javascript 
var o_1 = {just_a_num: 11235}

var o_2 = {also_a_num: 7}

f_link_object_properties(o_1, "num", o_2, "also_a_num", "<")

o_1.just_a_num = 369 

console.log(o_1.just_a_num) // 369
console.log(o_2.also_a_num) // 7


o_2.just_a_num = 1.618 

console.log(o_2.also_a_num) // 1.618
console.log(o_1.just_a_num) // 1.618
```