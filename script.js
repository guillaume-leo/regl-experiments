const initialCode = `// In development, you would probably import/require regl
// const regl = require('regl')();

// In this block, it is already loaded, so we just
// initialize it. For more info, see:
// https://github.com/regl-project/regl#standalone-script-tag

var regl = createREGL(target);

var drawTriangle = regl({

  // fragment shader
  frag: \`
  precision mediump float;
  uniform vec4 color;
  void main () {
    gl_FragColor = color;
  }\`,

  // vertex shader
  vert: \`
  precision mediump float;
  attribute vec2 position;
  void main () {
    gl_Position = vec4(position, 0, 1);
  }\`,

  // attributes
  attributes: {
    position: [
      [-1, 0],
      [0, -1],
      [1, 1]
    ]
  },

  // uniforms
  uniforms: {
    color: [1, 0, 0, 1]
  },

  // vertex count
  count: 3
})

drawTriangle();`;



const editor = CodeMirror(document.querySelector('#editor'), {
  lineNumbers: true,
  tabSize: 1,
  value:initialCode,
  theme: 'dracula',
  autoCloseBrackets: true,
  matchBrackets:true,
  mode: 'javascript'
});

editor.setSize(600, 750);



//SEND THE INITIAL CODE
var parent = document.getElementById('target');
var preview = document.createElement('script');
preview.setAttribute("id", "preview");
preview.innerHTML = editor.getValue();
parent.appendChild(preview);

console.log("code sent");

//DETECT CTRL+ENTER
function KeyPress(e) {
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 13 && evtobj.ctrlKey){
      //REMOVE CHILD AND RECREATE IT
      var element = document.getElementById("target");
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      var preview = document.createElement('script');
      preview.setAttribute("id", "preview");
      preview.innerHTML = editor.getValue();
      parent.appendChild(preview);


      }
}
document.onkeydown = KeyPress;



/*
// In development, you would probably import/require regl
// const regl = require('regl')();

// In this block, it is already loaded, so we just
// initialize it. For more info, see:
// https://github.com/regl-project/regl#standalone-script-tag

var regl = createREGL(hello_world);

var drawTriangle = regl({

  // fragment shader
  frag: `
  precision mediump float;
  uniform vec4 color;
  void main () {
    gl_FragColor = color;
  }`,

  // vertex shader
  vert: `
  precision mediump float;
  attribute vec2 position;
  void main () {
    gl_Position = vec4(position, 0, 1);
  }`,

  // attributes
  attributes: {
    position: [
      [-1, 0],
      [0, -1],
      [1, 1]
    ]
  },

  // uniforms
  uniforms: {
    color: [1, 0, 0, 1]
  },

  // vertex count
  count: 3
})

drawTriangle();





*/
