// shaders to display the skeleton
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 5.0;\n' +
  '}\n';
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

var verts = [];     // every set of joints comes with two versions
var nextVerts = [];
var v = 1;          // 0 to use nextVerts, 1 to use verts
var start;          // initialize start frame (starts at 1 not 0)
var iter;           // the current frame number
var end;            // initialize after reading in the file
var slider = document.getElementById('slider');
var output = document.getElementById('output'); // display the frame number
var canvas = document.getElementById('webgl');
var maxFrame = document.getElementById('max_frame');
var remFrames = 0;
var submitted = false;

// get the canvas context
var gl = getWebGLContext(canvas);
if (!gl) {
  console.log('Failed to get the rendering context for WebGL');
}

function main() {  
  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  gl.clearColor(0, 0, 0, 1);
   
  update();
}

function update(){
  console.log("updating");
  getFileObject('Video/Body_20151008_090925_193_Frames.txt', function (fileObject) {
     parseFile(fileObject, processChunk);
  }); 
  start = 1;
  iter = start;
  end = verts.length / 75;  // the number of frames
  maxFrame.innerHTML = "Maximum frame number: " + end;

  slider.min = start;
  slider.max = end;
  slider.defaultValue = iter; // make the slide control start at the left
  slider.value = iter;
  output.innerHTML = "Frame number: " + slider.value;
  var n = initVertexBuffers(submitted);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  $('#slider').on('change mousemove', function () { // adding mousemove tracks the slider before the mouse is released
    output.innerHTML = "Frame number: " + slider.value;
    iter = slider.value;
    n = initVertexBuffers(submitted);
    draw(n);
  });
  draw(n);
}

// next three functions create a file object from the file path
var getFileBlob = function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
};

var blobToFile = function (blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
};

var getFileObject = function(filePathOrUrl, cb) {
       getFileBlob(filePathOrUrl, function (blob) {
          cb(blobToFile(blob, 'test.jpg'));
       });
};

// use a fileReader to load and read in the file text
function parseFile(file, callback) {
    var fileSize   = file.size;
    var chunkSize  = 64 * 1024; // bytes
    var offset     = 0;
    var self       = this; // we need a reference to the current object
    var chunkReaderBlock = null;

    var readEventHandler = function(evt) {
        if (evt.target.error == null) {
            offset += evt.target.result.length;
            callback(evt.target.result); // callback for handling read chunk
        } else {
            console.log("Read error: " + evt.target.error);
            return;
        }
        if (offset >= fileSize) {
            console.log("Done reading file");
            return;
        }

        // move to the next chunk
        chunkReaderBlock(offset, chunkSize, file);
    }

    chunkReaderBlock = function(_offset, length, _file) {
        var r = new FileReader();
        var blob = _file.slice(_offset, length + _offset);
        r.onload = readEventHandler;
        r.readAsText(blob);
    }

    // start the read with the first block
    chunkReaderBlock(offset, chunkSize, file);
}

function processChunk(text)
{
  text = text.split('\n');
  var line;
  if(remFrames > 0){
    for(var y = 0; y < remFrames; y++)
    {
        line = text[y].split(' ');   // split each line into numbers and spaces
        processLine(line, (51-remFrames+y));
    }
    remFrames = 0;
  }
  for(var x = 0; x < text.length; x++)     // check each line
  {   
    if(parseFloat(text[x]) == 25)    // if a line is just a 25 
    {
      for(var y = x+1; y < x+51; y++)   // then the joints are the next 50 lines (two sets)
      {
        if(y < text.length){
          line = text[y].split(' ');   // split each line into numbers and spaces
          processLine(line, y-x);
        }
        else{
          remFrames = x+51 - y;
          break;
        }
      }
    }
  }
}

function processLine(line, count)
{
    var point = new Float32Array(3);
    var norm = 0;
    var n = 0;
    for(var j=0; j < line.length; j++){   
      var num = parseFloat(line[j]);
      if(!isNaN(num)){              // only use the numbers
        norm += num*num;
        point[n] = num;
        n++;
      }
    }
    norm = Math.sqrt(norm);   // compute the magnitude
    if(count%2 != 0){   // add the three normalized coordinates
      verts.push(point[0]/norm);
      verts.push(point[1]/norm);
      verts.push(point[2]/norm);
    }
    else{  // add the three normalized coordinates
      nextVerts.push(point[0]/norm); 
      nextVerts.push(point[1]/norm); 
      nextVerts.push(point[2]/norm); 
    }
}

function initVertexBuffers(submitted) {
  console.log("Verts from initVertexBuffers: " + verts.length);
  if(!submitted){
      end = verts.length / 75;  // the number of frames
      maxFrame.innerHTML = "Maximum frame number: " + end;
      slider.min = start;
      slider.max = end;
      slider.defaultValue = iter; // make the slide control start at the left
      slider.value = iter;
  }
  
  var vert_indices = [      // order of indices to connect the joints
  0, 1, 1, 20, 20, 2, 2, 3, 
  0, 16, 16, 17, 17, 18, 18, 19, 
  0, 12, 12, 13, 13, 14, 14, 15, 
  20, 8, 8, 9, 9, 10, 10, 11, 11, 23, 11, 24, 
  20, 4, 4, 5, 5, 6, 6, 7, 7, 21, 7, 22];

  joints = new Float32Array(75);
  for(var k=0; k < joints.length; k++)  // get the next set of 75 joints from the file
  {
    if(v == 0){
      joints[k] = nextVerts[k + (iter-1)*75];
    }
    else{
      joints[k] = verts[k + (iter-1)*75];
    }
  }
  var vertices = new Float32Array(3*vert_indices.length)  // store all points individually (3 per joint)
  for(var i=0; i < vert_indices.length; i++){
    for(var j=0; j<3; j++){
      vertices[i*3 + j] = joints[vert_indices[i]*3 + j]; 
    }
    
  }

  var n = vertices.length / 3;   // The number of vertices
  
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  return n;
}

function draw(n) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINES, 0, n);    // Draw the body
  gl.drawArrays(gl.POINTS, 0, n);   // Draw points at joints
}

function onSubmit() {
  start = document.getElementById('start').value;
  end = document.getElementById('end').value;
  if(start > end || start < 0 || end > verts.length){
    output.innerHTML = "Invalid input";
  }
  slider.min = start;
  slider.max = end;
  iter = start;
  slider.value = iter;
  output.innerHTML = "Frame number: " + slider.value;
  submitted = true;
  n = initVertexBuffers(submitted);
  draw(n);
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function oneClicked() {
  file = "Body_20151008_091800_334.txt";
  update(file);
}

function twoClicked() {
  file = "Body_20151008_091901_094.txt";
  update(file);
}

function threeClicked() {
  file = "Body_20150818_133300_794.txt";
  update(file);
}


