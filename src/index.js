import './style.css';
import Konva from 'konva';
import Field from "./assets/field.png";
import Robowo from "./assets/robowo.svg";

// grab dom elements
const trueXTd = document.getElementById('trueX');
const trueYTd = document.getElementById('trueY');
const trueXFtTd = document.getElementById('trueXFeet');
const trueYFtTd = document.getElementById('trueYFeet');
const bearingTd = document.getElementById('bearing');
const trigTd = document.getElementById('trig');

// global conversion factores
const inches = 115.838;
const pixels = 154.382642;
// pixels to inches
const p2i = inches / pixels;
// inches to feet and inches
const i2f = (m_inches) => {
  const feet = Math.floor(m_inches / 12);
  let n_inches;
  if (m_inches > 0) {
    n_inches = Math.round(m_inches - (feet * 12))
  } else {
    n_inches = 12 - Math.round(m_inches - (feet * 12))
  } 
  return {
    feet, inches: n_inches,
  }
}

// initialize global variables
let bearing;
let trig;
let x;
let y;

// set x y of robot
const setRobot = (robot) => {
  x = robot.x()
  y = robot.y()
  const trueX = Math.round((robot.x() + robot.width() / 2) - 219)
  const trueY = Math.round(-1*((robot.y() + robot.height() / 2) - 435))
  // console.log(trueX, trueY)
  trueXTd.innerText = trueX + " pixels";
  trueYTd.innerText = trueY + " pixels";
  const { feet:xfeet, inches:xinches } = i2f(trueX * p2i);
  const { feet:yfeet, inches:yinches } = i2f(trueY * p2i);
  trueXFtTd.innerText = `${xfeet} feet ${xinches} inches`;
  trueYFtTd.innerText = `${yfeet} feet ${yinches} inches`;
}

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
    x: 195,
    y: 400,
    image: robotSprite,
    width: 48.49,
    height: 47.98,
    draggable: true,
  });

  // adds robot to dragLayer
  dragLayer.add(robot);
  
  // while robot is being dragged, update the table with its x y values
  robot.on('dragmove', () => {
    setRobot(robot)
  })

  const robotRotate = new Konva.Transformer({
    nodes: [robot],
    centeredScaling: true,
    rotationSnaps: [0, 90, 180, 270],
    resizeEnabled: false,
  })

  robotRotate.on('transform', () => {
    bearing = Math.round(robotRotate.getNode().rotation());
    if (bearing < 0) {
      bearing = 360 + bearing;
    }
    trig = Math.round(-1 * (robotRotate.getNode().rotation() - 90))
    if (trig < 0) {
      trig = 360 + trig;
    }
    bearingTd.innerText = bearing + ' bearings';
    trigTd.innerText = trig + ' degrees';
    setRobot(robot)
  })

  // adds robotRotate to dragLayer
  dragLayer.add(robotRotate);
};
// sets image of background
robotSprite.src = Robowo;


// conv from inche to pixels
// console.log(36 * i2p);
// console.log(18.19*2*i2p);  

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