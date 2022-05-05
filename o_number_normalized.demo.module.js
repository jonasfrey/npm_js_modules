import O_number_normalized from "./o_number_normalized/o_number_normalized.module.js"

import Vue from 'https://unpkg.com/vue@2.6.0/dist/vue.esm.browser.min.js';


var o_number_normalized = new O_number_normalized()

window.o_number_normalized =  o_number_normalized


// testing with vue 

var o_el = document.createElement("div"); 
o_el.id = "app"


document.documentElement.appendChild(o_el)
var o_el_child = document.createElement("div"); 
o_el_child.id = "child"
o_el_child.setAttribute("v-html", "o_number_normalized.n_degrees")
o_el.appendChild(o_el_child)

window.vueObject = new Vue({
    el: '#app',
    data: {
    o_number_normalized : new O_number_normalized(1)
    }
})
