
class O_other{
    constructor(object){
        this.object = object
        this.a_s_prop_this = [] // property of this object to be linked
        this.a_s_prop_other = [] // property of other object, which is linked
        return this
    }
}
var s_property_name_for_getter_setter_object = "o_getter_setter"
var s_prefix_property_name_for_getter_function = "f_getter_"
var s_prefix_property_name_for_setter_function = "f_setter_"
var b_setter_lock = false
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
        //if existing, call the setter function for this property
        if(object.hasOwnProperty(s_property_name_for_getter_setter_object)){
            if(object[s_property_name_for_getter_setter_object].hasOwnProperty(s_prefix_property_name_for_getter_function + s_prop)){
                object[s_property_name_for_getter_setter_object][s_prefix_property_name_for_getter_function + s_prop].apply(object, [s_prop])
            }
        }
        return Reflect.get(object, s_prop)
    },
    set(object,s_prop,value){

        // console.log("value")
        // console.log(value)
        // console.log("object")
        // console.log(object)
        console.log(object)
        var value_old  = object[s_prop] 
        object[s_prop] = value
        Reflect.set(object, s_prop, value)
        

        //if existing, call the getter function for this property
        if(object.hasOwnProperty(s_property_name_for_getter_setter_object)){
            if(object[s_property_name_for_getter_setter_object].hasOwnProperty(s_prefix_property_name_for_setter_function + s_prop)){
                
                if(!b_setter_lock){
                    b_setter_lock = true
                    // object[s_property_name_for_getter_setter_object][s_prefix_property_name_for_setter_function + s_prop].apply(object, [s_prop, value, value_old, this])
                    object[s_property_name_for_getter_setter_object][s_prefix_property_name_for_setter_function + s_prop](s_prop, value, value_old, this)
                    b_setter_lock = false
                }
            }
        }

        //set the value on the linked objects
        if(s_prop != "a_o_other"){
            // debugger
            for(var n_index in object.a_o_other){
                var o_other = object.a_o_other[n_index]
                var n_index_s_prop_other = o_other.a_s_prop_other.indexOf(s_prop)
                if(n_index_s_prop_other != -1){
                    //prevent max stack size exceeded

                    if(o_other.object[o_other.a_s_prop_this[n_index_s_prop_other]] != object[s_prop]){
                        // console.log('value for other object')
                        // console.log(object[s_prop])
                        o_other.object[o_other.a_s_prop_this[n_index_s_prop_other]] = object[s_prop]
                    }
                }

            }
        }


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
        //unfortunately when proxying a HTMLInputElement, when the user changes data via GUI/input fileld, 
        // the setter is not called...  that is why we have to use the "oninput" event to manually call the setter
        if(o_object_1 instanceof HTMLInputElement){
            o_object_1.addEventListener("input", function(event){
                o_object_1.value = event.target.value
            })
            // maybe we should care for other events such as "onkeyup", "onchange", etc...
        }
        o_object_1 = new Proxy(o_object_1, o_proxy_handler)
        Object.defineProperty(
            o_object_1, 
            'a_o_other',
                {
                    value : [], 
                    enumerable: false // prevents "Uncaught TypeError: Converting circular structure to JSON"
                }
        );
        // o_object_1.a_o_other = []
    }
    var o_object_2_linked = o_object_1.a_o_other.filter(o=>o.object == o_object_2)[0]
    if(!o_object_2_linked){

        o_object_2_linked = new O_other(o_object_2)
        o_object_1.a_o_other.push(
            o_object_2_linked
        )
    }
    o_object_2_linked.a_s_prop_this.push(s_prop_2)
    o_object_2_linked.a_s_prop_other.push(s_prop_1)

    return o_object_1
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
    // uses Proxy, 
    // HTMLInputElements are a special case, so a event listener is used
    // returns the two proxy objects
    o_object_a = f_link_props(
        o_object_a, 
        s_prop_a, 
        o_object_b, 
        s_prop_b
    )
    if(s_direction == "<>"){
        o_object_b = f_link_props(
            o_object_b, 
            s_prop_b,
            o_object_a, 
            s_prop_a, 
        )
    }

    return [o_object_a, o_object_b]
    // return o_object_a
}

export default f_a_link_object_properties