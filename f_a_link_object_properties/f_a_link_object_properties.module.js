// syntax prefixes
// asdf... (no prefix) the datatype can change 
// b_... -> boolean , or integer (every number is true, 0 is false)
// n_... -> number
// s_... -> string
// a_... -> array 
// o_... -> object 
// f_... -> function without return
//
// f_b_... function returning a boolean
// f_n_... function returning a number
// f_s_... function returning a string 
// f_o_... function returning a object
// f_a_... function returning a array 
// f_f_... function returning a function
// etc...
//
// a_b_... array containing booleans
// a_n_... array containing numbers
// a_s_... array containing strings 
// a_o_... array containing objects
// a_a_... array containing arrays 
// a_f_... array containing functions


// class O_proxy_settings{
//     constructor(o_object){
//         // all properties are enumerable set to false, to prevent JSON.stringify(object) from max stack size exceeded error
//         Object.defineProperty(
//             o_object, 
//             'a_o_other',
//                 {
//                     value : [], 
//                     enumerable: false // prevents "Uncaught TypeError: Converting circular structure to JSON"
//                 }
//         )

//     }
// }
class O_other{
    constructor(object){
        this.object = object
        this.a_s_prop_this = [] // property of this object to be linked
        this.a_s_prop_other = [] // property of other object, which is linked
        return this
    }
}
// to set the value on the linked objects, this object will be used, 
class O_value{
    constructor(value){
        this.value = value// the actual original value  in the setter function, set by someone or some code in the script 
        this.a_o_object = [] // when a value on a  object is set, the object will be appended to this array, 
                            // if the object is in the array , the value wont be set again, this prevents infinity recursion
        this.b_dont_call_f_setter = false
    }
}

var f_add_property_o_proxy = function(o_object){
    Object.defineProperty(
        o_object, 
        'o_proxy',
            {
                value : new Proxy(o_object, o_proxy_handler), 
                enumerable: false // prevents "Uncaught TypeError: Converting circular structure to JSON"
            }
    );
}

