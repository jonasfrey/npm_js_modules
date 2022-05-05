
import "https://unpkg.com/math_tau_module@1.0.3/math_tau_module.js"

class O_prop{
    constructor(s_name_original, s_name_prefix_private = "_"){
        this._s_name_original = ""
        this.s_name_private = ""
        this.s_name_public = ""
        this.b_s_name_original_is_private = false
        this.s_name_prefix_private = s_name_prefix_private
        this.s_name_original = s_name_original
    }

    set s_name_original(value){

        var n_index_of_prefix = value.indexOf(this.s_name_prefix_private)
    
        if(n_index_of_prefix == 0){
            this.s_name_public = value.substring(this.s_name_prefix_private.length)
            this.s_name_private = value
            this.b_s_name_original_is_private = true
        }else{
            this.s_name_public = value
            this.s_name_private = this.s_name_prefix_private + value
            this.b_s_name_original_is_private = false
        }
        this._s_name_original = value

    }
}
class O_number_normalized_config { 
    constructor(
        
        s_name = null,
        n_max = null,
        n_min = null,
        n_modulo_divisor_before_parseint = null,
        
    ){
        this.s_name = s_name
        this.n_max = n_max
        this.n_min = n_min
        this.n_modulo_divisor_before_parseint = n_modulo_divisor_before_parseint
        if(typeof s_name === "object"){
            for(var s_prop in s_name){
                this[s_prop] = s_name[s_prop]
            }
        }
    }
}
var s_separator = "_"; 
var s_prefix_private_prop_name = "_";
var s_suffix_modulo = "_modulo"

class O_number_normalized{

