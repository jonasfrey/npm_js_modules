import o_hidstatusmap from "o_hidstatusmap"

class O_input_type_textnumber{
    constructor(){
        const self = this
        this.n_step_ctrl = 100
        this.n_step_shift = 10
        this.n_step = 1
        this.n_step_alt = 0.1
        this.s_data_attribute_name = "data_input_type_textnumber"
        this.o_active_element = null
        
        this.n_cursor_number_start_index = 0
        this.n_cursor_number_end_index = 0
        this.b_cursor_number_is_negative = false
        this.n_cursor_number_minus_index = false
        this.n_cursor_number_value = 0
        this.n_cursor_number_value_new = 0

        this.o_canvas = document.createElement("canvas")
        this.o_ctx = this.o_canvas.getContext("2d");


        this.o_highlight_char = document.createElement("div")
        this.o_highlight_char.className = this.s_data_attribute_name+"_highlight_char"
        this.o_highlight_char.style.position = "fixed"
        this.o_highlight_char.style.zIndex = 1
        this.o_highlight_char.style.background = "rgba(255, 241, 0, 0.4)"
        document.documentElement.appendChild(this.o_highlight_char)
        
        this.b_highlight_char = true


        this.o_highlight_number = document.createElement("div")
        this.o_highlight_number.className = this.s_data_attribute_name+"_highlight_number"
        this.o_highlight_number.style.position = "fixed"
        this.o_highlight_number.style.background = "rgba(255, 0, 234, 0.4)"

        this.b_highlight_number = true 

        
        document.documentElement.appendChild(this.o_highlight_number)
        

        this.f_add_event_listeners()

    }
    
