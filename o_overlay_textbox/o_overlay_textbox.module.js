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

import  "./node_modules/marked/marked.min.js"
// import "https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.2/marked.min.js"

// development: 
import O_json_to_html from "../o_json_to_html/o_json_to_html.module.js";

class O_overlay_textbox{

    constructor(){
        var self = this 
        this.o_data = {
            o_overlay:{
                o_style: {

                    "left": '20px', 
                    "top": "20px",
                    "display": "block", 
                    // "margin":"20px",

                },
                n_margin_px: 20, 
                s_inner_html: "initial test", 
            },
            o_html_element_target: null,
            s_box_shadow_cached: null,
        }
        this.o_json_to_html = new O_json_to_html()
        this.s_class_name = this.constructor.name.toLowerCase() 
        this.s_attribute_name = "s_"+this.constructor.name.toLowerCase() 
        this.s_class_name_hovered_element = this.s_attribute_name+"_hovered_element"; 
        this.o_cached_s_text_html_content = null


        this.o_element = this.f_o_html_element();
        document.body.appendChild(this.o_element)

        this.o_html_element = this.o_element.querySelector("."+this.s_class_name)

        this.f_on_mouse_move = function(event){
 
            if(!self.o_html_element.contains(
                event.target
            )){
                self.o_data.o_overlay.o_style.display = "none"

            }
            

            var s_text = event.target.getAttribute(self.s_attribute_name)

            if(s_text){

                if(self.o_data.o_html_element_target != event.target){

                    self.o_cached_s_text_html_content = marked.parse(s_text);
                    self.o_data.o_overlay.s_inner_html = self.o_cached_s_text_html_content

                    self.o_data.o_html_element_target?.classList.remove(self.s_class_name_hovered_element)
                    self.o_data.o_html_element_target = event.target;
                    self.o_data.o_html_element_target.classList.add(self.s_class_name_hovered_element)

                }
                

                if(s_text){
                    self.o_data.o_overlay.o_style.display = "block"; 

                }
                    
                
                // if at bottom or at right side of page
                var o_html_element_bounding_rect = self.o_html_element.getBoundingClientRect()
                var o_html_element_bounding_rect_with_margin = JSON.parse(JSON.stringify(o_html_element_bounding_rect))
                o_html_element_bounding_rect_with_margin.width = o_html_element_bounding_rect_with_margin.width + self.o_data.o_overlay.n_margin_px
                o_html_element_bounding_rect_with_margin.height = o_html_element_bounding_rect_with_margin.height + self.o_data.o_overlay.n_margin_px
                o_html_element_bounding_rect_with_margin.left = o_html_element_bounding_rect_with_margin.left - (self.o_data.o_overlay.n_margin_px/2)
                o_html_element_bounding_rect_with_margin.top = o_html_element_bounding_rect_with_margin.top - (self.o_data.o_overlay.n_margin_px/2)

                var n_delta_bottom_y = window.innerHeight - (event.clientY + o_html_element_bounding_rect_with_margin.height) 
                var n_delta_top_y = 0 - (o_html_element_bounding_rect_with_margin.height - event.clientY)
                // if(Math.abs(n_delta_bottom_y) >  Math.abs(n_delta_top_y)){
                //     var n_top = (event.clientY-(o_html_element_bounding_rect_with_margin.height))
                // }else{
                //     var n_top = event.clientY + self.o_data.o_overlay.n_margin_px 
                // }

                // var n_delta_right_x = window.innerWidth - (event.clientX + o_html_element_bounding_rect_with_margin.width)
                // var n_delta_left_x = 0 - (o_html_element_bounding_rect_with_margin.width - event.clientX)
                // if(Math.abs(n_delta_right_x) >  Math.abs(n_delta_left_x)){
                //     var n_left = event.clientX + self.o_data.o_overlay.n_margin_px  
                // }else{
                //     var n_left = (event.clientX-(o_html_element_bounding_rect_with_margin.width))
                // }
            
                var n_top = event.clientY + self.o_data.o_overlay.n_margin_px 
                var n_left = event.clientX + self.o_data.o_overlay.n_margin_px  

                self.o_data.o_overlay.o_style.top = n_top+"px"
                self.o_data.o_overlay.o_style.left = n_left+"px"

            }

        }


        this.f_add_event_listeners()
        
    }

    f_o_html_element(){
        return this.o_json_to_html.f_o_javascript_object_to_html(
            {
                s_t: "div", 
                a_c: [
                    {
                        "class": this.s_class_name,
                        "style<>": "o_overlay.o_style",
                        "innerHTML<>": "o_overlay.s_inner_html"
                    },
                    {
                        "s_t": "style", 
                        "s_inner_html": `
                            .${this.s_class_name}{
                                position:fixed; 
                                z-index:1; 
                                background:rgba(3,3,3,0.8);
                                color:rgba(243, 243,243, 0.9);
                                padding: 0.9rem;
                                font-family: arial; 
                                box-shadow: rgb(0 0 0 / 30%) 0px 2px 5px 6px;
                                max-width: 400px;
                                width: auto;
                                min-width: 180px;
                            }
                            .${this.s_class_name} p{
                                margin: auto;
                            }
                            .${this.s_class_name} iframe{
                                max-width:100%
                            }
                            .${this.s_class_name_hovered_element}{
                                box-shadow: rgb(0 0 0 / 30%) 0px 2px 5px 6px;
                            }
                        `
                        // .split("\n").join("")
                    }
                ]
            }, 
            this, 
            "o_data"
        )

    }

    f_add_event_listeners(){
        window.addEventListener("mousemove", this.f_on_mouse_move)
    }
    f_remove_event_listeners(){
        window.removeEventListener("mousemove", this.f_on_mouse_move)
    }


}
// var o_overlay_textbox = new O_overlay_textbox()

export default O_overlay_textbox