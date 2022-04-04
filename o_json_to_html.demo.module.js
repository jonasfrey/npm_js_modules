// import o_overlay_textbox from "./o_overlay_textbox/o_overlay_textbox.module.js"

import O_json_to_html from "./o_json_to_html/o_json_to_html.module.js"

import {O_value} from "./f_a_link_object_properties/f_a_link_object_properties.module.js"

// demo 

var o_json_to_html = new O_json_to_html()

document.addEventListener('DOMContentLoaded', () => {

window.o_json_to_html_demo = {

} 

var f_simple_json_to_html_demo = function(){

o_json_to_html_demo.s_json_example = `{

"style": "display:flex; flex-direction:column",
"a_c": [
    {
        "s_t" : "input" , 
        "type" : "text", 
        "value" : "i am an input"
    },
    {
        "s_t" : "div" , 
        "style": "display:flex",
        "a_c":[
            {
                "s_t": "h1", 
                "s_inner_text" : "<i style='color:red' class='fa fa-sun'>i am not parsed</i>"
            }, 
            {
                "s_inner_html" : "<i style='color:red' class='fa fa-sun'>i am parsed</i>"
            }
        ]
    }, 
    {
        "s_t": "img", 
        "src": "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg"
    }
]
}`;

o_json_to_html_demo.o_object_example = {
    // since this is a javascript object we can have ...
    quoteless_property_name: "yes indeed", //...quoteless property names
    "style": "display:flex;flex-direction:column", // ...comments aswell !
    "a_c": [
        {
            s_t: "h1", 
            s_inner_html: "5+5",
        },
        {
            s_t: "h2", 
            s_inner_html: function(){
                return 5+5
            },
        },
        {
            "s_t" : "div" , 
            "style": "display:flex",
            "a_c":[
                {
                    "s_t": "h1", 
                    "s_inner_text" : "<i style=\"color:red\" class=\"fa fa-sun\">i am not parsed</i>"
                }, 
                {
                    "s_t": "h1", 
                    "s_inner_html" : "<i style=\"color:blue\" class=\"fa fa-sun\">i am parsed</i>"
                }, 
                {
                    "s_test": "i am a test string",
                    "s_inner_html" : function(){
                        // debugger
                        return this.s_test.replace("test", "by function changed".toUpperCase()); 
                    } //...functions
                }
            ]
        }, 
        {
            "s_t": "img", 
            "src": "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg"
        }
    ]
    }

o_json_to_html_demo.o_s_json_example = o_json_to_html.f_json_to_html(o_json_to_html_demo.s_json_example)
document.body.appendChild(o_json_to_html_demo.o_s_json_example)


o_json_to_html_demo.o_o_object_example = o_json_to_html.f_json_to_html(o_json_to_html_demo.o_object_example)
document.body.appendChild(o_json_to_html_demo.o_o_object_example)
}

var f_simple_html_to_json_demo = function(){

    
o_json_to_html_demo.s_html = `
<h1>Didn't melt fairer keepsakes since Fellowship elsewhere.</h1>
<p>Woodlands payment Osgiliath tightening. Barad-dur follow belly comforts tender tough bell? Many that live deserve death. Some that die deserve life. Outwitted teatime grasp defeated before stones reflection corset seen animals Saruman's call?</p>
<h2>Tad survive ensnare joy mistake courtesy Bagshot Row.</h2>
<p>Ligulas step drops both? You shall not pass! Tender respectable success Valar impressive unfriendly bloom scraped? Branch hey-diddle-diddle pony trouble'll sleeping during jump Narsil.</p>
<h3>North valor overflowing sort Iáve mister kingly money?</h3>
<p>Curse you and all the halflings! Deserted anytime Lake-town burned caves balls. Smoked lthilien forbids Thrain?</p>
<ul>
<li>Adamant.</li>
<li>Southfarthing!</li>
<li>Witch-king.</li>
<li>Precious.</li>
<li>Gaffer's!</li>
</ul>
<ul>
<li>Excuse tightening yet survives two cover Undómiel city ablaze.</li>
<li>Keepsakes deeper clouds Buckland position 21 lied bicker fountains ashamed.</li>
<li>Women rippling cold steps rules Thengel finer.</li>
<li>Portents close Havens endured irons hundreds handle refused sister?</li>
<li>Harbor Grubbs fellas riddles afar!</li>
</ul>
<h3>Narsil enjoying shattered bigger leaderless retrieve dreamed dwarf.</h3>
<p>Ravens wonder wanted runs me crawl gaining lots faster! Khazad-dum surprise baby season ranks. I bid you all a very fond farewell.</p>
<ol>
<li>Narsil.</li>
<li>Elros.</li>
<li>Arwen Evenstar.</li>
<li>Maggot's?</li>
<li>Bagginses?</li>
</ol>
<ol>
<li>Concerning Hobbits l golf air fifth bell prolonging camp.</li>
<li>Grond humble rods nearest mangler.</li>
<li>Enormity Lórien merry gravy stayed move.</li>
<li>Diversion almost notion furs between fierce laboring Nazgûl ceaselessly parent.</li>
<li>Agree ruling um wasteland Bagshot Row expect sleep.</li>
</ol>
<h3>Ere answering track forests shards roof!</h3>
<p>Delay freezes Gollum. Let the Ring-bearer decide. Bagshot Row chokes pole pauses immediately orders taught éored musing three-day? Disease rune repel source fire Goblinses already?</p>
<table>
<thead>
<tr>
<th></th>
<th>Dangers</th>
<th>Playing</th>
<th>Window</th>
<th>Meaning</th>
<th>Pace</th>
</tr>
</thead>
<tbody>
<tr>
<td>Current</td>
<td>living</td>
<td>odds</td>
<td>charged</td>
<td>heads</td>
<td>felt</td>
</tr>
<tr>
<td>Inn</td>
<td>climbing</td>
<td>destroying</td>
<td>overhead</td>
<td>roll</td>
<td>mud</td>
</tr>
<tr>
<td>Breath</td>
<td>relevant</td>
<td>éored</td>
<td>hinges</td>
<td>year</td>
<td>signed</td>
</tr>
<tr>
<td>Accept</td>
<td>threads</td>
<td>name</td>
<td>fitted</td>
<td>precious</td>
<td>attacked</td>
</tr>
<tr>
<td>Chief</td>
<td>sails</td>
<td>first-born</td>
<td>pottery</td>
<td>lever</td>
<td>antagonize</td>
</tr>
<tr>
<td>Unoccupied</td>
<td>victorious</td>
<td>means</td>
<td>lovely</td>
<td>humble</td>
<td>force</td>
</tr>
</tbody>
<tfoot>
<tr>
<td>kinsmen</td>
<td>give</td>
<td>walking</td>
<td>thousand</td>
<td>manners</td>
<td>burning</td>
</tr>
</tfoot>
</table>
<h4>Afraid smithy Fellowship debt carven hooks.</h4>
<p>What about second breakfast? Nags runt near Lindir lock discover level? Andûril breathe waited flatten union.</p>
<blockquote>
<p>You shall be the Fellowship of the Ring.</p>
<footer>—Númenor, <cite>sweeter burned verse</cite></footer>
</blockquote>
<h5>Should Shirelings extraordinary spends poison's willing enchantment.</h5>
<p>I think we should get off the road. Penalty sight splintered Misty Mountain mithril? Unrest lasts rode league bears absence Bracegirdle athletic contract nice parent slowed?</p>
<pre>Pardon Concerning Hobbits rune goblins? Twitching figure including rightful Thorin's level! Worth tubers threats Hornburg deadliest? Unfold thumping shh wants Homely!</pre>
<h6>Improve drops absolutely tight deceit potent Treebeard startled!</h6>
<p>J.R.R. Tolkien 3000 uttered veins <q>roaring winds moaning flaming</q>. Meddle <ins>measure pure</ins> Samwise Gamgee business! <sub>Lied</sub> mistake Proudfoots pon. Instance 80 <dfn>morbid ceremonial plunge</dfn> Anor mad. Questions shells hangs noble Proudfoots <var>throws</var>. <mark>Rampart damage</mark> questions Chubbs 3000 conjurer? Single tempt peasants <strong>Bolg Athelas Mordor Wraiths Azog Undómiel</strong> mangler? <samp>Nori Giants Undómiel Rivendell</samp> spike posts took. Fool's Underhill boarded <cite>vanishing twilight unheard-of</cite>. <abbr>Presence</abbr> Dunland lamb lair. Barricade <sup>didn't</sup> feelings purring vine Morgoth. Distract Giants nearing champion <kbd>T</kbd>. Clothing titles quick bother <em>Arod Gloin Beren</em> troop? Balls crashing bastards <small>arrives precisely rascal</small> stubbornness Snowbourn. Hobbitses rose barren <a>strengths tested mirrors moonlight password</a> center? Remade <x-code>free filthy</x-code> breaking respect amuse Arod? Vengeance <del>Elessar Wolves</del> posts remain doorway said! <time>Suspects</time> fight Merry hungers locked yelp.</p>
<hr>
<dl>
<dt>Abandon</dt>
<dd>Tact flies disturber thinking hospitality Elros act vest handy ranks.</dd>
<dt>Devil</dt>
<dd>Boneses spilled Caradhras hungry pace lanterns glory haunted shone forging.</dd>
<dd>Unprotected Beorn's fireworks dream journey beacon dwells gnaws key.</dd>
<dt>Happened</dt>
<dd>Known wanna fifth Bill hell knew she scale.</dd>
<dd>Missing vanish taken colleague sway voice tricks 13 Grimbold.</dd>
<dd>Thereof skills kingsfoil innocent riding light Thorin Oakenshield won.</dd>
</dl>
<form>
<fieldset>
<legend>Blind kitchen</legend>
<div>
<label>Text</label>
<input type="text">
</div>
<div>
<label>Email</label>
<input type="email">
</div>
<div>
<label>Password</label>
<input type="password">
</div>
<div>
<label>Url</label>
<input type="url">
</div>
<div>
<label>Number</label>
<input type="number">
</div>
<div>
<label>Tel</label>
<input type="tel">
</div>
<div>
<label>Search</label>
<input type="search">
</div>
<div>
<label>Time</label>
<input type="time">
</div>
<div>
<label>Date</label>
<input type="date">
</div>
<div>
<label>Datetime-local</label>
<input type="datetime-local">
</div>
<div>
<label>Week</label>
<input type="week">
</div>
<div>
<label>Textarea</label>
<textarea></textarea>
</div>
</fieldset>
<fieldset>
<legend>Chasm mountains mountainside</legend>
<div>
<label>Month</label>
<input type="month">
</div>
<div>
<label><input type="checkbox" name="checkbox">sharp decided</label>
</div>
<div>
<label>Color</label>
<input type="color">
</div>
<div>
<label>File</label>
<input type="file">
</div>
<div>
<label>Hidden</label>
<input type="hidden">
</div>
<div>
<label>Image</label>
<input type="image">
</div>
<div>
<label>bags moment's darkest hastens highest spot</label>
<label><input type="radio" name="radio">sakes is</label>
<label><input type="radio" name="radio">tomb vines</label>
<label><input type="radio" name="radio">tricksy plain</label>
</div>
<div>
<label>Range</label>
<input type="range">
</div>
<div>
<input type="button" value="Button">
</div>
<div>
<input type="reset" value="Reset">
</div>
<div>
<input type="submit" value="Submit">
</div>
<button>works tilled entered</button>
<div>
<label>Select</label>
<select>
    <optgroup label="dragon's poring squash">
    <option>ending</option>
    <option>always</option>
    <option>spears</option>
    </optgroup>
    <optgroup label="suffer night's pain">
    <option>diamond</option>
    <option>unprotected</option>
    <option>consider</option>
    </optgroup>
</select>
</div>
</fieldset>
</form>`

o_json_to_html_demo.o_container = document.createElement("div"); 
o_json_to_html_demo.o_container.id = "demo_o_html_element"
o_json_to_html_demo.o_container.innerHTML = o_json_to_html_demo.s_html
document.body.appendChild(o_json_to_html_demo.o_container)

var o_object = o_json_to_html.f_html_to_json(o_json_to_html_demo.o_container)


// console.log(o_object)
window.o_object = o_object


}


var f_simple_json_to_html_demo_with_data  = function(){



    o_json_to_html_demo.o_data = {
        style_for_img: {
            s_style_inline: "border:10px solid red"
        },
        text_input: "hello test", 
        text_style: {
            color: "red"
        },
        style: {
            color: "blue",
            left:"10%"
        },
        text_innerhtml: "logogogogos", 
        nested: {
            "text": "asdf"
        }, 
        o_box: {
            o_style: {
                "a_s_font_family":["arial", "serif", "Helvetica"],  
                
                "background-color": "red", 
                "padding": "20px", 
                "border": "5px solid blue",
                "font-size": "20px",
                "font-family": "arial",
                
                o_getter_setter: {
                    f_setter: function(value_old, object, s_prop, value){
                        // debugger 
                        console.log(s_prop)
                        console.log("f_setter called")
                        if(["s_style_inline", "o_getter_setter"].indexOf(s_prop) == -1){
                            var s_css = ""
                            for(var s_key in this){
                                // debugger
                                if(["s_style_inline", "o_getter_setter", "a_s_font_family"].indexOf(s_key) == -1){
                                    s_css += `${s_key}:${this[s_key]};` 
                                }
                            }
                            console.log(s_css)
                            
                            this.s_style_inline = s_css
                        }
                    }
                },
                s_style_inline: "background-image:url(...)"
            },
        },
        parse_int_test: {
            n_num : 12, 
            o_getter_setter: {
                f_setter_n_num: function(value_old, object, s_prop, value){
                    
                    //this is an example on how to prevent infinit recursion
                    var val  = parseInt(this.n_num)
                    var o_value = new O_value(val)
                    o_value.b_dont_call_f_setter = true
                    // val.a_o_object.push(this)
                    this.n_num = o_value 
                    console.log(val)
                }
            }
        },
        infinit_recursion_test2: {
            n_num : 12, 
            b_setter_called : false, 
            o_getter_setter: {
                f_setter_n_num: function(value_old, object, s_prop, value){
                    
                    if(!this.b_setter_called){
                        this.b_setter_called = true
                        this.n_num = parseInt(this.n_num)
                        this.b_setter_called = false
                    }
                }
            }
        }, 
        filter_blur: "...",
        filter1: "...",
        filter2: "...",
        "f_o_get_mouse_relative_to_html_element": function(o_html_element){

            let rect = o_html_element.getBoundingClientRect();
            var n_x_normalized = (window.event.clientX - rect.left) / rect.width
            var n_y_normalized = (window.event.clientY - rect.top) / rect.height 
            return {n_x_normalized: n_x_normalized, n_y_normalized: n_y_normalized}
        }, 

        "style_test_another": {
            background: "red",
        }
    }

o_json_to_html_demo.s_json_example_with_data = {

    "style": "display:flex; flex-direction:column",
    "a_c": [
        {
            "s_t": "button", 
            "s_inner_text": "click me", 
            "onclick": function(){
                const color = '#' + Math.floor(Math.random() * (0xffffff + 1))
                .toString(16)
                .padStart(6, '0')
                
                // this.o_box.o_style.o_css needs to be a proxy// not so sure
                this.o_box.o_style["background-color"] = color
                this.o_box.o_style.padding = Math.random()*40+"px"
                this.o_box.o_style.border = Math.random()*10+"px solid red"
                this.o_box.o_style["font-family"] = this.o_box.o_style.a_s_font_family[parseInt(Math.random()*(this.o_box.o_style.a_s_font_family.length-1))]
                this.o_box.o_style["font-size"] = Math.random()*40+"px"
                // trigger the f_setter
                // this.o_box.o_style.n_left = 2 
            }
        },
        {
            "s_t" : "h3" ,
            "s_inner_text" : "parse int test1 / infinit recusion test 1",
            "style<>": "o_box.o_style.s_style_inline"

        }, 
        {
            "s_t" : "h3" ,
            "innerText<>" : "parse_int_test.n_num",
            "style<>": "o_box.o_style.s_style_inline"

        }, 
        {
            "s_t" : "input" ,
            "value<>" : "parse_int_test.n_num",
            "style<>": "o_box.o_style.s_style_inline"

        }, 
        {
            "s_t" : "h3" ,
            "s_inner_text" : "parse int test2 / infinit recusion test 2",
            "style<>": "o_box.o_style.s_style_inline"

        }, 
        {
            "s_t" : "h3" ,
            "innerText<>" : "infinit_recursion_test2.n_num",
            "style<>": "o_box.o_style.s_style_inline"

        }, 
        {
            "s_t" : "input" ,
            "value<>" : "infinit_recursion_test2.n_num",
            "style<>": "o_box.o_style.s_style_inline"

        }, 
        {
            "s_t": "div", 
            "class": "o_box", 
            "s_inner_text": "hellow", 
            // "dummy<>": "o_box.o_style.o_css.padding", 
            "style<>": "o_box.o_style.s_style_inline"
        },

        {
            "s_t" : "h2" , 
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "innerHTML<>" : "nested.text",
            "style<>": "o_box.o_style.s_style_inline"
        },
        {
            "s_t" : "h1" ,
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "innerText<>" : "text_input",
        }, 
        {
            "s_t" : "input",
            "type":"range", 
            "min": 1, 
            "max": 40, 
            "oninput": function(event){
                console.log(event.target.value)
                this.o_box.o_style["font-size"] = event.target.value+"px"
            },
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "innerText<>" : "text_input",
        }, 
        {
            "s_t" : "input",
            "style<>": "o_box.o_style.s_style_inline",
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "value<>" : "o_box.o_style['font-size']",
        },
        {

            "s_t" : "input" , 
            "type" : "text", 
            "value<>" : "nested.text",  
            "style<>": "text_style"
        },
        {
            "s_t" : "span" , 
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "innerHTML<>" : "text_input",
        },
        {
            "s_t" : "span" , 
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "innerHTML<>" : "nested.text",
        },
        {

            "class": "flex_imgs", 
            "a_c": [
                {
                    "s_t": "img",
                    "class": "flex_img", 
                    "src": "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg",
                    "style<>":"style_for_img.s_style_inline",
                    'onmousemove':function(event){
                        var o_mouse = this.f_o_get_mouse_relative_to_html_element(event.target); 
                        var s_css = `filter: hue-rotate(${o_mouse.n_y_normalized*360}deg);`
                        this.style_for_img.s_style_inline = s_css 
                        this.filter_blur = s_css
                        this.filter1 = s_css
                        this.filter2 = s_css
                    },
                },
                {
                    "s_t": "img",
                    "class": "flex_img", 
                    "src": "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg",
                    "style<>":"filter_blur",
                    'onmousemove':function(event){
                        var o_mouse = this.f_o_get_mouse_relative_to_html_element(event.target); 
                        var s_css = `filter: blur(${o_mouse.n_y_normalized*50}px);`
                        this.style_for_img.s_style_inline = s_css 
                        this.filter_blur = s_css
                        this.filter1 = s_css
                        this.filter2 = s_css
                    },
                },
                {
                    "s_t": "img",
                    "class": "flex_img", 
                    "src": "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg",
                    "style<>":"filter_blur",
                    'onmousemove':function(event){
                        var o_mouse = this.f_o_get_mouse_relative_to_html_element(event.target); 
                        var s_css = `filter: contrast(${o_mouse.n_y_normalized*500}%);`
                        this.style_for_img.s_style_inline = s_css 
                        this.filter_blur = s_css
                        this.filter1 = s_css
                        this.filter2 = s_css
                    },
                },
                {
                    "s_t": "img",
                    "class": "flex_img", 
                    "src": "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg",
                    "style<>":"filter_blur",
                    'onmousemove':function(event){
                        var o_mouse = this.f_o_get_mouse_relative_to_html_element(event.target); 
                        var s_css = `filter: invert(${o_mouse.n_y_normalized*100}%);`
                        this.style_for_img.s_style_inline = s_css 
                        this.filter_blur = s_css
                        this.filter1 = s_css
                        this.filter2 = s_css
                    },
                },
            ]
        },
        {
            "a_c":[
                {
                    "s_t": "span", 
                    "innerHTML<>":"nested.text", 
                    "style": "color:red"
                }, 
                {
                    "a_c":[
                        {
                            "s_t": "span", 
                            "innerHTML<>":"nested.text", 
                            "style<>": "style"
                        }, 
                        {
                            "a_c":[
                                {
                                    "s_t": "span", 
                                    "innerHTML<>":"nested.text", 
                                    "style<>": "style"
                                }, 
                                
                            ]
                        }
                    ]
                }
            ]
        }, 
        {
            "s_t": "button",
            // "style": {
            //     "backgroundColor<>": "style_test_another.background"
            // },
            "style<>": "style_test_another",
            "s_inner_text": 'Hey, click maye!', 
            "onclick": function(){
                const color = '#' + Math.floor(Math.random() * (0xffffff + 1))
                .toString(16)
                .padStart(6, '0')
                this.style_test_another.background = color
                console.log(color)
            }
        },
        {
            "s_t": "style", 
            "s_inner_html": `
                .flex_img{
                    flex:0 0 50%; 
                    width: 100%;
                    height: auto; 
                    /*fckikng flexbox is not working with images...-.-*/
                    max-width:50%;
                    
                }
                img{
                }
                .flex_imgs{
                    display:flex;
                    flex-wrap:wrap
                }
            `
        }
    ]
}


o_json_to_html_demo.s_json_example_with_data = {

    "style": "display:flex; flex-direction:column",
    "a_c": [
        {
            "s_t": "button",
            // "style": {
            //     "backgroundColor<>": "style_test_another.background"
            // },
            "style<>": "style_test_another",
            "s_inner_text": 'Hey, click maye!', 
            "onclick": function(){
                const color = '#' + Math.floor(Math.random() * (0xffffff + 1))
                .toString(16)
                .padStart(6, '0')
                this.style_test_another.background = color
                console.log(color)
            }
        },

    ]
}


document.documentElement.appendChild(
    o_json_to_html.f_json_to_html(
        o_json_to_html_demo.s_json_example_with_data,
        // o_json_to_html_demo.s_json_example_with_data2,
        o_json_to_html_demo, // data parent object, 
        "o_data", // data parent object property name
    )
)


}



var f_simple_json_to_html_demo_with_data_and_changing_objects = function(){

    // now , it can be the case, that not only a property with a value 
    // like n_ number, s_ string, a_ array, b_ boolean, changes, but also 
    // a whole object can be exchanged, 
    // let's test it 

    window.o_data = {
        a: 1, 
        b: {
            c: 3,
        },
        a_nums: [1,2,3,4]
    }
    window.o_layout = {
        
        s_t: "div", 
        a_c: [
            {
                s_t: "div", 
                "class": "a",
                "innerHTML<>": "a", 
            }, 
            {
                s_t: "div", 
                "class": "b.c", 
                "innerHTML<>": "b.c"
            },
            // also arrays are not working yet
            // {
            //     s_t: "div", 
            //     "class": "arraytest", 
            //     "innerHTML<>": "a_nums[2]"
            // }
        ]

    }

    document.documentElement.appendChild(
        o_json_to_html.f_json_to_html(
            o_layout,
            // o_json_to_html_demo.s_json_example_with_data2,
            window, // data parent object, 
            "o_data", // data parent object property name
        )
    )

    // o_data.a = 2 // a simple property change, should still be linked 
    // o_data.b = {c: 555} // a whole new object is set on property b
    // o_data.b.a_o_other[0].object.o_proxy.innerHTML = "222" //now if we change the property on the linked object, it should change on the o_data aswell
    // o_data.b = {c: 1234} // now it should update the properties aswell
    // o_data.b.c = 4343434 

}



var f_simple_json_to_html_demo_with_data_and_changing_objects_with_nested_object = function(){

    window.o_data = {
        a: 1, 
        b: {
            c: {
                d: 1
            },
            e: 2, 
        }
    }
    window.o_layout = {
        
        s_t: "div", 
        a_c: [
            {
                s_t: "div", 
                "class": "a", 
                "innerHTML<>": "a"
            },
            {
                s_t: "div", 
                "class": "b.e", 
                "innerHTML<>": "b.e"
            },
            {
                s_t: "div", 
                "class": "b.c.d", 
                "innerHTML<>": "b.c.d"
            },
            // also arrays are not working yet
            // {
            //     s_t: "div", 
            //     "class": "arraytest", 
            //     "innerHTML<>": "a_nums[2]"
            // }
        ]

    }

    document.documentElement.appendChild(
        o_json_to_html.f_json_to_html(
            o_layout,
            // o_json_to_html_demo.s_json_example_with_data2,
            window, // data parent object, 
            "o_data", // data parent object property name
        )
    )
    o_data.a = "a_workin?" // should work normal
    o_data.b.c.d = "b.c.d working? "
    o_data.b.e = "b.e workin? "
    

}

// f_simple_html_to_json_demo()
// f_simple_json_to_html_demo()
// f_simple_json_to_html_demo_with_data()
// f_simple_json_to_html_demo_with_data_and_changing_objects()
f_simple_json_to_html_demo_with_data_and_changing_objects_with_nested_object()

})
