
# usage 
converts json/javascript-object to xml/html 
```javascript 
var node_element = o_json_to_html.f_json_to_html(`
{
    "t": "div",
    "c": [
        {
            "t": "h1",
            s_inner_text": "hello"
        }, 
        {
            "t": "span",
            s_inner_text": "this is text in a span"
        }
    ]
}
`)
```
converts xml/html to json/javascript-object
```javascript 
var object = o_json_to_html.f_javascript_object_to_html(document.querySelector("body"))
```


## json/javascript-object to html
```javascript
var s_json_example = `{

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
var o_s_json_example = o_json_to_html.f_json_to_html(s_json_example)
```
o_s_json_example
```html
<div style="display:flex; flex-direction:column">
    <input type="text" value="i am an input">
    <div style="display:flex">
        <h1>&lt;i style='color:red' class='fa fa-sun'&gt;i am not parsed&lt;/i&gt;</h1>
        <div>
            <i style="color:red" class="fa fa-sun">i am parsed</i>
        </div>
    </div>
    <img src="https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg">
</div>
``` 

## html to json/javascript-object
with javascript-objects we have the following advantages: 
1. property names do not need double or single quotes at beginning
2. we can comment/un-comment stuff
3. we can have functions!

```javascript 
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
                    debugger
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
var o_o_object_example = o_json_to_html.f_javascript_object_to_html(o_object_example)
```
o_o_object_example
```html
<div quoteless_property_name="yes indeed" style="display:flex;flex-direction:column">
    <h1>5+5</h1>
    <h2>10</h2>
    <div style="display:flex">
        <h1>&lt;i style="color:red" class="fa fa-sun"&gt;i am not parsed&lt;/i&gt;</h1>
        <h1><i style="color:blue" class="fa fa-sun">i am parsed</i></h1>
        <div s_test="i am a test string">i am a BY FUNCTION CHANGED string</div>
    </div>
    <img src="https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg">
</div>
```
## properties mapping

`s_tag_property_name = "t"`
will be used as the html.tagName 
<br>
`s_children_elements_property_name`
the value of this object property will be/must be an array of objects, which represents the nested html.children 
<br>
`s_default_tag_name `
if no tag name is provided on the object, this string will be used as a tag name, since 'div' elements are mostly used, it is a div tag
<br>
`s_tag_inner_text`
if the nested content is not a nested object but a string/text, this will be used to set html.innerText
<br>
`s_tag_inner_html`
if the nested content is not a nested object but a string/text, this will be used to set html.innerHTML
<br>


## properties mapping customise 
if you really need to, you can customize the properties
```javascript
o_json_to_html.s_tag_property_name = "tagName"
o_json_to_html.s_children_elements_property_name = "children"
o_json_to_html.s_default_tag_name = ""
o_json_to_html.s_tag_inner_html = "innerHTML"
o_json_to_html.s_tag_inner_text = "innerText"
```