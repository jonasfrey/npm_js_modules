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

class O_overlay_imgzoombox{

    constructor(){
        var self = this 
        this.o_json_to_html = new O_json_to_html()
        this.s_class_name = this.constructor.name.toLowerCase() 
        this.s_attribute_name = "s_"+this.constructor.name.toLowerCase() 
        this.n_px_max_width = 350;
        this.n_px_margin = 20
        this.o_cached_s_text_html_content = null
        this.o_canvas = document.createElement("canvas")
        this.o_canvas_context = this.o_canvas.getContext("2d"); 
        this.o_target = null
        this.o_data = {

            b_drag_locked: false, 
            o_mouse: {
                o_position_relative_to_img: {
                    n_x_normalized: 0, 
                    n_x: 0, 
                    n_y_normalized: 0, 
                    n_y: 0,
                    o_image_bounding_rect: {},
                }, 
                o_position_relative_to_window: {
                    n_x_normalized: 0, 
                    n_x: 0, 
                    n_y_normalized: 0, 
                    n_y: 0,
                },
                o_position_relative_to_window_last: {}, 
                o_pixel_hovered_rgba: {
                    n_r: 0, 
                    n_g: 0, 
                    n_b: 0, 
                    n_a: 0,
                    n_n_rgba_max: 255, //(Uint8) 
                }, 
            },
            o_overlay_box: {
                o_style: {
                    "left": 0,
                    "top": 0,
                },
            },
            o_img_preview: {
                n_scale_factor : 1, // 500% 
                o_style: {
                    s_style_inline: "background-image:url(...)"
                },
                n_zoom_factor:1,
            },
            o_image: {
                n_factor_normalizing_x: 1, 
                n_factor_normalizing_y: 1, 
                n_ratio_width_to_height: 0, 
                n_width: 0, 
                n_height: 0,
                a_image_data: [], // array of [r, g, b, a, r, g, b, a, ...]
                s_url: '', 
            },
            a_o_image: [

            ]
        }
        this.o_element = this.f_o_html_element();

        document.body.appendChild(this.o_element)
        
        this.o_html_element = this.o_element.querySelector("."+this.s_class_name)
        var self = this
        this.f_on_mouse_move = function(event){
            self.o_target = event.target

            // console.log(event.target)
            self.o_data.o_mouse.o_position_relative_to_window_last = JSON.parse(JSON.stringify(self.o_data.o_mouse.o_position_relative_to_window))
            self.o_data.o_mouse.o_position_relative_to_window.n_x = event.clientX
            self.o_data.o_mouse.o_position_relative_to_window.n_y = event.clientY
            self.o_data.o_mouse.o_position_relative_to_window.n_x_normalized = event.clientY / window.innerWidth
            self.o_data.o_mouse.o_position_relative_to_window.n_y_normalized = event.clientY / window.innerHeight

            self.f_calculate_mouse_position_relative_to_image(event)


            self.f_handle_drag()

            if(self.o_html_element.contains(
                self.o_target
            )){
                self.f_on_mouse_move_o_html_element(event) 
                return
            }
            var s_url  = ''

            if(self.o_target.tagName == "IMG"){
                s_url = self.o_target.src
                
            }
            if(self.o_target.tagName != "IMG"){
                //
                var o_computed_style = window.getComputedStyle(self.o_target); 
                var s_background_image = o_computed_style.getPropertyValue("background-image")
                // console.log(s_background_image)
                // console.log(s_background_image)
                
                s_url = self.f_s_extract_uri_from_css_background_image_propval(s_background_image)
            }
            if(!s_url){
                return false
            }


            var o_image = self.o_data.a_o_image.filter(o=>o.s_url == s_url)[0]
            
            if(
                !o_image
                ){

                self.o_data.o_image.s_url = s_url 
                self.o_data.a_o_image.push(Object.assign({}, self.o_data.o_image))
                self.f_do_canvas_stuff(event)
            }
            if(o_image){
                self.o_data.o_image = o_image
            }
            // self.o_data.o_image = o_image
            self.f_calculate_style()

            // console.log(s_url)

            
        }
        this.f_on_wheel = function(e){

            self.o_target = e.target
            if(self.o_html_element.contains(
                self.o_target
            )){
                
                e.preventDefault();
                e.stopImmediatePropagation()
                // console.log(e.deltaY)
                self.o_data.o_img_preview.o_style.n_scale_factor = 
                    self.o_data.o_img_preview.o_style.n_scale_factor + (e.deltaY * self.o_data.o_img_preview.o_style.n_scale_factor*0.001 * -1)
                self.o_data.o_img_preview.o_style.n_scale_factor = 
                    Math.max(0.005, self.o_data.o_img_preview.o_style.n_scale_factor)
                self.o_data.o_img_preview.o_style.n_scale_factor = 
                    Math.min(100, self.o_data.o_img_preview.o_style.n_scale_factor)
                self.f_calculate_style()    
            }
        }
        this.f_add_event_listeners()

        self.f_calculate_style()
        self.o_data.o_overlay_box.o_style.s_style_inline = `left:${self.o_data.o_overlay_box.o_style.n_left}px;top:${self.o_data.o_overlay_box.o_style.n_top}px;`

    }
    f_handle_drag(){
        var self = this
        var mouse_delta_x = self.o_data.o_mouse.o_position_relative_to_window.n_x - self.o_data.o_mouse.o_position_relative_to_window_last.n_x
        var mouse_delta_y = self.o_data.o_mouse.o_position_relative_to_window.n_y - self.o_data.o_mouse.o_position_relative_to_window_last.n_y
        
        if(self.o_data.b_drag_locked){
            self.o_data.o_overlay_box.o_style.n_left += mouse_delta_x
            self.o_data.o_overlay_box.o_style.n_top += mouse_delta_y            
            self.o_data.o_overlay_box.o_style.s_style_inline = `left:${self.o_data.o_overlay_box.o_style.n_left}px;top:${self.o_data.o_overlay_box.o_style.n_top}px;`
        }
    }
    f_on_mousedown(event){
        var self = this;
        
        if(self.o_html_element.contains(
            event.target
        )){
            console.log('asdf')
            event.preventDefault()
            self.o_data.b_drag_locked = true; 
        }
    }
    f_on_mouseup(){
        var self = this
        self.o_data.b_drag_locked = false; 
    }
    f_set_pixel_rgba(){
        
    }
    f_do_canvas_stuff(event){
        var self = this
        self.f_get_image_data(event, true, function(){
            console.warn(`cannot get pixel information for image with url ${self.o_data.o_image.s_url},because No 'Access-Control-Allow-Origin' header is present on the server hosting the image`)
            self.f_get_image_data(event, false)
        }) 
    }
    
