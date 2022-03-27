
var f_link_object_properties = function(
    object_a_tmp,
    s_property_a_tmp, 
    object_b_tmp,
    s_property_b_tmp, 
    s_direction = "<>"
    ){
        console.warn("f_link_object_properties is deprecated, please use f_a_link_object_properties")
        if(s_direction == "<o>"){
            // if the values are objects, they simply can be linked by reference 
            object_a_tmp[s_property_a_tmp] = object_b_tmp[s_property_b_tmp]
            return true
        }
        var object_a = object_a_tmp
        var s_property_a = s_property_a_tmp  
        var object_b = object_b_tmp
        var s_property_b = s_property_b_tmp
        if(s_direction == ">"){
            //swap props to change direction 
            var object_a = object_b_tmp
            var s_property_a = s_property_b_tmp  
            var object_b = object_a_tmp
            var s_property_b = s_property_a_tmp
        }

    function property(object, prop) {
        return {
            get value () {
                return object[prop]
            },
            set value (val) {
                object[prop] = val;
            }
        };
    }
    var o_ref_to_s_property_a_on_object_a = property(object_a, s_property_a);


    var tmp = object_b[s_property_b];
    var s_a_linked_objects_prop_name = "a_linked_objects"+s_property_b
    if(!object_b[s_a_linked_objects_prop_name]){
        Object.defineProperty(
            object_b,
            s_a_linked_objects_prop_name,
            {
                enumerable: false,
                writable: true, 
                value: []
            }
        )

    }
    object_b[s_a_linked_objects_prop_name].push(o_ref_to_s_property_a_on_object_a);
    Object.defineProperty(
        object_b,
        s_property_b,
        {
            
            set: function(value) {
                for(var n_index in object_b[s_a_linked_objects_prop_name]){
                    object_b[s_a_linked_objects_prop_name][n_index].value = value
                }
                // o_ref_to_s_property_a_on_object_a.value = value;
                this["_"+s_property_b] = value;
                        
            },  
            get: function() {
                if(s_direction == "<>"){
                    return o_ref_to_s_property_a_on_object_a.value
                }else{
                    return this["_"+s_property_b]
                }

            }
        }
        );
        object_b[s_property_b] = tmp 
    
}


export default f_link_object_properties