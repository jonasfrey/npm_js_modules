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
        s_url_template_literal = "https://nova.astrometry.net/api/jobs/${this.o_data.n_job_id}/annotations/",
        _o_data = {}
    ){
        this.s_url_template_literal = s_url_template_literal
        this.s_url = s_url_template_literal 
        this.s_name = s_name
        var self = this
        this.o_data = new Proxy(_o_data, {
            set: function(obj, s_prop, val){
                var f_s_string = new Function(`
                    return \``+self.s_url_template_literal+`\`
                `)
                console.log(f_s_string)
                var s_string = f_s_string.apply(self);
                console.log(s_string)
                self.s_url = s_string
                return Reflect.set(obj, s_prop, val)
            }
        })
    }

    // get o_data(){
    //     return this._o_data
    // }
    // set o_data(value){
    //     this._o_data = value; 
    //     var s_string = new Function(`
    //         return '`+this.s_url_template_literal+`'
    //     `).apply(this);
    //     console.log(s_string)
    //     debugger
    //     this.s_url = s_string
    // }
}
class O_astrometrynet_js_tool{
    constructor(){
        var self = this
        this.o_json_to_html = new O_json_to_html()
        this.a_o_api_endpoint = [
            new O_api_endpoint(
                "annotations", 
                "https://nova.astrometry.net/api/jobs/${this.o_data.n_job_id}/annotations/", 
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
                "f_setter_n_job_id": function(value_old, object, s_prop, o_value){
                    // val //  for example https://nova.astrometry.net/user_images/5854211#original
                    // var s_job_id = val.toString().split("#").shift().split("/").pop()
                    // var n_job_id = parseInt(s_job_id);
                    var n_job_id = parseInt(o_value.value);
                    self.n_job_id = n_job_id
                }
            },
            n_job_id: 6423213,
            s_image_url: "https://nova.astrometry.net/grid_display/6423213", 
            o_overlay: {
                s_inner_html: "hello", 
                o_style: {
                    display:"block", 
                    position:"fixed", 
                    top: "0px", 
                    left:"0px"
                }
            },
            a_annotations: []
            
            
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
        
        var o_api_endpoint = this.a_o_api_endpoint.filter(o=>o.s_name == "annotations")[0];
        if(o_api_endpoint){
            o_api_endpoint.o_data.n_job_id = value;
        }
        fetch(o_api_endpoint.s_url,  {mode: 'no-cors'})
        .then(response => {console.log(response); response.text()})
        .then(data => console.log(data));
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
                // onmousemove: function(){
                //     this.o_overlay.o_style.display = "none"
                // },
                a_c: [
                    {
                        "class": "o_html_element_overlay", 
                        "innerHTML<>": "o_overlay.s_inner_html",
                        "style<>": "o_overlay.o_style"
                    },
                    {
                        "s_t": "label", 
                        "innerHTML<>": "n_job_id", 
                        // "s_o_overlay_textbox": "asdf"
                    },
                    {
                        "class": this.s_class_name,
                        "s_t": "input", 
                        onmousemove: function(){
                            console.log("mousemove called")

                            if(this.o_overlay?.o_style?.display){
                                this.o_overlay.o_style.left = window.event.clientX+"px"
                                this.o_overlay.o_style.top = window.event.clientY+"px"
                                this.o_overlay.s_inner_html = "<img src='o_astrometrynet_js_tool/astronometrynet_jobid.png'>"
                            }
                        },
                        onmouseenter: function(){
                            console.log("mouseenter called")
                            // this.o_overlay.o_style.display = "block"
                            if(this.o_overlay?.o_style?.display){
                                this.o_overlay.o_style.display = "block"
                                // console.log(this.o_overlay.o_style.display)
                            }
                        }, 
                        onmouseleave: function(){
                            console.log("mouseleave called")
                            if(this.o_overlay?.o_style?.display){
                                this.o_overlay.o_style.display = "none"
                                // console.log(this.o_overlay.o_style.display)
                            }
                        },
                        // somehow the implementation of o_overlay_textbox is pretty laggy it seems like it has interferences with f_a_link_object_properties from this o_astrometry_js_tool library... thats why i use custom overlay here

                        //"s_o_overlay_textbox": "![/o_astrometrynet_js_tool/astronometrynet_jobid.png](/o_astrometrynet_js_tool/astronometrynet_jobid.png)",
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