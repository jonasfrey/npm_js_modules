
import f_a_link_object_properties from "./f_a_link_object_properties/f_a_link_object_properties.module.js"


// var f_demos = function(){

//     var a = {a:1, b: 2, c: 3, prop_a: 3 }
//     var b = {a:1, b: 2, c: 3, prop_b: 9 }
    
//     var a_objs = f_a_link_object_properties(
//         a, 
//         "prop_a", 
//         b, 
//         "prop_b",
//     )
    
    
//     a.prop_a = 23
//     // console.log(b.prop_b) // 23? 
//     a = o_objs[0]
//     b = o_objs[1]
    
//     var o_input = document.createElement("input")
//     var o_input_original = o_input
//     document.body.prepend(o_input)
    
//     var a_objs = f_a_link_object_properties(
//         a, 
//         "prop_a",
//         o_input, 
//         "value",
//     )
//     // the return is an array of the Proxy of the two objects passed to f_a_link_object_properties
//     // a = o_objs[0]
//     // b = o_objs[1]
    
    
//     var o_text = document.createElement("h1")
//     document.body.prepend(o_text)
    
//     var a_objs = f_a_link_object_properties( //not working
//         o_text, 
//         "innerHTML",
//         a, 
//         "prop_a", 
//     )

        
    // var a_objs = f_a_link_object_properties(
    //     a, 
    //     "prop_a", 
    //     o_text, 
    //     "innerHTML",
    // )

    // var a_objs = f_a_link_object_properties(
    //     o_input, 
    //     "value", 
    //     o_text, 
    //     "innerHTML",
    //     ">"
    // )
    // // a = o_objs[0]
    // // o_text = o_objs[1]
    
    // var o_input2 = document.createElement("input")
    // document.body.prepend(o_input2)
    
    // var a_objs = f_a_link_object_properties(
    //     a, 
    //     "prop_a", 
    //     o_input2, 
    //     "value",
    // )

    // a = o_objs[0]
    // o_input2 = o_objs[1]
    
    // we cannot use addEventListener on the proxy 
    // Illegal invocation... 
    // o_input.addEventListener("input", function(){
        
    //     var self = this
    //     window.setTimeout(function(){
    //         self.value = "after timesout"
    //     },1000)
    // })
    
// }
// f_demos()

var a = {
    s_test: "tau is bigger than pi", 
    s_a_stringified: ""
}
Object.defineProperty(
    a, 
    's_a_stringified',
        {
            value : "", 
            enumerable: false //
        }
);
var o_container = document.createElement("div");
o_container.className = "container"
o_container.style.display = "flex"

document.body.innerHTML = ""
document.body.appendChild(o_container)

var o_labela = document.createElement("label");
o_labela.className = "o_labela"
o_labela.innerText = "a: {...}"
o_container.appendChild(o_labela)

var o_label_s_a_stringified = document.createElement("label");
o_label_s_a_stringified.className = "o_label_s_a_stringified"
o_label_s_a_stringified.innerText = "asdf "
o_container.appendChild(o_label_s_a_stringified)


var o_label_linked_desc = document.createElement("label");
o_label_linked_desc.className = "o_label_linked_desc"
o_label_linked_desc.innerText = "a.s_test <> input.value"
o_container.appendChild(o_label_linked_desc)

var o_labels_test = document.createElement("label");
o_labels_test.className = "o_labels_test"
o_labels_test.innerText = "a.s_test"
o_container.appendChild(o_labels_test)

var o_input = document.createElement("input");
o_input.className = "o_input"
o_container.appendChild(o_input)

//link properties

var a_objs = f_a_link_object_properties(
    a, 
    "s_test", 
    o_input, 
    "value",
)

a = a_objs[0]
// o_input = a_objs[1]

var a_objs = f_a_link_object_properties(
    a, 
    "s_a_stringified", 
    o_label_s_a_stringified, 
    "innerText",
)

o_input.oninput = function(){
    console.log(JSON.stringify(a))
    a.s_a_stringified = JSON.stringify(a)
}


var a_objs = f_a_link_object_properties(
    a, 
    "s_test", 
    o_labels_test, 
    "innerHTML",
)
var o_style = document.createElement("style"); 
o_style.textContent = `
label.o_labela {}

.container {
font-family: arial; 
background:rgba(2,3,4, 0.8); 
color: rgb(240 212 255 / 80%); 
line-height:150%; 
font-size:20px; 

display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
min-height: 100vh;
min-width: 100vw;
}

label, input{
margin:0.5rem;
line-height:150%; 
font-size:20px; 
width: 400px; 
padding:1rem;
}
input{
background:rgba(2,3,4, 0.8); 
color: rgba(244,224,255,0.8); 
border:1px solid rgba(244,224,255,0.5); 
outline:none; 
}
input:hover, input:focus{
border:1px solid rgba(244,224,255,0.8); 
outline:none; 
}
.o_labels_test {

background:rgb(94 165 236 / 04%); 
color: rgba(244,224,255,0.8); 
border:none;
outline:none; 

}
`
document.documentElement.appendChild(o_style)

var o_input_parseint = document.createElement("input");
o_input_parseint.className = "o_input_parseint"
o_container.appendChild(o_input_parseint)


window.o_data = {
    n_number_integer: 222, 
    o_getter_setter: {
        f_getter_n_number_integer: function(){
            console.log(`there was an access on the object ${this} on the property n_number_integer`)
        }, 
        f_setter_n_number_integer: function(s_prop, value, value_old, self){
            console.log(this)
            console.log(self)
            var thisself = this
            var val = self[s_prop]
            window.setTimeout(function(){
                // thisself.n_number_integer = parseInt(this.n_number_integer)
                o_data.n_number_integer = parseInt(val)
            },1000)

        }
    }
}

// var a_objs = f_a_link_object_properties(
//     // o_data, 
//     // "n_number_integer", 
//     // o_input_parseint, 
//     // "value",
//     //reversed order
//     o_input_parseint, 
//     "value",
//     o_data,
//     "n_number_integer", 
// )

var a_objs = f_a_link_object_properties(
    // o_data, 
    // "n_number_integer", 
    // o_input_parseint, 
    // "value",
    //reversed order
    o_data,
    "n_number_integer", 
    o_input_parseint, 
    "value",
)
window.o_data = a_objs[0]



// // example of object
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
