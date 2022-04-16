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

class O_image{
    constructor(){
    
        this.n_factor_normalizing_x =  1
        this.n_factor_normalizing_y =  1
        this.n_ratio_n_width_to_n_height =  0
        this.n_ratio_n_height_to_n_width =  0 
        this.n_width =  0
        this.n_height =  0
        this.o_pixel_data = null; //this.o_pixel_data.data //will be array of [r, g, b, a, r, g, b, a, ...]
        this.n_pixel_data_max = 0; // Math.pow(2,(this.o_pixel_data.data.BYTES_PER_ELEMENT * 8)) 2^8 , 2^16, 2^32
        this.s_url =  ''
        this.o_image_pixel_hovered = new O_image_pixel()
        this.o_mouse_position_preview_image_style = {
            "aspect-ratio":"1 / 1"
        }

    }
    f_update_o_image_pixel_hovered(n_x, n_y){
        var n_index = (n_x + n_y * this.o_pixel_data.width) * 4 // 4 because [r,g,b,a,r,g,b,a...] 4 items per pixel
        var self = this

        self.o_image_pixel_hovered.n_n_rgba_max = self.n_pixel_data_max
        self.o_image_pixel_hovered.n_n_rgba_max = self.n_pixel_data_max
        self.o_image_pixel_hovered.n_r = self.o_pixel_data.data[n_index+0]
        self.o_image_pixel_hovered.n_g = self.o_pixel_data.data[n_index+1]
        self.o_image_pixel_hovered.n_b = self.o_pixel_data.data[n_index+2]
        self.o_image_pixel_hovered.n_a = self.o_pixel_data.data[n_index+3]
        self.o_image_pixel_hovered.n_r_normalized = self.o_image_pixel_hovered.n_r / self.o_image_pixel_hovered.n_n_rgba_max
        self.o_image_pixel_hovered.n_g_normalized = self.o_image_pixel_hovered.n_g / self.o_image_pixel_hovered.n_n_rgba_max
        self.o_image_pixel_hovered.n_b_normalized = self.o_image_pixel_hovered.n_b / self.o_image_pixel_hovered.n_n_rgba_max
        self.o_image_pixel_hovered.n_a_normalized = self.o_image_pixel_hovered.n_a / self.o_image_pixel_hovered.n_n_rgba_max
        
        self.o_image_pixel_hovered.n_r_normalized_tofixed3 = self.o_image_pixel_hovered.n_r_normalized.toFixed(3)
        self.o_image_pixel_hovered.n_g_normalized_tofixed3 = self.o_image_pixel_hovered.n_g_normalized.toFixed(3)
        self.o_image_pixel_hovered.n_b_normalized_tofixed3 = self.o_image_pixel_hovered.n_b_normalized.toFixed(3)
        self.o_image_pixel_hovered.n_a_normalized_tofixed3 = self.o_image_pixel_hovered.n_a_normalized.toFixed(3)

        self.o_image_pixel_hovered.n_r_normalized_o_style = {
            // height: (self.o_image_pixel_hovered.n_r_normalized*10)+'px', 
            width: (self.o_image_pixel_hovered.n_r_normalized*100)+'%', 
            "background-color": "red",
        };
        self.o_image_pixel_hovered.n_g_normalized_o_style = {
            // height: (self.o_image_pixel_hovered.n_g_normalized*10)+'px', 
            width: (self.o_image_pixel_hovered.n_g_normalized*100)+'%', 
            "background-color": "green",
        };
        self.o_image_pixel_hovered.n_b_normalized_o_style = {
            // height: (self.o_image_pixel_hovered.n_b_normalized*10)+'px', 
            width: (self.o_image_pixel_hovered.n_b_normalized*100)+'%', 
            "background-color": "blue",
        };
        self.o_image_pixel_hovered.n_a_normalized_o_style = {
            // height: (self.o_image_pixel_hovered.n_a_normalized*10)+'px', 
            width: (self.o_image_pixel_hovered.n_a_normalized*100)+'%', 
            "background-color": "rgba(244,244,244,0.5)",
        };

    }
}
window.O_image = O_image
class O_point_2_d{
    constructor(){
        this.n_x = 0 
        this.n_y = 0
        this.n_x_normalized = 0
        this.n_y_normalized = 0 
    }
}
class O_image_pixel{
    constructor(){
        this.n_r = 0;
        this.n_g = 0;
        this.n_b = 0;
        this.n_a = 0;
        this.n_r_normalized = 0;
        this.n_g_normalized = 0;
        this.n_b_normalized = 0;
        this.n_a_normalized = 0;
        this.n_r_normalized_tofixed3 = 0;
        this.n_g_normalized_tofixed3 = 0;
        this.n_b_normalized_tofixed3 = 0;
        this.n_a_normalized_tofixed3 = 0;

        this.n_r_normalized_o_style = {
            width: '10px', 
            height: '10px', 
            "background-color": "red",
        };
        this.n_g_normalized_o_style = {
            width: '10px', 
            height: '10px', 
            "background-color": "red",
        };
        this.n_b_normalized_o_style = {
            width: '10px', 
            height: '10px', 
            "background-color": "red",
        };
        this.n_a_normalized_o_style = {
            width: '10px', 
            height: '10px', 
            "background-color": "red",
        };
        this.n_n_rgba_max = 255;//255=>2^8 // if uint16 array, 65k(2^16)
    }

}
window.O_image_pixel = O_image_pixel 

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
        document.body.appendChild(this.o_canvas)
        this.o_hovered_element = {
            o_html_element: null, 
            o_computed_style: null, 
            o_computed_style_property_values: {}
        }
        this.o_data = {
            a:{
                b:{

                    n_r_normalized: 0, 
                    n_g_normalized: 0, 
                    n_b_normalized: 0, 
                    n_a_normalized: 0, 
                }
                
            },
            o_image_pixel_hovered: new O_image_pixel(),
            b_drag_locked: false, 
            o_mouse: {
                o_point_2_d_relative_to_img: new O_point_2_d(), 
                o_point_2_d_relative_to_window: new O_point_2_d(), 
                o_point_2_d_relative_to_window_last: new O_point_2_d(), 
                o_mouse_position_preview_image_mouse_cursor_style: {
                    left: "0%", 
                    top: "0%"
                }
            },
            o_overlay_box: {
                n_left: 0, 
                n_top: 0, 
                o_style: {
                    "left": 0,
                    "top": 0,
                },
            },
            o_img_zoomed: {
                n_scale_factor : 10, // 500% 
                o_style: {
                    backgroundImage:'url();',
                    backgroundSize:'100%;',
                    backgroundPosition:'calc();',
                    backgroundRepeat: 'no-repeat', 
                },
                n_zoom_factor:1,
                o_center: {
                    o_style: {
                        display:'block'
                    }
                }
            },
            
            o_image: new O_image(), 
            a_o_image: [

            ]
        }
        this.o_element = this.f_o_html_element();

        document.body.appendChild(this.o_element)
        
        this.o_html_element = this.o_element.querySelector("."+this.s_class_name)
        var self = this
        this.f_on_mouse_move = function(event){
            self.o_hovered_element.o_html_element = event.target

            // console.log(event.target)
            self.o_data.o_mouse.o_point_2_d_relative_to_window_last = self.o_data.o_mouse.o_point_2_d_relative_to_window

            self.o_data.o_mouse.o_point_2_d_relative_to_window.n_x = event.clientX
            self.o_data.o_mouse.o_point_2_d_relative_to_window.n_y = event.clientY
            self.o_data.o_mouse.o_point_2_d_relative_to_window.n_x_normalized = event.clientY / window.innerWidth
            self.o_data.o_mouse.o_point_2_d_relative_to_window.n_y_normalized = event.clientY / window.innerHeight

            self.f_calculate_mouse_position_relative_to_image(event)

            self.f_handle_drag()

            if(self.o_html_element.contains(
                self.o_hovered_element.o_html_element
            )){
                return
            }

            var s_url  = ''

            if(self.o_hovered_element.o_html_element.tagName == "IMG"){
                s_url = self.o_hovered_element.o_html_element.src
                
            }
            if(self.o_hovered_element.o_html_element.tagName != "IMG"){
                
                var o_computed_style = window.getComputedStyle(self.o_hovered_element.o_html_element); 
                var s_background_image = o_computed_style.getPropertyValue("background-image")
                
                s_url = self.f_s_extract_uri_from_css_background_image_propval(s_background_image)
            }
            if(!s_url){
                return false
            }
            var o_image = self.o_data.a_o_image.filter(o=>o.s_url == s_url)[0]
            if(
                !o_image
                ){
                self.o_data.o_image = new O_image()
                
                self.o_data.o_image.s_url = s_url
                self.o_data.a_o_image.push(self.o_data.o_image)
                self.f_do_canvas_stuff(event)
            }
            if(o_image){
                self.o_data.o_image = o_image
            }
            if(self.o_data.o_image){
                self.f_calculate_style()
            }

            if(self.o_data.o_image.o_pixel_data){


                self.o_data.o_image.f_update_o_image_pixel_hovered(
                    self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x, 
                    self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y 
                )
                // self.o_data.a.b.n_r_normalized = self.o_data.o_image.o_image_pixel_hovered.n_r_normalized 
                // self.o_data.a.b.n_g_normalized = self.o_data.o_image.o_image_pixel_hovered.n_g_normalized 
                // self.o_data.a.b.n_b_normalized = self.o_data.o_image.o_image_pixel_hovered.n_b_normalized 
                // self.o_data.a.b.n_a_normalized = self.o_data.o_image.o_image_pixel_hovered.n_a_normalized 
                
                self.o_data.o_image_pixel_hovered.n_r_normalized = self.o_data.o_image.o_image_pixel_hovered.n_r_normalized 
                self.o_data.o_image_pixel_hovered.n_g_normalized = self.o_data.o_image.o_image_pixel_hovered.n_g_normalized 
                self.o_data.o_image_pixel_hovered.n_b_normalized = self.o_data.o_image.o_image_pixel_hovered.n_b_normalized 
                self.o_data.o_image_pixel_hovered.n_a_normalized = self.o_data.o_image.o_image_pixel_hovered.n_a_normalized 

                
            }
            
        }
        this.f_on_wheel = function(e){

            self.o_hovered_element.o_html_element = e.target
            if(self.o_html_element.contains(
                self.o_hovered_element.o_html_element
            )){
                
                e.preventDefault();
                e.stopImmediatePropagation()
                // console.log(e.deltaY)
                self.o_data.o_img_zoomed.n_scale_factor = 
                    self.o_data.o_img_zoomed.n_scale_factor + (e.deltaY * self.o_data.o_img_zoomed.n_scale_factor*0.001 * -1)
                self.o_data.o_img_zoomed.n_scale_factor = 
                    Math.max(0.005, self.o_data.o_img_zoomed.n_scale_factor)
                self.o_data.o_img_zoomed.n_scale_factor = 
                    Math.min(100, self.o_data.o_img_zoomed.n_scale_factor)
                self.f_calculate_style()    
            }
        }
        this.f_add_event_listeners()

        self.f_calculate_style()
        self.o_data.o_overlay_box.o_style.left = `${self.o_data.o_overlay_box.n_left}px`
        self.o_data.o_overlay_box.o_style.top = `${self.o_data.o_overlay_box.n_top}px;`

    }
    f_handle_drag(){
        var self = this
        var mouse_delta_x = self.o_data.o_mouse.o_point_2_d_relative_to_window.n_x - self.o_data.o_mouse.o_point_2_d_relative_to_window_last.n_x
        var mouse_delta_y = self.o_data.o_mouse.o_point_2_d_relative_to_window.n_y - self.o_data.o_mouse.o_point_2_d_relative_to_window_last.n_y
        if(self.o_data.b_drag_locked){
            self.o_data.o_overlay_box.o_style.boxShadow = "0 4px 10px 2px rgb(64 60 67 / 16%)";
            self.o_data.o_overlay_box.n_left += mouse_delta_x
            self.o_data.o_overlay_box.n_top += mouse_delta_y         
            
            self.o_data.o_overlay_box.o_style.left = `${self.o_data.o_overlay_box.n_left}px`
            self.o_data.o_overlay_box.o_style.top = `${self.o_data.o_overlay_box.n_top}px`
        }else{
            self.o_data.o_overlay_box.o_style.boxShadow = "none";

        }
    }
    f_on_mousedown(event){
        var self = this;
        
        if(self.o_html_element.contains(
            event.target
        )){
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
        var o_img_element = document.createElement("img")
        o_img_element.src = self.o_data.o_image.s_url
        document.body.appendChild(o_img_element)

        var br = o_img_element.getBoundingClientRect()
        self.o_data.o_image.n_width = br.width; 
        self.o_data.o_image.n_height = br.height; 
        self.o_data.o_image.n_ratio_n_width_to_n_height = br.width/ br.height; 
        self.o_data.o_image.n_ratio_n_height_to_n_width = br.height / br.width; 
        self.o_data.o_image.o_mouse_position_preview_image_style["aspect-ratio"] = 
            `${self.o_data.o_image.n_width} / ${self.o_data.o_image.n_height}`

        self.f_get_image_data()
        // self.f_get_image_data(event, true, function(){
        //     console.warn(`cannot get pixel information for image with url ${self.o_data.o_image.s_url},because No 'Access-Control-Allow-Origin' header is present on the server hosting the image`)
        //     self.f_get_image_data(event, false, function(){
        //         console.log("error")
        //     })
        // }) 
    }
    f_get_image_data(){
        var self = this
        var o_img_element = document.createElement("img")
        var s_url_non_https = self.o_data.o_image.s_url.replace("https://", "http://")

        o_img_element.src = s_url_non_https

        document.body.appendChild(o_img_element)

        var br = o_img_element.getBoundingClientRect()
        self.o_data.o_image.n_width = br.width; 
        self.o_data.o_image.n_height = br.height; 
        self.o_data.o_image.n_ratio_n_width_to_n_height = br.width/ br.height; 
        self.o_data.o_image.n_ratio_n_height_to_n_width = br.height / br.width; 

        self.o_canvas.width = br.width
        self.o_canvas.height= br.height
        // self.o_canvas_context.drawImage(o_img_element, 0, 0, br.width,br.height);
        

        try{

            var o_img = new Image();
            if(self.o_data.o_image.s_url.split('/')[2] != window.location.href.split('/')[2]){
                o_img.crossOrigin = "Anonymous"
            }
            o_img.addEventListener("load", function () {
                // alert("loaded img")
                // The image can be drawn from any source
                self.o_canvas_context.drawImage(o_img, 0, 0, o_img.width,    o_img.height, 0, 0, self.o_canvas.width, self.o_canvas.height);
                self.o_data.o_image.o_pixel_data = self.o_canvas_context.getImageData(0, 0, br.width,br.height)
                self.o_data.o_image.n_pixel_data_max = Math.pow(2,( self.o_data.o_image.o_pixel_data.data.BYTES_PER_ELEMENT * 8))-1

                
            });
      
            o_img.onerror = function(){
                console.warn(`cannot get image data on the image with the url ${self.o_data.o_image.s_url}, image is not hostet on your server: ${window.location.host} and Access-Control-Allow-Origin is not present on the host ${self.o_data.o_image.s_url.split('/')}`)
                // console.error(e)
            }
            o_img.setAttribute("src", self.o_data.o_image.s_url);

            // o_img_element.crossOrigin = "Anonymous"
            // var a_pixel_data = self.o_canvas_context.getImageData(0, 0, br.width,br.height).data;
            // console.log(a_pixel_data)
            
        }catch{
            
            console.warn(`cannot get image data on the image with the url ${self.o_data.o_image.s_url}, image is not hostet on your server: ${window.location.host} and Access-Control-Allow-Origin is not present on the host ${self.o_data.o_image.s_url.split('/')}`)
            // console.error(e)
        }


        document.body.removeChild(o_img_element)


    }
    // f_get_image_data(event, b_cross_origin_anonymous = true, f_on_error){
    //     var self = this
    //     var o_img = document.createElement("img");
    //     // if(b_cross_origin_anonymous){
    //     //     o_img.crossOrigin = 'anonymous';
    //     //      // somehow if crossOrigin is set, o_img.width and o_img.height is undefined
    //     // }
    //     o_img.onload = function(){
            
    //         self.o_data.o_image.n_width = this.width; 
    //         self.o_data.o_image.n_height = this.height; 
    //         self.o_data.o_image.n_ratio_n_width_to_n_height = this.width/ this.height; 
    //         self.o_data.o_image.n_ratio_n_height_to_n_width = this.height / this.width; 
    //         // console.log("loading success")
    //         //todo: tainted image bug
    //         // console.log(self.o_data.o_image.n_width)
    //         // self.o_canvas.width = this.width;
    //         // self.o_canvas.height = this.height;
            
    //         // self.o_canvas_context.drawImage(o_img, 0, 0, this.width, this.height);
    //         // var a_pixel_data = self.o_canvas_context.getImageData(0, 0, this.width, this.height).data;
    //         // self.o_data.o_image.a_image_data = a_pixel_data


    //     }
    //     o_img.onerror = function(){
    //         // console.log("loading error")

    //         f_on_error()
    //     }

    //     o_img.src = self.o_data.o_image.s_url

    // }
    f_calculate_mouse_position_relative_to_image(event){
        var self = this
        if(!self.o_data.o_image){
            return false
        }
        var o_image_parent_bounding_rect = self.o_hovered_element.o_html_element.getBoundingClientRect()

        var o_image_parent_n_ratio_n_width_to_n_height = o_image_parent_bounding_rect.width /o_image_parent_bounding_rect.height
        var o_image_parent_n_ratio_n_height_to_n_width = o_image_parent_bounding_rect.height /o_image_parent_bounding_rect.width

        //calculating image position
        self.o_hovered_element.o_computed_style = window.getComputedStyle(self.o_hovered_element.o_html_element); 
        self.o_hovered_element.o_computed_style_property_values["background-size"] = self.o_hovered_element.o_computed_style.getPropertyValue("background-size")
        self.o_hovered_element.o_computed_style_property_values["background-position"] = self.o_hovered_element.o_computed_style.getPropertyValue("background-position")
        self.o_hovered_element.o_computed_style_property_values["background-repeat"] = self.o_hovered_element.o_computed_style.getPropertyValue("background-repeat")
        self.o_data.o_img_zoomed.o_style.backgroundRepeat = self.o_hovered_element.o_computed_style_property_values["background-repeat"]
        self.o_data.o_mouse.o_image_bounding_rect = self.o_hovered_element.o_html_element.getBoundingClientRect()
        self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x = parseInt(event.clientX - self.o_data.o_mouse.o_image_bounding_rect.left)
        self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y = parseInt(event.clientY - self.o_data.o_mouse.o_image_bounding_rect.top)
        
        self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x_normalized = self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x / self.o_data.o_image.n_width
        self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y_normalized = self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y / self.o_data.o_image.n_height
        
        self.o_data.o_mouse.o_mouse_position_preview_image_mouse_cursor_style.left = 
            `${self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x_normalized*100}%` 
        self.o_data.o_mouse.o_mouse_position_preview_image_mouse_cursor_style.top = 
            `${self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y_normalized*100}%` 
        
    
        self.o_data.o_image.n_factor_normalizing_x = 1
        self.o_data.o_image.n_factor_normalizing_y = 1


        if(
            self.o_hovered_element.o_computed_style_property_values["background-size"].toLowerCase() == "contain"
        ){  
            // console.log("contain")
            if(o_image_parent_n_ratio_n_width_to_n_height > self.o_data.o_image.n_ratio_n_width_to_n_height){
                self.o_data.o_image.n_factor_normalizing_x = o_image_parent_n_ratio_n_width_to_n_height / self.o_data.o_image.n_ratio_n_width_to_n_height
            }else{
                self.o_data.o_image.n_factor_normalizing_y = o_image_parent_n_ratio_n_height_to_n_width / self.o_data.o_image.n_ratio_n_height_to_n_width

            }
            
        }

        if(
            self.o_hovered_element.o_computed_style_property_values["background-size"].toLowerCase() == "cover"
        ){
            // the smaller ratio of the image has to fit into the bigger ratio of the parent to cover all the parent with image data 
            // var n_ratio_img_smaller = Math.min(
            //     self.o_data.o_image.n_ratio_n_width_to_n_height, 
            //     self.o_data.o_image.n_ratio_n_height_to_n_width
            // )
            // var n_ratio_img_bigger = Math.max(
            //     self.o_data.o_image.n_ratio_n_width_to_n_height, 
            //     self.o_data.o_image.n_ratio_n_height_to_n_width
            // )
            // var n_ratio_parent_smaller = Math.min(
            //     o_image_parent_n_ratio_n_width_to_n_height, 
            //     o_image_parent_n_ratio_n_height_to_n_width
            // )
            // var n_ratio_parent_bigger = Math.max(
            //     o_image_parent_n_ratio_n_width_to_n_height, 
            //     o_image_parent_n_ratio_n_height_to_n_width
            // )
            // var n_ratio_img_smaller_to_parent_bigger = n_ratio_img_smaller / n_ratio_parent_bigger
            // var n_ratio_img_bigger_to_parent_smaller = n_ratio_parent_bigger / n_ratio_img_smaller

            // self.o_data.o_image.n_factor_normalizing_x = 1/ n_ratio_img_smaller_to_parent_bigger
            if(
                ( o_image_parent_n_ratio_n_width_to_n_height > 1 )
            ){
             self.o_data.o_image.n_factor_normalizing_x = 1
             self.o_data.o_image.n_factor_normalizing_y = self.o_data.o_image.n_ratio_n_width_to_n_height / o_image_parent_n_ratio_n_width_to_n_height
            }else{
                self.o_data.o_image.n_factor_normalizing_y = 1
                self.o_data.o_image.n_factor_normalizing_x = self.o_data.o_image.n_ratio_n_height_to_n_width / o_image_parent_n_ratio_n_height_to_n_width
         
            }

        }

        self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x_normalized = 
            self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x_normalized * self.o_data.o_image.n_factor_normalizing_x
        self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y_normalized = 
            self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y_normalized * self.o_data.o_image.n_factor_normalizing_y
    }
    f_calculate_style(){
        var self = this
        if(!self.o_data.o_image){
            return false
        }

        var o_image_parent_bounding_rect = document.querySelector(".img_preview").getBoundingClientRect()

        var n_offset_x_perc = 
            self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x_normalized * 100 
            
        var n_offset_y_perc = 
            self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y_normalized * 100 

        var self = this

        var n_border_translation_x_factor = (self.o_data.o_mouse.o_point_2_d_relative_to_img.n_x_normalized  -0.5) * -1
        var n_border_translation_y_factor = (self.o_data.o_mouse.o_point_2_d_relative_to_img.n_y_normalized  -0.5) * -1
        var n_border_offset_x_px = (o_image_parent_bounding_rect.width) * n_border_translation_x_factor
        var n_border_offset_y_px = (o_image_parent_bounding_rect.height) * n_border_translation_y_factor
        

        self.o_data.o_img_zoomed.o_style.backgroundImage = `url(${self.o_data.o_image.s_url})`
        self.o_data.o_img_zoomed.o_style.backgroundSize = `${self.o_data.o_img_zoomed.n_scale_factor*100}%`
        self.o_data.o_img_zoomed.o_style.backgroundPosition = `calc(${n_offset_x_perc}% + ${n_border_offset_x_px}px ) calc(${n_offset_y_perc}% + ${n_border_offset_y_px}px )`

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
        return this.o_json_to_html.f_o_javascript_object_to_html(
            {
                s_t: "div", 
                a_c: [
                    {
                        "class": this.s_class_name,
                        "style<>": "o_overlay_box.o_style",
                        "a_c": [
                            {
                                "class": "top bar", 
                                "a_c": [
                                    {
                                        "class": "open_in_new_tab",
                                        "a_c" :[
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
                                "class":"left_bar", 
                                "a_c":[
                                    {
                                        "class": "mouse position", 
                                        "a_c": [
                                            {
                                                "class": "mouse_position_preview",
                                                "a_c": [
                                                    {
                                                        "class": "mouse_position_preview_image",
                                                        "style<>": "o_image.o_mouse_position_preview_image_style", 
                                                        "a_c": [
                                                            {
                                                                "class": "mouse_cursor", 
                                                                "style<>": "o_mouse.o_mouse_position_preview_image_mouse_cursor_style"
                                                            }, 
                                                            {
                                                                "class": "image_width", 
                                                                "a_c": [
                                                                    {
                                                                        "s_t": "span", 
                                                                        "s_inner_text":"width: "
                                                                    },
                                                                    {
                                                                        "s_t": "span", 
                                                                        "innerText<>":"o_image.n_width"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "class": "image_height", 
                                                                "a_c": [
                                                                    {
                                                                        "s_t": "span", 
                                                                        "s_inner_text":"height: "
                                                                    },
                                                                    {
                                                                        "s_t": "span", 
                                                                        "innerText<>":"o_image.n_height"
                                                                    }
                                                                ]
                                                            }, 
        
                                                        ]
                                                    },

                                                ]
                                            },
                                            {
                                                "s_inner_text":"x: "
                                            },
                                            {
                                                "innerText<>":"o_mouse.o_point_2_d_relative_to_img.n_x"
                                            },
                                            {
                                                "s_inner_text":"y: "
                                            },
                                            {
                                                "innerText<>":"o_mouse.o_point_2_d_relative_to_img.n_y"
                                            },
                                        ], 
                                    }, 
                                    {
                                        "class": "mouse pixel", 
                                        "a_c": [
                                            {
                                                "class": "r", 
                                                "a_c" : [
                                                    {
                                                        "s_inner_text": "r:"
                                                    }, 
                                                    {
                                                        "innerHTML<>": "o_image.o_image_pixel_hovered.n_r_normalized_tofixed3"
                                                    },
                                                    {
                                                        "style<>": "o_image.o_image_pixel_hovered.n_r_normalized_o_style"
                                                    },
                                                ]
                                            },
                                            {
                                                "class": "g", 
                                                "a_c" : [
                                                    {
                                                        "s_inner_text": "g:"
                                                    }, 
                                                    {
                                                        "innerHTML<>": "o_image.o_image_pixel_hovered.n_g_normalized_tofixed3"
                                                    },
                                                    {
                                                        "style<>": "o_image.o_image_pixel_hovered.n_g_normalized_o_style"
                                                    }

                                                ]
                                            },
                                            {
                                                "class": "b", 
                                                "a_c" : [
                                                    {
                                                        "s_inner_text": "b:"
                                                    }, 
                                                    {
                                                        "innerHTML<>": "o_image.o_image_pixel_hovered.n_b_normalized_tofixed3"
                                                    },
                                                    {
                                                        "style<>": "o_image.o_image_pixel_hovered.n_b_normalized_o_style"
                                                    }

                                                ]
                                            },
                                            {
                                                "class": "a", 
                                                "a_c" : [
                                                    {
                                                        "s_inner_text": "a:"
                                                    }, 
                                                    {
                                                        "innerHTML<>": "o_image.o_image_pixel_hovered.n_a_normalized"
                                                    },
                                                    {
                                                        "style<>": "o_image.o_image_pixel_hovered.n_a_normalized_o_style"
                                                    }

                                                ]
                                            },
                                            // {
                                            //     "class": "n_rgba_max", 
                                            //     "innerText<>": "o_image.o_image_pixel_hovered.n_n_rgba_max"
                                            // }
                         
                                        ]
                                    },
                                ]
                            },
                            {
                                "class": "img_preview", 
                                "a_c": [
                                    {
                                        "class": "backgroundimage",
                                        "style<>": "o_img_zoomed.o_style",
                                    },
                                    {
                                        "class": "center",
                                        "style<>": "o_img_zoomed.o_center.o_style",
                                    },

                                ]
                            },
                            {
                                "class": "bottom bar",
                                "a_c": [
                                    {
                                        "class": "zoom factor",
                                        "a_c": [
                                            {
                                                "s_inner_text": "mousewheel to change zoom factor: "
                                            },
                                            {
                                                "innerText<>": "o_img_zoomed.n_scale_factor"
                                            }
                                        ]
                                    }
                                ]
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
                            .img_preview .center{
                                position:absolute; 
                                border:1px solid #08ff08; 
                                top:50%; 
                                left:50%; 
                                transform:translate(-50%, -50%);
                                width:10px; 
                                height:10px;
                                box-shadow: 0px 0px 1px 1px #1d1d1d;
                            }
                            .backgroundimage{
                                /*background-attachment: fixed;*/
                                width:100%;
                                height: 100%;
                                position:absolute;
                                top:0; 
                                left:0;
                                background-size: contain;
                        
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
                            .mouse_position_preview{
                                aspect-ratio:1/1;
                            }
                            .mouse_position_preview_image{
                                max-height: 100%;
                                max-width: 100%;
                                position: relative;
                                border: 1px solid white;
                                display: flex;
                            }
                            .mouse_cursor{
                                position:absolute;
                                width:1px; 
                                height:1px;
                                background:white;
                            }
                            .image_height {
                                position: absolute;
                                transform: rotate(90deg);
                                left: 100%;
                                display: flex;
                                flex-direction: row;
                                transform-origin: left top;
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




export default O_overlay_imgzoombox