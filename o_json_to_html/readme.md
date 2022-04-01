
# usage

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
```html 
<h1>Super cool!<h1>
```
### c => "children"  
```javascript 
var o_html_element = o_json_to_html.f_json_to_html(`
{
    "s_t": "div",
    "a_c": [
        {
            "s_t": "h1",
            "s_inner_text": "What?"
        }, 
        {
            "s_t": "p",
            "s_inner_text": "yes, this is awesome"
        }
    ]
}
`)
```
```html 
<div>
    <h1>What?</h1>
    <p>yes, this is awesome</p>
</div>
```
### default tagName is 'div', so "s_t" can be omitted
```javascript 
var o_html_element = o_json_to_html.f_json_to_html(`
    {
        "s_inner_text": "hello",
    }, 
    {
        "s_inner_text": "world",
    }
`)
```
```html 
<div>hello</div>
<div>world</div>
```
### custom html tagName and attributes
```javascript 
var o_html_element = o_json_to_html.f_json_to_html(`
{
    "s_t": "special_element",
    "special_attribute" : "great"
}
`)
```
```html 
<special_element special_attribute="great"></special_element>
```
### customization / settings
#### custom property names
|original html property|object property|class property|
|---|---|---|
|`.tagName`|`s_t`|`.s_prop_name_tag_name`|
|`childNodes`|`a_c`|`.s_prop_name_children_elements`|
|`innerHTML`|`s_inner_html`|`.s_prop_name_inner_html`|
|`innerText`|`s_inner_text`|`.s_prop_name_inner_text`|
##### example
```javascript
//... 
o_json_to_html.s_prop_name_tag_name = "lol"
var o_html_element = o_json_to_html.f_json_to_html(`
{
    "lol": "table",
}
`)
```
```html 
<table></table>
```
## javascript object to html 
### advantages : 
- comments are allowed
- functions can be used
- property names do not always require start and ending quotes
#### example 
```javascript 
var o_html_element = o_json_to_html.f_javascript_object_to_html(
{
    // t: "table" // comments are allowed
    s_t: "div", // we dont need quotes '" on the property name
    "data-quotes-needed": "quotes required because property name contains dash (-)"
    "onclick" : function(event){
        alert("you clicked on a "+event.target.tagName)
    }
}
)
```

## javascript object to html 
```javascript 
var object = o_json_to_html.f_javascript_object_to_html(document.querySelector("body"))
```

## pass data object to function 
documentation coming soon 

# version log

## 1.0.4
### data object support
you can now link data properties with `propname_on_html_element<>`:`propname_on_data_element`


### console.error 
linking non exsiting properties will call a console.error, for example `property o_mouse.o_position.n_x does not exist in object`

## 1.0.5
readme improvements 

## 1.0.6 
- changed many property names
- a data object can be passed , documentation coming soon 

## 1.0.7 
- changed documentaiton errors

## 1.0.8 
- renamed most of the functions, the old names are still available and should not cause any problems but throw a `console.warn`
|s_fname_old|s_fname_new|
|---|---|
|`f_javascript_object_to_html`|`f_o_javascript_object_to_html`|
|`f_json_or_jsobject_to_html`|`f_o_json_or_jsobject_to_html`|
|`f_json_to_html`|`f_o_json_to_html`|
|`f_convert_string_to_javascript_object`|`f_o_convert_string_to_javascript_object`|
|`f_html_to_object`|`f_o_html_to_object`|
|`f_html_to_json`|`f_s_html_to_json`|

- added the initial assignment of the linked properties, so that the linked properties on the o_html_element instance has an inital value