    f_get_image_data(event, b_cross_origin_anonymous = true, f_on_error){
        var self = this
        var o_img = document.createElement("img");
        if(b_cross_origin_anonymous){
            o_img.crossOrigin = 'anonymous';
        }
        o_img.onload = function(){
            console.log("onload")
            self.o_data.o_image.n_width = this.width; 
            self.o_data.o_image.n_height = this.height; 
            
            console.log(self.o_data.o_image.n_width)
            self.o_canvas.width = this.width;
            self.o_canvas.height = this.height;

            self.o_canvas_context.drawImage(o_img, 0, 0, this.width, this.height);
            var a_pixel_data = self.o_canvas_context.getImageData(0, 0, this.width, this.height).data;
            self.o_data.o_image.a_image_data = a_pixel_data


        }
        o_img.onerror = function(){

            f_on_error()
        }

        o_img.src = self.o_data.o_image.s_url

    }
    f_calculate_mouse_position_relative_to_image(event){
        var self = this
        //calculating image position
        var o_computed_style = window.getComputedStyle(self.o_target); 
        var s_background_size = o_computed_style.getPropertyValue("background-size")
        var s_background_position = o_computed_style.getPropertyValue("background-position")
        self.o_data.o_mouse.o_image_bounding_rect = self.o_target.getBoundingClientRect()
        self.o_data.o_mouse.o_position_relative_to_img.n_x = parseInt(event.clientX - self.o_data.o_mouse.o_image_bounding_rect.left)
        self.o_data.o_mouse.o_position_relative_to_img.n_y = parseInt(event.clientY - self.o_data.o_mouse.o_image_bounding_rect.top)
        
        self.o_data.o_mouse.o_position_relative_to_img.n_x_normalized = self.o_data.o_mouse.o_position_relative_to_img.n_x / self.o_data.o_mouse.o_image_bounding_rect.width
        self.o_data.o_mouse.o_position_relative_to_img.n_y_normalized = self.o_data.o_mouse.o_position_relative_to_img.n_y / self.o_data.o_mouse.o_image_bounding_rect.height 
        
       
        //if the image is a background image set to 'contain' we cannot just normalize x and y 
        var n_ratio_width_to_height = self.o_data.o_image.n_width / self.o_data.o_image.n_height; 

        self.o_data.o_image.n_factor_normalizing_x = 1
        self.o_data.o_image.n_factor_normalizing_y = 1

        if(
            s_background_size.toLowerCase() == "contain"
        ){
            
            if(self.o_data.o_image.n_ratio_width_to_height < 1){
                self.o_data.o_image.n_factor_normalizing_x = 1 / self.o_data.o_image.n_ratio_width_to_height
            }
            if(self.o_data.o_image.n_ratio_width_to_height > 1){
                self.o_data.o_image.n_factor_normalizing_y = self.o_data.o_image.n_ratio_width_to_height
            }
            
        }

        self.o_data.o_mouse.o_position_relative_to_img.n_x_normalized = 
            self.o_data.o_mouse.o_position_relative_to_img.n_x_normalized * self.o_data.o_image.n_factor_normalizing_x
        self.o_data.o_mouse.o_position_relative_to_img.n_y_normalized = 
            self.o_data.o_mouse.o_position_relative_to_img.n_y_normalized * self.o_data.o_image.n_factor_normalizing_y
    }
    f_calculate_style(){
        var self = this


        var o_image_parent_bounding_rect = document.querySelector(".img_preview").getBoundingClientRect()

        var n_offset_x_perc = 
            self.o_data.o_mouse.o_position_relative_to_img.n_x_normalized * 100 
            
        var n_offset_y_perc = 
            self.o_data.o_mouse.o_position_relative_to_img.n_y_normalized * 100 

        var self = this

        var n_border_translation_x_factor = (self.o_data.o_mouse.o_position_relative_to_img.n_x_normalized  -0.5) * -1
        var n_border_translation_y_factor = (self.o_data.o_mouse.o_position_relative_to_img.n_y_normalized  -0.5) * -1
        var n_border_offset_x_px = (o_image_parent_bounding_rect.width) * n_border_translation_x_factor
        var n_border_offset_y_px = (o_image_parent_bounding_rect.height) * n_border_translation_y_factor
        
        // console.log(self.o_data.o_mouse.o_position_relative_to_img.n_x_normalized)
        var s_style_inline =  ""
        s_style_inline+=`background-image:url(${self.o_data.o_image.s_url});`
        s_style_inline+=`background-size:${self.o_data.o_img_preview.o_style.n_scale_factor*100}%;`
        s_style_inline+=`background-position:calc(${n_offset_x_perc}% + ${n_border_offset_x_px}px ) calc(${n_offset_y_perc}% + ${n_border_offset_y_px}px );`
        
        // s_style_inline+=`transform:translate(${n_border_translation_x_factor*100}%,${n_border_translation_y_factor*100}%);`
        // s_style_inline+=`background-position-x:${n_offset_x_perc}%, left;`// origin top
        // s_style_inline+=`background-position-y:${n_offset_y_perc}%, top;`//origin left
        self.o_data.o_img_preview.o_style.s_style_inline = s_style_inline


        // // var img_preview = document.querySelector(".img_preview");
        // // var o_image_bounding_rect_img_preview = img.getBoundingClientRect()
        // s_style_inline2+=`width: ${self.o_data.o_img_preview.o_style.n_scale_factor*100}%;`
        // self.o_data.o_img_preview.o_style.s_style_inline2 = s_style_inline2

        // var img = document.querySelector(".img_element");
        // var img_parent = document.querySelector(".img_element").parentElement;
        // var o_image_bounding_rect = img.getBoundingClientRect()
        // var o_image_parent_bounding_rect = img_parent.getBoundingClientRect()
        // var s_style_inline2 =  ``

        // var n_border_translation_x = 
        //     (self.o_data.o_mouse.o_position_relative_to_img.n_x_normalized -0.5) * -1 *
        //     (o_image_bounding_rect.width / o_image_parent_bounding_rect.width) *
        //     o_image_bounding_rect.width
        // // var n_factor_translation_y = (self.o_data.o_mouse.o_position_relative_to_img.n_y_normalized -0.5) * -1
        // var n_left = self.o_data.o_mouse.o_position_relative_to_img.n_x_normalized*o_image_bounding_rect.width + n_border_translation_x
        // // var n_top = n_factor_translation_y*(100 *self.o_data.o_img_preview.o_style.n_scale_factor)*(o_image_bounding_rect.height/o_image_bounding_rect.width)
        // console.log(n_left)
        // s_style_inline2+=`left: ${(n_left)}px;`
        // // s_style_inline2+=`top: ${(n_top)}%;`

        // s_style_inline2+=`width: ${self.o_data.o_img_preview.o_style.n_scale_factor*100}%;`
        // self.o_data.o_img_preview.o_style.s_style_inline2 = s_style_inline2

    }

