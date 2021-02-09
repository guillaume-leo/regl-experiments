const initialCode = `// In development, you would probably import/require regl
// const regl = require('regl')();

// In this block, it is already loaded, so we just
// initialize it. For more info, see:
// https://github.com/regl-project/regl#standalone-script-tag

var regl = createREGL(target);


var drawTriangle = regl({

  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: \`
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }\`,

  vert: \`
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }\`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // regl.buffer creates a new array buffer object
    position: regl.buffer([
      [-2, -2],   // no need to flatten nested arrays, regl automatically
      [4, -2],    // unrolls them into a typedarray (default Float32)
      [4,  4]
    ])
    // regl automatically infers sane defaults for the vertex attribute pointers
  },

  uniforms: {
    // This defines the color of the triangle to be a dynamic variable
    color: regl.prop('color')
  },

  // This tells regl the number of vertices to draw in this command
  count: 3
})

// regl.frame() wraps requestAnimationFrame and also handles viewport changes
regl.frame(({time}) => {
  // clear contents of the drawing buffer
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  // draw a triangle using the command defined above
  drawTriangle({
    color: [
      Math.cos(time * 1.001),
      Math.sin(time * 2.8),
      Math.cos(time * 3.003),
      1
    ]
  })
})`;



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
        console.clear();
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

