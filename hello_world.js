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

// regl.frame() wraps requestAnimationFrame and also handles viewport changes
regl.frame(({time}) => {
    // clear contents of the drawing buffer
    regl.clear({
      color: [0, 0, 0, 0.4],
      depth: 1
    })
  
    // draw a triangle using the command defined above
    drawTriangle()
  })
