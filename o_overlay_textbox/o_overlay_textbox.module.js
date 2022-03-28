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

import marked from "marked"
// import "https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.2/marked.min.js"

// console.log(marked)
window.marked = marked

// development: 
import o_json_to_html from "../o_json_to_html/o_json_to_html.module.js";

class O_overlay_textbox{

    constructor(){
        var self = this 
        this.s_class_name = this.constructor.name.toLowerCase() 
        this.s_attribute_name = "s_"+this.constructor.name.toLowerCase() 
        this.n_px_max_width = 350;
        this.n_px_margin = 20
        this.o_cached_s_text_html_content = null
        this.o_element = this.f_o_html_element();

        document.body.appendChild(this.o_element)
        this.o_html_element = this.o_element.querySelector("."+this.s_class_name)

        this.f_on_mouse_move = function(event){

            // console.log(event.target)
            if(!self.o_html_element.contains(
                event.target
            )){
                self.o_html_element.style.display = "none"; 
            }
            
            // console.log(event.target)

            var s_text = event.target.getAttribute(self.s_attribute_name)
            if(s_text){

                if(self.o_event_target_last != event.target){
                    console.log("asdf")
                    self.o_cached_s_text_html_content = marked.parse(s_text);
                    self.o_html_element.innerHTML = self.o_cached_s_text_html_content
                    self.o_event_target_last = event.target;
                }
                

                if(s_text){
                    self.o_html_element.style.display = "block"; 
                    self.o_html_element.style.left = event.clientX+"px"
                    self.o_html_element.style.top = event.clientY+"px"
                }
                
                // if at bottom or at right side of page
                var o_html_element_bounding_rect = self.o_html_element.getBoundingClientRect()
    
                if(event.clientY + o_html_element_bounding_rect.height + self.n_px_margin > window.innerHeight){
                    self.o_html_element.style.top = (event.clientY-(o_html_element_bounding_rect.height))+"px"
                }
                if(event.clientX + o_html_element_bounding_rect.width + self.n_px_margin > window.innerWidth){
                    var o_html_element_bounding_rect = self.o_html_element.getBoundingClientRect()
                    // console.log(o_html_element_bounding_rect.width)
                    console.log(self.o_html_element.style.left)
                    console.log(self.o_html_element.getBoundingClientRect().width)
                    self.o_html_element.style.left = (event.clientX-(o_html_element_bounding_rect.width + self.n_px_margin*2))+"px"
                    // self.o_html_element.style.left = event.clientX-(o_html_element_bounding_rect.width)+"px"
                }

            }

        }
        this.f_add_event_listeners()
    }

    f_o_html_element(){
        return o_json_to_html.f_javascript_object_to_html(
            {
                t: "div", 
                c: [
                    {
                        "class": this.s_class_name,
                    },
                    {
                        "t": "style", 
                        "s_inner_html": `
                            .${this.s_class_name}{
                                position:fixed; 
                                z-index:1; 
                                background:rgba(3,3,3,0.8);
                                color:rgba(243, 243,243, 0.9);
                                margin:${this.n_px_margin}px;
                                padding: 0.9rem;
                                max-width: ${this.n_px_max_width}px;
                                font-family: arial; 
                            }
                            .${this.s_class_name} p{
                                margin: auto;
                            }
                            .${this.s_class_name} iframe{
                                max-width:100%
                            }
                        `
                        // .split("\n").join("")
                    }
                ]
            }
        )
    }

    f_add_event_listeners(){
        window.addEventListener("mousemove", this.f_on_mouse_move)
    }
    f_remove_event_listeners(){
        window.removeEventListener("mousemove", this.f_on_mouse_move)
    }


}
var o_overlay_textbox = new O_overlay_textbox()

export default o_overlay_textbox