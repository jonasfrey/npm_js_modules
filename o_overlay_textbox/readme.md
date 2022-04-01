# a very simple overlay for pop ups / tool tips 
![gif](https://i.ibb.co/KmdsNGx/o-overlay-textbox-demo.gif)
## import 
```javascript 
import O_json_to_html from "o_json_to_html"
o_json_to_html = new O_json_to_html()
```
## json to html
### t => "tagName"  
```javascript 
var o_html_element = o_json_to_html.f_json_to_html(`
{
    "s_t": "h1",
    "s_inner_text": "Super cool!"
}
`)
```
## usage 
```html
<h1 s_o_overlay_textbox="tau(6.28) is the number how often a radius fits into the circumfence of the circle">I am TAU</h1>
```

### markdown 
markdown can be used in the string

#### line breaks 
markdonw needs 2 line breaks to make a line break
```html

<h1 s_o_overlay_textbox="line -> &#10;&#10;-> break!">Line break demo: double line break</h1>
```
markdown processes the  &lt;br&gt; tag aswell
```html
<h1 s_o_overlay_textbox="line -> <br>-> break!">Line break demo: markdown &lt;br&gt; tag</h1>
```

tables: 
```html

<h1 s_o_overlay_textbox="|formula|TAU|PI|&#10;|:---|:---|:---|&#10;|eulers equation|eiτ   =1+0|eiπ=−1|&#10;|circle area|r*r*(τ/2)|r*r*π|">TAU vs PI</h1>
                
<h1 s_o_overlay_textbox="| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
">
markdonw table</h1>
```

# version log 
## 1.0.2 
- switched to my own framework wich uses `o_json_to_html`
- added more documentation
- replaced `marked` library import via CDN with node_modules import