var s_property_name_for_getter_setter_object = "o_getter_setter"
var s_prefix_property_name_for_getter_function = "f_getter"
var s_prefix_property_name_for_setter_function = "f_setter"
var o_reserved_keyword_properties = {
    a_o_other: "a_o_other", // the array of o_other instances, linked to this object
}
// example of object
// var o_data = {
//     position: {
//         x: 2 , 
//         y: 2, 
//         z: 2, 
//     }, 
//     style:{
//         background: "red", 
//         top: "10", 
//         o_getter_setter: {
//              f_setter: function(){
//                  //generic setter for each property
//                }
//             f_setter_top: function(value_old){
//                 this.top = parseInt(this.top) + "px"
//             },
//             f_getter_top: function(value_old){
//                 console.log("there was an access on the object ${this} on the property ${top}")
//             }
//         }
//     }
// }
var o_proxy_handler = 
{
    get(object, s_prop){
        var s_prefix_property_name_for_getter_function_single_property = s_prefix_property_name_for_getter_function + "_" + s_prop
        //if existing, call the setter function for this property
        if(object.hasOwnProperty(s_property_name_for_getter_setter_object)){
            var f_getter_single_prop = object[s_property_name_for_getter_setter_object][s_prefix_property_name_for_getter_function_single_property]
            var f_getter = object[s_property_name_for_getter_setter_object][s_prefix_property_name_for_getter_function]
            if(f_getter_single_prop){
                f_getter_single_prop.apply(
                    // this// this is the handler, 
                    object.o_proxy,
                    [s_prop]
                )
            }
            if(f_getter){
                f_getter.apply(
                    // this// this is the handler, 
                    object.o_proxy,
                    [s_prop]
                )
            }

        }
        return Reflect.get(object, s_prop)
    },
    set(object,s_prop,value){
        var value_old  = object[s_prop]
        // debugger

        if(value instanceof O_value){
            var o_value = value

            // the value is not the original value , 
            // the setter was called by another setter
            if(o_value.a_o_object.indexOf(object) == -1){
                //the value was not set yet on this object 
                Reflect.set(object, s_prop, o_value.value)
            }
        }else{
            Reflect.set(object, s_prop, value)
            o_value = new O_value(value)
        }
        // set the value for all the linked other objects

        // foreach other linked 
        var s_prefix_property_name_for_setter_function_single_property = s_prefix_property_name_for_setter_function + "_" + s_prop

        // if(o_reserved_keyword_properties[s_prop]){
        //     console.error(`the property name ${s_prop} is a reserved keyword property`)
        //     return false
        // }
        // console.log("value")
        // console.log(value)
        // console.log("object")
        // console.log(object)

        //setting the value on the linked objects
            if(s_prop != "a_o_other"){
                for(var n_index in object.a_o_other){
                    var o_other = object.a_o_other[n_index]
                    var n_index_s_prop_other = o_other.a_s_prop_other.indexOf(s_prop)
                    if(n_index_s_prop_other != -1){
                    //prevent max stack size exceeded
                    // if(o_other.object[o_other.a_s_prop_this[n_index_s_prop_other]] != object[s_prop]){ //not working for el.style, 
                        // Reflect.set(o_other.object.o_proxy,o_other.a_s_prop_this[n_index_s_prop_other],object[s_prop])
                        // console.log("setting the value on the other")
                        // console.log(object[s_prop])
                        // console.log(o_other.object[o_other.a_s_prop_this[n_index_s_prop_other]])
                        // console.log('value for other object')
                        // console.log(object[s_prop])
                        // debugger
                        if(o_value.a_o_object.indexOf(o_other.object) == -1){
                            o_other.object.o_proxy[o_other.a_s_prop_this[n_index_s_prop_other]] = o_value
                        }
                        
                    // }
                }

                }
            }
        
        if(o_value.a_o_object.indexOf(object) == -1 && !o_value.b_dont_call_f_setter){

            //if existing, call the getter function for this property
            if(object.hasOwnProperty(s_property_name_for_getter_setter_object)){

                var f_setter_single_prop = object[s_property_name_for_getter_setter_object][s_prefix_property_name_for_setter_function_single_property]
                var f_setter = object[s_property_name_for_getter_setter_object][s_prefix_property_name_for_setter_function]
                if(f_setter_single_prop){
                    f_setter_single_prop.apply(
                        // this// this is the handler, 
                        object.o_proxy,
                        [value_old, object, s_prop, value]
                    )
                }
                if(f_setter){
                    f_setter.apply(
                        // this// this is the handler, 
                        object.o_proxy,
                        [value_old, object, s_prop, value]
                    )
                }
            }
        }
        
        o_value.a_o_object.push(object)

        // o_value.a_o_object.push(object)

        return true
    
    }
}
var f_link_props = function(
    o_object_1, 
    s_prop_1, 
    o_object_2, 
    s_prop_2
){
    if(!o_object_1.a_o_other){
        Object.defineProperty(
            o_object_1, 
            'a_o_other',
                {
                    value : [], 
                    enumerable: false // prevents "Uncaught TypeError: Converting circular structure to JSON"
                }
        );
    }
    if(!o_object_1.o_proxy){

        f_add_property_o_proxy(o_object_1)

        if(o_object_1 instanceof HTMLInputElement){
            o_object_1.addEventListener("input", function(event){
                o_object_1.o_proxy.value = event.target.value
            })
            // maybe we should care for other events such as "onkeyup", "onchange", etc...
        }
    }
    
    var o_object_2_linked = o_object_1.o_proxy.a_o_other.filter(o=>o.object == o_object_2)[0]
    if(!o_object_2_linked){

        o_object_2_linked = new O_other(o_object_2)
        o_object_1.o_proxy.a_o_other.push(
            o_object_2_linked
        )
    }
    o_object_2_linked.a_s_prop_this.push(s_prop_2)
    o_object_2_linked.a_s_prop_other.push(s_prop_1)

    o_object_1 = o_object_1.o_proxy
    // return o_object_1.o_proxy
}

var f_a_link_object_properties = function(
    o_object_a, 
    s_prop_a, 
    o_object_b, 
    s_prop_b, 
    s_direction = "<>" // "<>"|| ">"
){

    //links / synchronized / binds / whatever you wanna call it 
    // two properties of two different objects to each other
    // creates a proxy foreach object, with the s_prop .o_proxy
    f_link_props(
        o_object_a, 
        s_prop_a, 
        o_object_b, 
        s_prop_b
    )
    if(s_direction == "<>"){
        f_link_props(
            o_object_b, 
            s_prop_b,
            o_object_a, 
            s_prop_a, 
        )
    }
    return [o_object_a.o_proxy, o_object_b.o_proxy]
}

export {f_a_link_object_properties, f_add_property_o_proxy, O_value}