import O_overlay_imgzoombox from "./o_overlay_imgzoombox/o_overlay_imgzoombox.module.js"
import o_json_to_html from "./o_json_to_html/o_json_to_html.module.js"
var o_html = o_json_to_html.f_javascript_object_to_html(
    {
        c: [
            {
                t: "h1", 
                "s_inner_text": "hover some elements!", 
                "s_o_overlay_textbox": "this is a simple heading"
            }, 
            {
                t: "img", 
                "src": "http://ichef.bbci.co.uk/news/976/cpsprodpb/02C2/production/_122360700_gettyimages-1280424615.jpg", 
            }, 
            {
                t: "div", 
                "class": "div_img",
                "style": "background-image:url(http://cdn.britannica.com/29/150929-050-547070A1/lion-Kenya-Masai-Mara-National-Reserve.jpg)", 
            }, 
            {
                t: "div", 
                "class": "div_img",
                "style": "background-image:url(http://www.teahub.io/photos/full/217-2178703_super-ultrawide.jpg)", 
            }, 
            {
                t: "div", 
                "class": "div_img",
                "style": "background-image:url(http://images.unsplash.com/photo-1589633827726-8bb96fb3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHF1YWxpdHl8ZW58MHx8MHx8&w=1000&q=80)", 
            }, 
            
            {
                t: "div", 
                "class": "div_img image_with_background_image_in_css"
            }, 
            {
                t: "div", 
                "class": "div_img image_with_background_image_in_css cover"
            }, 
            {
                t: "div", 
                "class": "div_img",
                "style": "background: #ffffff url('http://i.ibb.co/7RhFZmZ/tag.jpg') no-repeat right top", 
            }, 
            {
                t: "div", 
                "class": "div_img",
                "style": "background: #ffffff url('http://i.pinimg.com/originals/50/e3/f3/50e3f37c526db244557b4f2c3b0141e7.jpg') no-repeat", 
            }, 
            {
                t: "div", 
                "class": "div_img",
                "style": "background: #ffffff url() no-repeat right top", 
            },
            {
                t: "div", 
                "class": "div_img",
                "style": "background: #ffaaff no-repeat right top", 
            },  
            {
                "t": "style", 
                "s_inner_html": `
                    .div_img{
                        max-width: 100%;
                        width:100%;
                        padding-top: 100%; 
                        border:3px solid blue; 
                        background-size: contain; 
                        background-repeat:no-repeat;
                    }
                    .image_with_background_image_in_css{
                        background-image:url(http://cdn.mos.cms.futurecdn.net/RY2EpSo74hvYXyAVpTN2Gg-1200-80.jpg)
                    }
                    .cover{
                        background-size: cover;
                    }
                `
            }
        ]
    }

)

document.body.appendChild(o_html)


var o_overlay_imgzoombox = new O_overlay_imgzoombox()
// var o_overlay_imgzoombox = new O_overlay_imgzoombox()

window.o_overlay_imgzoombox = o_overlay_imgzoombox

