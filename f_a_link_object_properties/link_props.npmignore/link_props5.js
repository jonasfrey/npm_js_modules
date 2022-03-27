

    class O_other{
        constructor(object){
            this.object = object
            this.a_s_prop_this = [] // property of this object to be linked
            this.a_s_prop_other = [] // property of other object, which is linked
            return this
        }
    }
    var o_proxy_handler = 
    {
        get(object, s_prop){
            return Reflect.get(object, s_prop)
        },
        set(object,s_prop,value){
            // console.log("set called")
            // console.log(object, s_prop, value)
            object[s_prop] = value
            if(s_prop != "a_o_other"){
                // debugger
                for(var n_index in object.a_o_other){
                    var o_other = object.a_o_other[n_index]
                    var n_index_s_prop_other = o_other.a_s_prop_other.indexOf(s_prop)
                    if(n_index_s_prop_other != -1){
                        //prevent max stack size exceeded
                        if(o_other.object[o_other.a_s_prop_this[n_index_s_prop_other]] != value){
                            o_other.object[o_other.a_s_prop_this[n_index_s_prop_other]] = value
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

    // var f_demos2 = function(){
//         var a = {
//             s_test: "tau is bigger than pi", 
//             s_a_stringified: ""
//         }
//         Object.defineProperty(
//             a, 
//             's_a_stringified',
//                 {
//                     value : "", 
//                     enumerable: false //
//                 }
//         );
//         var o_container = document.createElement("div");
//         o_container.className = "container"
//         o_container.style.display = "flex"
        
//         document.body.innerHTML = ""
//         document.body.appendChild(o_container)
        
//         var o_labela = document.createElement("label");
//         o_labela.className = "o_labela"
//         o_labela.innerText = "a: {...}"
//         o_container.appendChild(o_labela)

//         var o_label_s_a_stringified = document.createElement("label");
//         o_label_s_a_stringified.className = "o_label_s_a_stringified"
//         o_label_s_a_stringified.innerText = "asdf "
//         o_container.appendChild(o_label_s_a_stringified)


//         var o_label_linked_desc = document.createElement("label");
//         o_label_linked_desc.className = "o_label_linked_desc"
//         o_label_linked_desc.innerText = "a.s_test <> input.value"
//         o_container.appendChild(o_label_linked_desc)

//         var o_labels_test = document.createElement("label");
//         o_labels_test.className = "o_labels_test"
//         o_labels_test.innerText = "a.s_test"
//         o_container.appendChild(o_labels_test)

//         var o_input = document.createElement("input");
//         o_input.className = "o_input"
//         o_container.appendChild(o_input)

//         //link properties
        
//         var a_objs = f_a_link_object_properties(
//             a, 
//             "s_test", 
//             o_input, 
//             "value",
//         )

//         a = a_objs[0]
//         // o_input = a_objs[1]

//         var a_objs = f_a_link_object_properties(
//             a, 
//             "s_a_stringified", 
//             o_label_s_a_stringified, 
//             "innerText",
//         )

//         o_input.oninput = function(){
//             console.log(JSON.stringify(a))
//             a.s_a_stringified = JSON.stringify(a)
//         }

            
//         var a_objs = f_a_link_object_properties(
//             a, 
//             "s_test", 
//             o_labels_test, 
//             "innerHTML",
//         )
//         var o_style = document.createElement("style"); 
//         o_style.textContent = `
//         label.o_labela {}

//     .container {
//         font-family: arial; 
//         background:rgba(2,3,4, 0.8); 
//         color: rgb(240 212 255 / 80%); 
//         line-height:150%; 
//         font-size:20px; 

//         display: flex;
//         align-items: center;
//         flex-direction: column;
//         justify-content: center;
//         min-height: 100vh;
//         min-width: 100vw;
//     }

//     label, input{
//         margin:0.5rem;
//         line-height:150%; 
//         font-size:20px; 
//         width: 400px; 
//         padding:1rem;
//     }
//     input{
//         background:rgba(2,3,4, 0.8); 
//         color: rgba(244,224,255,0.8); 
//         border:1px solid rgba(244,224,255,0.5); 
//         outline:none; 
//     }
//     input:hover, input:focus{
//         border:1px solid rgba(244,224,255,0.8); 
//         outline:none; 
//     }
//     .o_labels_test {

//         background:rgb(94 165 236 / 04%); 
//     color: rgba(244,224,255,0.8); 
//     border:none;
//     outline:none; 
        
// }
// `
// document.documentElement.appendChild(o_style)

    // }

    // f_demos2()