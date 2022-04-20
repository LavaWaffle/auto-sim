import './style.css';
import Konva from 'konva';
import Field from "./assets/field.png";
import Robowo from "./assets/robowo.svg";

// sets stage width and height  
const width = 437;
const height = 867;  
// creats a stage on a div with a id of canvas
const stage = new Konva.Stage({
  container: 'canvas',
  width,
  height,
})
// sets layers
// static layer : for non moving ui elements like the background
const staticLayer = new Konva.Layer();
// drag layer : for moving ui elements such as the draggable robot
const dragLayer = new Konva.Layer();

// sets background image
const backgroundImage = new Image();
backgroundImage.onload = function () {
  const background = new Konva.Image({
    x: 0,
    y: 0,
    image: backgroundImage,
    width,
    height,
  });

  // adds background to layer
  staticLayer.add(background);
};
// sets image of background
backgroundImage.src = Field;

// sets robot sprite
const robotSprite = new Image();
robotSprite.onload = function () {
  const robot = new Konva.Image({
    x: 10,
    y: 10,
    image: robotSprite,
    width: 48.49,
    height: 47.98,
    draggable: true,
  });

  // adds background to layer
  dragLayer.add(robot);
};
// sets image of background
robotSprite.src = Robowo;


// dist in inches: 115.838
const inches = 115.838;
const pixels = 154.382642;
// conv from inche to pixels
const i2p = pixels / inches;
console.log(36 * i2p);
console.log(18.19*2*i2p);  

var redLine = new Konva.Line({
  points: [219, 435, 74, 488],
  stroke: 'red',
  strokeWidth: 1,
  lineCap: 'round',
  lineJoin: 'round',
});

dragLayer.add(redLine);

// loads background layer then drag layer
stage.add(staticLayer, dragLayer);