    f_add_event_listeners(){
        document.addEventListener("keydown", this)
        document.addEventListener("resize", this)
    }
    f_render_highlight(
        o_input_dom_element,
        o_render_dom_element,  
        n_start_index,
        n_end_index
    ){
     
        var o_computed_style = window.getComputedStyle( o_input_dom_element, null )
        this.o_ctx.font = o_computed_style.getPropertyValue( 'font' );
        
        o_input_dom_element.s_font_size = o_computed_style.getPropertyValue( 'font-size' );
        o_input_dom_element.s_padding_top = o_computed_style.getPropertyValue( 'padding-top' );
        o_input_dom_element.s_padding_left = o_computed_style.getPropertyValue( 'padding-left' );
        o_input_dom_element.s_border_top = o_computed_style.getPropertyValue( 'border-left' );
        o_input_dom_element.s_border_left = o_computed_style.getPropertyValue( 'border-left' );


        var self = this

        var s_text_without_char_after_cursor = o_input_dom_element.value.substring(
            0, 
            n_start_index
        )
        var o_measured_text_without_char_after_cursor = self.o_ctx.measureText(s_text_without_char_after_cursor); 
        var s_text_with_char_after_cursor = o_input_dom_element.value.substring(
            0, 
            n_end_index+1
        )
        var o_measured_text_with_char_after_cursor = self.o_ctx.measureText(s_text_with_char_after_cursor);

        var n_char_after_cursor_width = o_measured_text_with_char_after_cursor.width -o_measured_text_without_char_after_cursor.width

        var o_bounding_rect = o_input_dom_element.getBoundingClientRect();
        
        // debugger
        o_render_dom_element.style.top = (
            o_bounding_rect.top + 
            parseFloat(o_input_dom_element.s_padding_top) + 
            parseFloat(o_input_dom_element.s_border_top)
            ) + "px"
        o_render_dom_element.style.left = (
            o_bounding_rect.left +
            o_measured_text_without_char_after_cursor.width + 
            parseFloat(o_input_dom_element.s_padding_left) + 
            parseFloat(o_input_dom_element.s_border_left)
            ) + "px"
        o_render_dom_element.style.width = n_char_after_cursor_width + "px"
        o_render_dom_element.style.height = o_input_dom_element.s_font_size
        o_render_dom_element.style.display = "block"
    }
    f_resize(event){
        this.f_render_highlight(
            self.o_active_element, 
            self.o_highlight_char, 
            self.o_active_element.selectionStart,
            self.o_active_element.selectionStart
        )
    }
    f_keydown(event){
        var self = this;

        if(
            event.key == "ArrowUp" ||
            event.key == "ArrowDown"
        ){
            event.preventDefault()
        }

        if(self.o_active_element != document.activeElement){
            self.o_active_element = document.activeElement;
        }
        window.setTimeout(function(){ // somehow target.selectionStart has the worong value, i guess the keydown event handler is executed before the new target.selectionStart is set, as a workaround i implemented this timeout

    
            if(self.o_active_element.getAttribute(self.s_data_attribute_name)){
    
                self.o_highlight_number.style.display = "none"


                // var n_index = self.doGetCaretPosition(self.o_active_element)
                // var n_index2 = event.target.selectionStart

                self.f_render_highlight(
                    self.o_active_element, 
                    self.o_highlight_char, 
                    self.o_active_element.selectionStart,
                    self.o_active_element.selectionStart
                )
                
                var o_cursor_number_indexes = self.f_get_cursor_number_start_end_index(
                    self.o_active_element.value, 
                    self.o_active_element.selectionStart
                )

                self.n_cursor_number_end_index = o_cursor_number_indexes.n_cursor_number_end_index
                self.n_cursor_number_start_index = o_cursor_number_indexes.n_cursor_number_start_index
                
                if(self.n_cursor_number_end_index != -1){

                    // a minus '-' symbol could be in front of the number 
                    self.b_cursor_number_is_negative = false; 
                    var n_minus_index = self.n_cursor_number_start_index
                    while(true){
                        n_minus_index --
                        var s_current_char = self.o_active_element.value[n_minus_index]
                        
                        if(s_current_char == '-'){
                            self.b_cursor_number_is_negative = true
                            break
                        }
                        if(
                            s_current_char != '-' && 
                            s_current_char != ' ' 
                        ){
                            n_minus_index++
                            break
                        }
                    }

                    self.n_cursor_number_minus_index = (self.b_cursor_number_is_negative) ? n_minus_index : -1
                    
                    self.f_render_highlight(
                        self.o_active_element, 
                        self.o_highlight_number, 
                        (self.b_cursor_number_is_negative) ? self.n_cursor_number_minus_index : self.n_cursor_number_start_index,
                        self.n_cursor_number_end_index
                    )
                    // debugger
                    self.n_cursor_number_value = parseFloat(
                        self.o_active_element.value.substring(
                            self.n_cursor_number_start_index,
                            self.n_cursor_number_end_index+1
                        )
                    )
                    if(self.b_cursor_number_is_negative){
                        self.n_cursor_number_value = self.n_cursor_number_value * -1
                    }
                    // console.log(self.n_cursor_number_value)
                    

                    var n_decimal_point_index = self.n_cursor_number_value.toString().indexOf(".")

                    var n_cursor_number_value_decimal_places = (n_decimal_point_index == -1) ? 0 : self.n_cursor_number_value.toString().length -1  - n_decimal_point_index

                    if(
                        o_hidstatusmap.o_keyboard["ArrowUp"] ||
                        o_hidstatusmap.o_keyboard["ArrowDown"]
                    ){                        
                        var n_factor = 0
                        if(o_hidstatusmap.o_keyboard["ArrowDown"]){
                            n_factor = -1
                        }
                        if(o_hidstatusmap.o_keyboard["ArrowUp"]){
                            n_factor = 1
                        }
                        this.n_step_ctrl = 100
                        this.n_step_shift = 10
                        this.n_step = 1
                        this.n_step_alt = 0.1
                        var n_step = self.n_step
                        
                        if(o_hidstatusmap.o_keyboard["Control"]){ n_step = self.n_step_ctrl }
                        if(o_hidstatusmap.o_keyboard["Shift"]){ n_step = self.n_step_shift }
                        if(o_hidstatusmap.o_keyboard["Alt"]){ n_step = self.n_step_alt }
    

                        self.n_cursor_number_value_new = parseFloat((self.n_cursor_number_value + n_step * n_factor ).toFixed(n_cursor_number_value_decimal_places))


                        var s_n_cursor_number_value_new = self.n_cursor_number_value_new.toString()

                        var n_replacement_substring_start_index = (self.n_cursor_number_minus_index != -1) ? self.n_cursor_number_minus_index : self.n_cursor_number_start_index 

                        var s_value_new = 
                            self.o_active_element.value.substring(
                                0, 
                                n_replacement_substring_start_index)
                            + 
                            s_n_cursor_number_value_new + 
                            self.o_active_element.value.substring(self.n_cursor_number_end_index+1)
    
                        self.o_active_element.value = s_value_new 
    
                        var n_new_cursor_index = self.n_cursor_number_start_index
                        if(self.o_active_element.value[self.n_cursor_number_start_index] == "-"){
                            n_new_cursor_index++
                        }
                        self.f_set_cursor_position(
                            self.o_active_element,
                            n_new_cursor_index
                        )
                    }
                }                

            }
        },1)


    }
    handleEvent(event){
        
        var f_handler = this["f_"+event.type]
        if(f_handler){
            f_handler.apply(this, [event])
        }
    }
    
