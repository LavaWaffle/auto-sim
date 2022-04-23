import "./style.css";
import Konva from "konva";
import Field from "./assets/field.png";
import Robowo from "./assets/robowo.svg";
import Robot from "./robot.js";

// grab dom elements
const position = document.getElementById("position");
const rotation = document.getElementById("rotation");

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
    n_inches = Math.round(m_inches - feet * 12);
  } else {
    n_inches = 12 - Math.round(m_inches - feet * 12);
  }
  return {
    feet,
    inches: n_inches,
  };
};

// sets stage width and height
const width = 437;
const height = 867;
// creats a stage on a div with a id of canvas
const stage = new Konva.Stage({
  container: "canvas",
  width,
  height,
});
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

const robot = new Robot(dragLayer, width/2-(48.49/2), height/2-(47.98/2), position, rotation);

var redLine = new Konva.Line({
  points: [219, 435, 74, 488],
  stroke: "red",
  strokeWidth: 1,
  lineCap: "round",
  lineJoin: "round",
});

dragLayer.add(redLine);

// loads background layer then drag layer
stage.add(staticLayer, dragLayer);
