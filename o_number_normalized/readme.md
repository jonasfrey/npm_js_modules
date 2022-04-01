# importing / installation 
```javascript 
// cdn 

import O_number_normalized from "https://unpkg.com/o_number_normalized@latest/o_number_normalized.module.js"

// npm install
import O_number_normalized from "path/to/node_modules/o_number_normalized/o_number_normalized.module.js"

// instanciate
var o_number_normalized = new O_number_normalized()
```

# converting numbers 

## setting in a "format" 
### for example degrees
```javascript 
o_number_normalized.n_degrees = 180
```
number is now automatically converted to all different kinds
```javascript 
o_number_normalized.n_radians // -> 3.141592653589793
o_number_normalized.n_degrees  // -> 180
o_number_normalized.n_percentage // -> 50
o_number_normalized.n_hours // -> 12
o_number_normalized.n_minutes // -> 720
o_number_normalized.n_seconds // -> 43200
```
## getting in a "format" 
```javascript 
o_number_normalized.n_radians // -> 3.141592653589793
```

# normalized 
the normalized number (holds float value 0-1) is the master
```javascript 
o_number_normalized.n //-> 0.5
```

## hours minutes seconds in modulo
```javascript 
var o_hours_minutes_seconds = {hours: 11, minutes: 23, seconds: 58} 
o_number_normalized.n_hours_modulo = o_hours_minutes_seconds.hours // 11
o_number_normalized.n_minutes_modulo = o_hours_minutes_seconds.minutes // 23
o_number_normalized.n_seconds_modulo = o_hours_minutes_seconds.seconds // 58

o_number_normalized.n_hours // -> 11.399444444444445 // all hours of the day
o_number_normalized.n_minutes // -> 683.9666666666667 // all minutes of the day
o_number_normalized.n_seconds // -> 41038 //all seconds of the day

o_number_normalized.n_hours_modulo // -> 11
o_number_normalized.n_minutes_modulo // -> 23
o_number_normalized.n_seconds_modulo // -> 58

```

## handy snippets 
### getting hours minutes seconds hms __h__m__.__s, 
```javascript
o_number_normalized.n = 0.112358
// hours minutes seconds, for example for latitude or longitude
var s_hms = 
    `${o_number_normalized.n_hours_modulo}h${o_number_normalized.n_minutes_modulo}m${o_number_normalized.n_seconds_modulo.toFixed(2)
}s`

s_hms // -> 2h41m47.73s
```

### getting degrees minutes seconds dms __d__m__.__s, 
```javascript
o_number_normalized.n = 0.112358
// hours minutes seconds, for example for latitude or longitude
var s_dms = 
    `${o_number_normalized.n_degrees_modulo}d${o_number_normalized.n_minutes_modulo}m${o_number_normalized.n_seconds_modulo.toFixed(2)
}s`

s_dms) // -> 40d41m47.73s
```


# custom formats 
 you can add your own formats
 by adding a custom config to 
 the `a_o_number_normalized_config` array
```javascript 
        o_number_normalized.a_o_number_normalized_config.push(
            {
                s_name: "n_inch_per_centimeter", 
                n_max: 2.54, 
                n_min: 0,
                n_modulo_divisor : 2.54, 
            },
        )

    // then you can call it 
    o_number_normalized.n = 10
    o_number_normalized.n_inch_per_centimeter // -> 25.4
    // now we can convert cm to inch 
    o_number_normalized.n_inch_per_centimeter = 100
    o_number_normalized.n // -> 39.37007874015748
```

# converting in one statement / via function call 
the name pattern is one of the following
`.f_n_convert${s_name_of_config}_to_${s_name_of_config}` or 
`.f_n_convert${s_name_of_config}2${s_name_of_config}`
example
```javascript 
o_number_normalized.f_n_convert_n_percentage2n_radians(50) // -> 3.1415...
```
## note, the original value stays the same,
```javascript 
o_number_normalized.n_degrees = 120 // -> 0.2
o_number_normalized.f_n_convert_n_radians2n_degrees(Math.PI) // -> 180
o_number_normalized.n_degrees //->120
```


## custom name patterns 
```javascript
var s_pattern = `CONVERT${o_number_normalized.s_function_name_pattern_var_name}INTO${o_number_normalized.s_function_name_pattern_var_name}`
o_number_normalized.a_s_function_name_pattern.push(s_pattern)
// now we can convert with the custom pattern
o_number_normalized.CONVERTn_degreesINTOn_radians(360) // -> 6.283185307179586
```
# version log 

## 1.0.2 
removed some unneccessary `console.log` stuff
## 1.0.3
adding `package.json` keywords
## 1.0.4 
documentation updates
## 1.0.5 
added the possibility to convert with a function and to extend the function name pattern 