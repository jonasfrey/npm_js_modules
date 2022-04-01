import O_overlay_textbox from "./o_overlay_textbox/o_overlay_textbox.module.js"
import O_json_to_html from "./o_json_to_html/o_json_to_html.module.js"
var o_json_to_html = new O_json_to_html()
window.o_overlay_textbox = new O_overlay_textbox()
var el = (o_json_to_html.f_o_javascript_object_to_html(
    {
        a_c: [
            {
                "div": "div",
                "a_c": [
                    {
                        "div": "h1",
                        "s_o_overlay_textbox": "line -> \n\n-> break!",
                        "s_inner_text": "Line break demo: double line break"
                    },
                    {
                        "div": "h1",
                        "s_o_overlay_textbox": "line -> <br>-> break!",
                        "s_inner_text": "Line break demo: markdown <br> tag"
                    },
                    {
                        "div": "h1",
                        "s_o_overlay_textbox": "|formula|TAU|PI|\n|:---|:---|:---|\n|eulers equation|eiτ   =1+0|eiπ=−1|\n|circle area|r*r*(τ/2)|r*r*π|",
                        "s_inner_text": "TAU vs PI"
                    },
                    {
                        "div": "h1",
                        "s_o_overlay_textbox": "| Syntax      | Description | Test Text     |\n| :---        |    :----:   |          ---: |\n| Header      | Title       | Here's this   |\n| Paragraph   | Text        | And more      |\n",
                        "s_inner_text": "\nmarkdonw table"
                    }
                ]
            },
            {
                s_t: "h1", 
                "s_inner_text": "hover some elements!", 
                "s_o_overlay_textbox": "this is a simple heading"
            }, 
            {
                s_t: "h1", 
                "s_inner_text": "hover some elements!", 
                "s_o_overlay_textbox": "<iframe width='1000' height='1000' src='http://localhost:3000/demos.html'></iframe>"
            }, 
            {
                s_t: "img", 
                "src": "https://ichef.bbci.co.uk/news/976/cpsprodpb/02C2/production/_122360700_gettyimages-1280424615.jpg", 
                "s_o_overlay_textbox": "Koalas are a protected species in Australia's state of Victoria"
            }, 
            {
                s_t: "img", 
                "src": "https://upload.wikimedia.org/wikipedia/commons/7/79/2010-brown-bear.jpg", 
                "s_o_overlay_textbox": `### Description
Bears are carnivoran mammals of the family Ursidae. They are classified as caniforms, or doglike carnivorans. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. [Wikipedia](https://en.wikipedia.org/wiki/Bear)

[Family](/search?q=bear+family&sa=X&ved=2ahUKEwj0z4j3teH2AhWVt6QKHXCNCk4Q6BMoAHoECEQQAg): Ursidae; G. Fischer de Waldheim, 1817

[Order](/search?q=bear+order&sa=X&ved=2ahUKEwj0z4j3teH2AhWVt6QKHXCNCk4Q6BMoAHoECDgQAg): Carnivora

[Class](/search?q=bear+class&sa=X&ved=2ahUKEwj0z4j3teH2AhWVt6QKHXCNCk4Q6BMoAHoECDoQAg): Mammalia

[Phylum](/search?q=bear+phylum&sa=X&ved=2ahUKEwj0z4j3teH2AhWVt6QKHXCNCk4Q6BMoAHoECEAQAg): Chordata

[Kingdom](/search?q=bear+kingdom&sa=X&ved=2ahUKEwj0z4j3teH2AhWVt6QKHXCNCk4Q6BMoAHoECEEQAg): Animalia

[Speed](/search?q=bear+speed&stick=H4sIAAAAAAAAAOPgE-LQz9U3MEwpL9bSzE620k_KzM_JT6_Uzy9KT8zLLM6NT85JLC7OTMtMTizJzM-zKi5ITU1ZxMqVlJpYpADmAAC8zxOrRAAAAA&sa=X&ved=2ahUKEwj0z4j3teH2AhWVt6QKHXCNCk4Q6BMoAHoECEIQAg): [Polar bear](/search?q=Polar+bear&stick=H4sIAAAAAAAAAOPgE-LQz9U3MEwpL1YCs8yMjTO0NLOTrfSTMvNz8tMr9fOL0hPzMotz45NzEouLM9MykxNLMvPzrIoLUlNTFrFyBeTnJBYpJKUmFu1gZdzFzsTBCADoIP7zVgAAAA&sa=X&ved=2ahUKEwj0z4j3teH2AhWVt6QKHXCNCk4QmxMoAXoECEIQAw): 40 km/h, [Brown bear](/search?q=Brown+bear&stick=H4sIAAAAAAAAAOPgE-LQz9U3MEwpL1aCsiqKtTSzk630kzLzc_LTK_Xzi9IT8zKLc-OTcxKLizPTMpMTSzLz86yKC1JTUxaxcjkV5ZfnKSSlJhbtYGXcxc7EwQgA_jNvylYAAAA&sa=X&ved=2ahUKEwj0z4j3teH2AhWVt6QKHXCNCk4QmxMoAnoECEIQBA): 56 km/h

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZESQW2HQJZc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `.trim()
            }, 
            {
                s_t: "img", 
                "src": "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM2NTI5fQ", 
                "s_o_overlay_textbox": "# Clownfish \nClownfish or anemonefish are fishes from the subfamily Amphiprioninae in the family Pomacentridae. Thirty species are recognized: one in the genus Premnas, while the remaining are in the genus Amphiprion. In the wild, they all form symbiotic mutualisms with sea anemones. Wikipedia"
            }, 
            {
                s_t: "h1", 
                "s_inner_text": "tau vs pi", 
                "s_o_overlay_textbox": "|test|1|\n|---|---|\n|222|adsf|"
            }, 
            {
                "s_t": "style", 
                "s_inner_html": `
                    body{
                        background: rgba(1,1,2,0.8);
                        color: rgba(11,235,81, 0.9);
                    }
                    img{
                        max-width: 300px
                    }
                    /* unvisited link */
                    a:link {
                      color: red;
                    }
                    
                    /* visited link */
                    a:visited {
                      color: green;
                    }
                    
                    /* mouse over link */
                    a:hover {
                      color: hotpink;
                    }
                    
                    /* selected link */
                    a:active {
                      color: blue;
                    }
                `
                // .split("\n").join("")
            }
        ]
    }

))


document.body.appendChild(el)
var el = document.createElement("h2")
el.innerText = "tau vs pi asdf"
el.setAttribute(
    "s_o_overlay_textbox",
    "|test|1|\n|---|---|\n|222|adsf|"
    )
document.documentElement.appendChild(el)