    constructor(){

        this.n = 0; 
        this._n = 0; 
        
        this.a_o_number_normalized_config = [
            new O_number_normalized_config({
                s_name: "n_radians", 
                n_max: Math.N_TAU, 
                n_min: 0,
                n_modulo_divisor : Math.N_TAU, 
            }),
            new O_number_normalized_config({
                s_name: "n_degrees", 
                n_max: 360, 
                n_min: 0,
                n_modulo_divisor_before_parseint : 360, 
            }),
            new O_number_normalized_config({
                s_name: "n_hours", 
                n_max: 24, 
                n_min: 0,
                n_modulo_divisor_before_parseint : 24, 
            }),
            new O_number_normalized_config({
                s_name: "n_minutes", 
                n_max: 24*60, 
                n_min: 0,
                n_modulo_divisor_before_parseint : 60, 
            }),
            new O_number_normalized_config({
                s_name: "n_seconds", 
                n_max: 24*60*60, 
                n_min: 0,
                n_modulo_divisor_before_parseint : 60, 
            }),
            new O_number_normalized_config({
                s_name: "n_percentage", 
                n_max: 100,
                n_min: 0,
                n_modulo_divisor_before_parseint : 100, 
            }),
        ]
        this.a_s_normal_properties = [
            'a_o_number_normalized_config', 
            "a_s_function_name_pattern", 
            "s_function_name_pattern_var_name", 
            "a_s_normal_properties"
        ]
        this.s_function_name_pattern_var_name = "${s_name_of_config}"
        this.a_s_function_name_pattern = [
            `f_n_convert_${this.s_function_name_pattern_var_name}_to_${this.s_function_name_pattern_var_name}`, 
            `f_n_convert_${this.s_function_name_pattern_var_name}2${this.s_function_name_pattern_var_name}`,
            // `f_n_convert_${this.s_function_name_pattern_var_name}_2_${this.s_function_name_pattern_var_name}`,
        ]
        var self= this
        this.handler = {
            // apply( object, o_this, a_argument ){
            //     // var a_parts = 
            //     // console.log(object, o_this, a_argument)
            //     // debugger
            //     // try to match function name pattern 

            //     // console.log("apply was called")
            //     // console.log(object, o_this, a_argument)
            //     return Reflect()
            // },
            get(object, s_prop, object_proxy){
                
                if(typeof s_prop === 'symbol'){
                    return Reflect.get(object, s_prop)
                }

                for(var n_index in self.a_s_function_name_pattern){
                    var val = self.a_s_function_name_pattern[n_index]
                    var a_s_part = val.split(self.s_function_name_pattern_var_name)
                    // debugger
                    var regex = new RegExp(`(${a_s_part[0]})([a-zA-Z_]*)(${a_s_part[1]})([a-zA-Z_]*)`, "")
                    var a_s_match = s_prop.match(regex);
                    if(a_s_match?.length == 4+1){ // first string in matches is the original string
                        var a_s_config_name = [a_s_match[1+1], a_s_match[3+1]]
                        return function(...args){
                            // debugger
                            var n_temp = object_proxy.n 
                            Reflect.set(object_proxy, a_s_config_name[0], args[0])
                            var n_converted = object_proxy[a_s_config_name[1]]
                            Reflect.set(object_proxy, "n", n_temp)       
                            return n_converted                     
                        }
                    }
                }

                if(self.a_s_normal_properties.includes(s_prop)){
                    return Reflect.get(object, s_prop)
                }
                var o_prop = new O_prop(s_prop, s_prefix_private_prop_name)
                console.log(s_prop)
                if(o_prop.s_name_public.indexOf(s_suffix_modulo) != -1){
                    var a_parts = o_prop.s_name_public.split(s_separator)
                    a_parts.pop()
                    var s_config_name = a_parts.join(s_separator)
                    var o_config = self.a_o_number_normalized_config.filter(o=> o.s_name == s_config_name)[0]
                    if(!o_config){
                        console.error(`${self}.a_o_number_normalized_config must contain an instance of ${O_number_normalized_config} with the property s_name='${s_config_name}'`)
                    }
                    
                    var val = Reflect.get(object, new O_prop(s_config_name, s_prefix_private_prop_name).s_name_private); 
                    val = val % o_config.n_modulo_divisor_before_parseint
                    if(s_config_name != "n_seconds"){
                        val = parseInt(val)
                    }
                    return val
                }
                return Reflect.get(object, o_prop.s_name_private)

            },
            set(object, s_prop, value, object_proxy){
                if(self.a_s_normal_properties.includes(s_prop)){
                    return Reflect.get(object, s_prop)
                }
                var o_prop = new O_prop(s_prop, s_prefix_private_prop_name)

                // if(o_prop.b_s_name_original_is_private){
                //     // do stuff
                //     console.warn("you should not set a private property")
                //     // Reflect.set(object, s_prop, value)
                // }
                // if(!o_prop.b_s_name_original_is_private){
                //     // do stuff
                // }

                if(o_prop.s_name_public != "n"){
                    if(o_prop.s_name_public.indexOf(s_suffix_modulo) != -1){
                        var a_parts = o_prop.s_name_public.split(s_separator)
                        a_parts.pop()
                        var s_config_name = a_parts.join(s_separator)

                        var n_degrees_normalized = object_proxy.n_degrees_modulo / (360)
                        var n_hours_normalized = object_proxy.n_hours_modulo / (24)
                        var n_minutes_normalized = object_proxy.n_minutes_modulo / (24*60)
                        var n_seconds_normalized = object_proxy.n_seconds_modulo / (24*60*60)
                        
                        if(s_config_name == "n_hours"){
                            var n_normalized = 
                                value/24 +
                                n_minutes_normalized + 
                                n_seconds_normalized
                        }
                        if(s_config_name == "n_minutes"){
                            var n_normalized = 
                                n_hours_normalized +
                                value/(24*60) + 
                                n_seconds_normalized
                        }
                        if(s_config_name == "n_seconds"){
                            var n_normalized = 
                                n_hours_normalized +
                                n_minutes_normalized + 
                                value/(24*60*60)
                        }
                        if(s_config_name == "n_degrees"){
                            var n_normalized = 
                                value / (360)+
                                n_minutes_normalized + 
                                n_seconds_normalized
                        }
                        
                        if(n_normalized){
                            return Reflect.set(object_proxy, "n", n_normalized)
                        }
                    }else{
                        var s_config_name = o_prop.s_name_public
                    }
                    
                    var o_config = self.a_o_number_normalized_config.filter(o=> o.s_name == s_config_name)[0]
                    if(!o_config){
                        console.error(`${self}.a_o_number_normalized_config must contain an instance of ${O_number_normalized_config} with the property s_name='${s_config_name}'`)
                    }
                    if(o_config){
                        var n_normalized = value / o_config.n_max
                        // debugger
                        return Reflect.set(object_proxy, "n", n_normalized)
                        // object.n = n_normalized
                    }
                }
                if(o_prop.s_name_public == "n"){
                    for(var n_index_a_o_number_normalized_config in self.a_o_number_normalized_config){
                        var o_config = self.a_o_number_normalized_config[n_index_a_o_number_normalized_config]
                        Reflect.set(object, s_prefix_private_prop_name+o_config.s_name, value * o_config.n_max)

                    }
                }
                Reflect.set(object, o_prop.s_name_private, value)

            }
        }

        return new Proxy(this, this.handler)
    }

}


export default O_number_normalized