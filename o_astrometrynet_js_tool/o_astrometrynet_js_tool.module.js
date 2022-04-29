// production: 
// import o_json_to_html from "o_json_to_html"
// try {
//     var showdown = import("https://cdnjs.cloudflare.com/ajax/libs/showdown/2.0.3/showdown.js")
//     // debugger
//     window.showdown = showdown
// } catch (error) {
//     console.error("markdown not available")
// }

// (async function () {
//     await (await import('https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.2/marked.min.js')).default();
//     // console.log(marked)
// })();

import "https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.2/marked.min.js"
// development: 
import O_json_to_html from "../o_json_to_html/o_json_to_html.module.js";
import O_overlay_textbox from "../o_overlay_textbox/o_overlay_textbox.module.js";
window.O_overlay_textbox = O_overlay_textbox

// var o_overlay_textbox = new O_overlay_textbox();

class O_api_endpoint{
    constructor(
        s_name = "annotations", 
        s_url_template_literal = "http://nova.astrometry.net/api/jobs/${data.n_job_id}/annotations/",
        _o_data = {}
    ){
        this.s_url_template_literal = s_url_template_literal
        this.s_url = s_url_template_literal 
        this.s_name = s_name
        this.o_data = _o_data
    }

    get o_data(){
        return this._o_data
    }
    set o_data(value){
        this._o_data = value; 
        var s_string = new Function(`
            return '`+this.s_url+`'
        `).apply(this);
        this.s_url = s_string
    }
}
class O_astrometrynet_js_tool{
    constructor(){
        var self = this
        this.o_json_to_html = new O_json_to_html()
        this.a_o_api_endpoint = [
            new O_api_endpoint(
                "annotations", 
                "http://nova.astrometry.net/api/jobs/${data.n_job_id}/annotations/", 
                {
                    n_job_id: 5853832
                }
            )
        ]
        this.o_hovered_element = {
            o_html_element: null, 
            o_computed_style: null, 
            o_computed_style_property_values: {}
        }
        this.o_data = {
            s_input_url : "url: example : https://nova.astrometry.net/user_images/6423213", 
            "o_getter_setter": {
                "f_setter_s_input_url": function(val){
                    // val //  for example https://nova.astrometry.net/user_images/5854211#original
                    var s_job_id = val.toString().split("#").shift().split("/").pop()
                    var n_job_id = parseInt(s_job_id); 
                    console.log(n_job_id);
                    self.n_job_id = n_job_id
                }
            },
            n_job_id: 6423213,
            s_image_url: "https://nova.astrometry.net/grid_display/6423213", 
            
            
        }
        this.s_image_url_template_literal = "https://nova.astrometry.net/grid_display/${jobid}"
        
        this.o_element = this.f_o_html_element();

        document.body.appendChild(this.o_element)
        
        this.o_html_element = this.o_element.querySelector("."+this.s_class_name)
        var self = this
        this.f_on_mouse_move = function(event){
            
            
        }
        this.f_on_wheel = function(e){

            console.log("f_on_wheel called");

        }
        this.f_add_event_listeners()


    }
    get n_job_id(){
        return this._n_job_id
    }
    set n_job_id(value){
        this.o_data.s_image_url = this.s_image_url_template_literal.replace('${jobid}', value)
        this._n_job_id = value
    }

    f_on_mousedown(event){
        var self = this;
        console.log("f_on_mousedown called");
    }
    f_on_mouseup(){
        var self = this
        console.log("f_on_mouseup called");
    }

    f_o_html_element(){
        return this.o_json_to_html.f_o_javascript_object_to_html(
            {
                s_t: "div", 
                a_c: [
                    {
                        "s_t": "label", 
                        "innerHTML<>": "n_job_id", 
                        // "s_o_overlay_textbox": "asdf"
                    },
                    {
                        "class": this.s_class_name,
                        "s_t": "input", 
                        "s_o_overlay_textbox": "asdf",
                        "value<>": "n_job_id", 

                    },
                    {
                        "class": "img", 
                        "a_c":[
                            {
                                "s_t": "img", 
                                "src<>": "s_image_url"
                            }
                        ]
                    },
                    {
                        "s_t": "style", 
                        "s_inner_html": `
                            .${this.s_class_name}{
                                position:fixed; 
                                z-index:1; 
                                background:rgba(3,3,3,0.8);
                                color:rgba(243, 243,243, 0.9);
                                margin:${this.n_px_margin}px;
                                font-family: arial;
                                top:0; 
                                left:0;
                            }
                            .${this.s_class_name} p{
                                margin: auto;
                            }
                            .${this.s_class_name} iframe{
                                max-width:100%
                            }
                        `
                    }
                ]
            }
          ,
          this,
          "o_data" 
        )
    }
    f_add_event_listeners(){
        window.addEventListener("mousemove", this.f_on_mouse_move)
        window.addEventListener("wheel",this.f_on_wheel.bind(this), { passive: false } )
        window.addEventListener("mousedown",this.f_on_mousedown.bind(this), { passive: false } )
        window.addEventListener("mouseup",this.f_on_mouseup.bind(this), { passive: false } )
    }
    f_remove_event_listeners(){
        window.removeEventListener("mousemove", this.f_on_mouse_move)
        window.removeEventListener("wheel",this.f_on_wheel.bind(this), { passive: false } )
        window.removeEventListener("mousedown",this.f_on_mousedown.bind(this), { passive: false } )
        window.removeEventListener("mouseup",this.f_on_mouseup.bind(this), { passive: false } )
    
    }


}




export default O_astrometrynet_js_tool