    f_on_mouse_move_o_html_element(event){
        // console.log(event)
        // window.event.preventDefault()
        // console.log("mm")
    }

    f_s_extract_uri_from_css_background_image_propval(string){
        try {
            
            var s_url = string.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
            // var urlMatchingRegex = /[:,\s]\s*url\s*\(\s*(?:'(\S*?)'|"(\S*?)"|((?:\\\s|\\\)|\\\"|\\\'|\S)*?))\s*\)/gi;
            // var s_url = string.match(urlMatchingRegex)
            return s_url
        } catch (error) {
            return false 
        } 
    }
    f_o_html_element(){
        return this.o_json_to_html.f_javascript_object_to_html(
            {
                t: "div", 
                c: [
                    {
                        "class": this.s_class_name,
                        "style<>": "o_overlay_box.o_style",
                        "c": [
                            {
                                "class": "top bar", 
                                "c": [
                                    {
                                        "class": "mouse position", 
                                        "c": [
                                            {
                                                "innerText":"x: "
                                            },
                                            {
                                                "innerText<>":"o_mouse.o_position_relative_to_img.n_x"
                                            },
                                            {
                                                "innerText":"y: "
                                            },
                                            {
                                                "innerText<>":"o_mouse.o_position_relative_to_img.n_y"
                                            },
                                        ], 
                                    }, 
                                    {
                                        "class": "mouse pixel", 
                                        "c": [
                                            {
                                                "class": "r", 
                                                "c" : [
                                                    {
                                                        "s_inner_text": "r:"
                                                    }, 
                                                    {
                                                        "innerText<>": "o_mouse.o_pixel_hovered_rgba.n_r"
                                                    },
                                                ]
                                            },
                                            {
                                                "class": "g", 
                                                "c" : [
                                                    {
                                                        "s_inner_text": "g:"
                                                    }, 
                                                    {
                                                        "innerText<>": "o_mouse.o_pixel_hovered_rgba.n_g"
                                                    },
                                                ]
                                            },
                                            {
                                                "class": "b", 
                                                "c" : [
                                                    {
                                                        "s_inner_text": "b:"
                                                    }, 
                                                    {
                                                        "innerText<>": "o_mouse.o_pixel_hovered_rgba.n_b"
                                                    },
                                                ]
                                            },
                                            {
                                                "class": "a", 
                                                "c" : [
                                                    {
                                                        "s_inner_text": "a:"
                                                    }, 
                                                    {
                                                        "innerText<>": "o_mouse.o_pixel_hovered_rgba.n_a"
                                                    },
                                                ]
                                            },
                                            {
                                                "class": "n_rgba_max", 
                                                "innerText<>": "o_mouse.o_pixel_hovered_rgba.n_n_rgba_max"
                                            }
                         
                                        ]
                                    },
                                    {
                                        "class": "open_in_new_tab",
                                        "c" :[
                                            {
                                                "t": "i",
                                                "class": "fa-solid fa-image",
                                            },
                                            {
                                                "t": "i",
                                                "class": "fa-solid fa-up-right-from-square",
                                            }
                                        ]
                                    },
                                    {
                                        "class": "expand",
                                        "onclick": function(){
                                            this.b_expanded = !this.b_expanded
                                        }
                                    },

                                ]
                            }, 
                            {
                                "class": "img_preview", 
                                "c": [
                                    {
                                        "class": "backgroundimage",
                                        "style<>": "o_img_preview.o_style.s_style_inline",
                                    },
                                    // {
                                    //     "class": "img_element", 
                                    //     "t": "img", 
                                    //     "src<>": "o_image.s_url", 
                                    //     "style<>": "o_img_preview.o_style.s_style_inline2",
                                    // },
                                ]
                            },
                            {
                                "class": "bottom bar",
                                "c": [
                                    {
                                        "class": "zoom factor",
                                        "c": [
                                            {
                                                "s_inner_text": "mousewheel to change zoom factor: "
                                            },
                                            {
                                                "innerText<>": "o_img_preview.n_scale_factor"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]

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
                                top:0; 
                                left:0;
                            }
                            .${this.s_class_name} p{
                                margin: auto;
                            }
                            .${this.s_class_name} iframe{
                                max-width:100%
                            }
                            
                            .img_preview {
                                overflow:hidden;
                                width: 100%;
                                padding-top: 100%;
                                position:relative;
                                border:1px solid red; 
                            }
                            .backgroundimage{
                                /*background-attachment: fixed;*/
                                width:100%;
                                height: 100%;
                                position:absolute;
                                top:0; 
                                left:0;
                                background-size: contain;
                                background-repeat: no-repeat;                            
                                image-rendering: pixelated;
                            }
                            .img_element {
                                position:absolute;
                                top:0; 
                                left:0;
                                width:100%; 
                                height:auto;
                                image-rendering: pixelated;
                            }
                        `
                    }
                ]
            }
          ,this.o_data
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




export default O_overlay_imgzoombox