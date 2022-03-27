// import o_overlay_textbox from "./o_overlay_textbox/o_overlay_textbox.module.js"

import o_json_to_html from "./o_json_to_html/o_json_to_html.module.js"


// demo 



window.o_json_to_html_demo = {

} 

o_json_to_html_demo.s_json_example = `{

"style": "display:flex; flex-direction:column",
"c": [
    {
        "t" : "input" , 
        "type" : "text", 
        "value" : "i am an input"
    },
    {
        "t" : "div" , 
        "style": "display:flex",
        "c":[
            {
                "t": "h1", 
                "s_inner_text" : "<i style='color:red' class='fa fa-sun'>i am not parsed</i>"
            }, 
            {
                "s_inner_html" : "<i style='color:red' class='fa fa-sun'>i am parsed</i>"
            }
        ]
    }, 
    {
        "t": "img", 
        "src": "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg"
    }
]
}`;

o_json_to_html_demo.o_object_example = {
    // since this is a javascript object we can have ...
    quoteless_property_name: "yes indeed", //...quoteless property names
    "style": "display:flex;flex-direction:column", // ...comments aswell !
    "c": [
        {
            t: "h1", 
            s_inner_html: "5+5",
        },
        {
            t: "h2", 
            s_inner_html: function(){
                return 5+5
            },
        },
        {
            "t" : "div" , 
            "style": "display:flex",
            "c":[
                {
                    "t": "h1", 
                    "s_inner_text" : "<i style=\"color:red\" class=\"fa fa-sun\">i am not parsed</i>"
                }, 
                {
                    "t": "h1", 
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
            "t": "img", 
            "src": "https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg"
        }
    ]
    }

o_json_to_html_demo.o_s_json_example = o_json_to_html.f_json_to_html(o_json_to_html_demo.s_json_example)
document.body.appendChild(o_json_to_html_demo.o_s_json_example)


o_json_to_html_demo.o_o_object_example = o_json_to_html.f_json_to_html(o_json_to_html_demo.o_object_example)
document.body.appendChild(o_json_to_html_demo.o_o_object_example)


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


o_json_to_html_demo.o_data = {
    text_input: "hello test", 
    text_style: {
        color: "red"
    },
    text_innerhtml: "logogogogos"
}

o_json_to_html_demo.s_json_example_with_data = {

    "style": "display:flex; flex-direction:column",
    "c": [
        {
            "t" : "h2" , 
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "innerHTML<>" : "text_input",
        },
        {
            "t" : "input" , 
            "type" : "text", 
            "value<>" : "text_input",  
            "style<o>": "text_style"
        },
        {
            "t" : "h1" , 
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "innerHTML<>" : "text_input",
        }, 
        {
            "t" : "span" , 
            // "s_inner_html<>": "text_innerhtml", // ! not working
            "innerHTML<>" : "text_input",
        },
    ]
}

document.documentElement.appendChild(
    o_json_to_html.f_json_to_html(
        o_json_to_html_demo.s_json_example_with_data, 
        o_json_to_html_demo.o_data
    )
)