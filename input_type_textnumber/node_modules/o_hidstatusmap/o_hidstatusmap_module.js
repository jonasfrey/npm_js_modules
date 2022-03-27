class O_mouse {
  constructor(
    n_x, 
    n_y, 
  ) {
    this._n_x = n_x
    this._n_y = n_y
    this._n_x_normalized = 0
    this._n_y_normalized = 0
  }

  get n_x(){
    return this._n_x
  }
  set n_x(n){
    this._n_x = n
    this._n_x_normalized = n / window.innerWidth 
  }

  get n_y(){
    return this._n_y
  }
  set n_y(n){
    this._n_y = n
    this._n_y_normalized = n / window.innerHeight 
  }

  get n_x_normalized(){
    return this._n_x_normalized
  }
  set n_x_normalized(n){
    this._n_x_normalized = n
  }
  get n_y_normalized(){
    return this._n_y_normalized
  }
  set n_y_normalized(n){
    this._n_y_normalized = n
  }

}

class O_keyboard {
  constructor(){
    this.a_s_available_key_names = ["https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values", "Backspace","Tab","Enter","Shift","Shift","Control","Control","Alt","Alt","Pause","CapsLock","Escape","","PageUp","PageDown","End","Home","ArrowLeft","ArrowUp","ArrowRight","ArrowDown","PrintScreen","Insert","Delete","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","Meta","Meta","ContextMenu","0","1","2","3","4","5","6","7","8","9","*","+","-",".","/","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","NumLock","ScrollLock","AudioVolumeMute","AudioVolumeDown","AudioVolumeUp","LaunchMediaPlayer","LaunchApplication1","LaunchApplication2",";","=",",","-",".","/","`","[","\\","]","\'"]
  }

}

// hid human interface device status map 
// an object that records and stores the status of human interface devices such as 
// keyboards, mouse, midi keyboards, etc... 
// can later easaly be accessed in a rendering loop like this
// f_render_every_16_milliseconds(){
// ...
// if(o_hidstatusmap.Control){ console.log("control key is down")}
// 
// player.position.x = player.position.x + o_hidstatusmap.o_mouse_delta.x_normalized * 100
// ...
// }

var o_hidstatusmap = {
  
};

o_hidstatusmap.o_mouse = new O_mouse(
  0, 
  0, 
  window.innerWidth,
  window.innerHeight
)
o_hidstatusmap.o_mouse_last = new O_mouse(
  0, 
  0, 
  window.innerWidth,
  window.innerHeight
)
o_hidstatusmap.o_mouse_delta = new O_mouse(
  0, 
  0, 
  window.innerWidth,
  window.innerHeight
)

o_hidstatusmap.o_keyboard = new O_keyboard()

document.body.onmousemove = function(e){

    if(document.pointerLockElement || document.mozPointerLockElement) {
        // console.log('The pointer lock status is now locked');
    } else {
        // console.log("asdf")
        // console.log('The pointer lock status is now unlocked');
    
        o_hidstatusmap.o_mouse_last = JSON.parse(JSON.stringify(o_hidstatusmap.o_mouse))
        
        o_hidstatusmap.o_mouse.n_x = window.event.clientX;
        o_hidstatusmap.o_mouse.n_y = window.event.clientY;

        o_hidstatusmap.o_mouse_delta.n_x = o_hidstatusmap.o_mouse_last.n_x - o_hidstatusmap.o_mouse.n_x ;
        o_hidstatusmap.o_mouse_delta.n_y = o_hidstatusmap.o_mouse_last.n_y - o_hidstatusmap.o_mouse.n_y ;
    }
    // console.log(o_hidstatusmap.o_mouse_delta.y_normalized)
}
document.body.onmousedown = function(){
    o_hidstatusmap.o_mouse_last = JSON.parse(JSON.stringify(o_hidstatusmap.o_mouse))
    o_hidstatusmap.o_mouse.left = event.button == 0 //|| 1 == event.button&1;
    o_hidstatusmap.o_mouse.middle = event.button == 1 //|| 1 == event.button&2;
    o_hidstatusmap.o_mouse.right = event.button == 2 //|| 1 == event.button&3;
    o_hidstatusmap.o_mouse.down = true
}

document.body.onmouseup = function(){
    o_hidstatusmap.o_mouse_last =JSON.parse(JSON.stringify(o_hidstatusmap.o_mouse))
    o_hidstatusmap.o_mouse.left = (event.button == 0) ? false : o_hidstatusmap.o_mouse.left 
    o_hidstatusmap.o_mouse.middle =( event.button == 1) ? false : o_hidstatusmap.o_mouse.middle 
    o_hidstatusmap.o_mouse.right = (event.button == 2) ? false : o_hidstatusmap.o_mouse.right 
    o_hidstatusmap.o_mouse.down = false
}

document.body.onkeydown = function () {
    o_hidstatusmap.o_keyboard[window.event.key] = true;
};

document.body.onkeyup = function () {
    o_hidstatusmap.o_keyboard[window.event.key] = false;
};

export default o_hidstatusmap