    f_get_cursor_number_start_end_index(
        s_text, 
        n_cursor_index, 
    ){
        // finds the start index of the closest number to the cursor, 
        // without minus '-' prefix, example 
        // "it is -15|.34 degrees cold" -> "it is -15.34 degrees cold"
        //           ^cursor                       ^---^
        //                                         start --- end index                                   
        var o_return = {
            n_cursor_number_start_index: -1, 
            n_cursor_number_end_index: -1,
        }
        
        var o_regex_numeric_with_decimalpoint = new RegExp(/^[.0-9]+$/i)
        var b_decimal_point_used = false
        var s_char_at_index = s_text[n_cursor_index]

        if(!o_regex_numeric_with_decimalpoint.test(s_char_at_index)){ return o_return }

        if(s_char_at_index == "."){ b_decimal_point_used = true}

        var n_start_index = n_cursor_index
    
        o_return.n_cursor_number_start_index = n_start_index; 
        o_return.n_cursor_number_end_index = n_start_index; 
        var b_number_end_index_found = false
        var b_number_start_index_found = false
        // debugger
        while(
            b_number_end_index_found == false || b_number_start_index_found == false
        ){
            
            if(!b_number_start_index_found){
                o_return.n_cursor_number_start_index--
                var s_current_char = s_text[o_return.n_cursor_number_start_index]
                if(o_regex_numeric_with_decimalpoint.test(s_current_char)){
                    if(b_decimal_point_used && s_current_char == "."){
                        b_number_start_index_found = true
                    }
                    b_decimal_point_used = s_current_char == "."
                }else{
                    b_number_start_index_found = true
                }
            }
            if(!b_number_end_index_found){
                o_return.n_cursor_number_end_index++
                var s_current_char = s_text[o_return.n_cursor_number_end_index]
                if(o_regex_numeric_with_decimalpoint.test(s_current_char)){
                    if(b_decimal_point_used && s_current_char == "."){
                        b_number_end_index_found = true
                    }
                    b_decimal_point_used = s_current_char == "."
                }else{
                    b_number_end_index_found = true
                }
            }

        }
        o_return.n_cursor_number_start_index++
        o_return.n_cursor_number_end_index--

        return o_return

    }
    /*
    ** Returns the caret (cursor) position of the specified text field (oField).
    ** Return value range is 0-oField.value.length.
    credits: https://stackoverflow.com/questions/497094/how-do-i-find-out-which-dom-element-has-the-focus
    */
    doGetCaretPosition (oField) {

        // Initialize
        var iCaretPos = 0;
    
        // IE Support
        if (document.selection) {
    
        // Set focus on the element
        oField.focus();
    
        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();
    
        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);
    
        // The caret position is selection length
        iCaretPos = oSel.text.length;
        }
    
        // Firefox support
        else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionDirection=='backward' ? oField.selectionStart : oField.selectionEnd;
    
        // Return results
        return iCaretPos;
    }
    
    f_set_cursor_position(
        o_element,
        n_index
        ) {

        if(o_element != null) {
            if(o_element.createTextRange) {
                var range = o_element.createTextRange();
                range.move('character', n_index);
                range.select();
            }
            else {
                if(o_element.selectionStart) {
                    o_element.focus();
                    o_element.setSelectionRange(n_index, n_index);
                }
                else
                    o_element.focus();
            }
        }
    }
}
const o_input_type_textnumber = new O_input_type_textnumber()

export default o_input_type_textnumber