import Konva from 'konva';
import Robowo from "./assets/robowo.svg";

// trueXPxTd, trueYPxTd, trueXFtTd, trueYFtTd, bearindTd, trigTd
export default class Robot {
  constructor(dragLayer, initX, initY, position, rotation) {
    // use self instead of this (I got no idea why tf this works, but it does) 
    const self = this;
    self.m_position = position;
    self.m_rotation = rotation;
    // create robot Sprite
    const robotSprite = new Image();
    robotSprite.onload = function () {
      const robot = new Konva.Image({
        x: initX,
        y: initY,
        image: robotSprite,
        width: 48.49,
        height: 47.98,
        draggable: true,
      });
      // make robot a global variable so other functions can access it
      self.robot = robot;

      // adds robot to dragLayer
      dragLayer.add(robot);

      // while robot is being dragged, run this.beingDragged()
      robot.on('dragmove', () => {
        self.beingDragged();
      });

      const robotRotate = new Konva.Transformer({
        nodes: [robot],
        centeredScaling: true,
        rotationSnaps: [0, 90, 180, 270],
        resizeEnabled: false,
      })
      self.robotRotate = robotRotate;

      // adds robotRotate to dragLayer
      dragLayer.add(robotRotate);

      robotRotate.on('transform', () => {
        self.beingRotated();
      })
    }
    // sets image of background
    robotSprite.src = Robowo;
  }

  // returns the position of the robot
  get position() {
    return {
      x: this.robot.x(),
      y: this.robot.y(),
    };
  }

  deleteChildren(parent) {
    let child = parent.lastElementChild
    while (child) {
      parent.removeChild(child);
      child = parent.lastElementChild;
    }
  }

  beingDragged() {
    this.deleteChildren(this.m_position);
    const {x, y} = this.position;
    // find true x and true y offsets of the origin
    const trueX = Math.round((x + this.robot.width() / 2) - 219)
    const trueY = Math.round(-1*((y + this.robot.height() / 2) - 435))
    
    this.updatePosition(trueX, trueY);
  }

  pixelsToInches(input_pixels) {
    const inches = 115.838;
    const pixels = 154.382642;
    const p2i = inches / pixels;
    return input_pixels * p2i;
  }

  // func isnt perfect b/c the way it accounts for negative numbers is wierd
  feetToInches(inches)  {
    const feet = Math.floor(inches / 12);
    let n_inches;
    if (inches > 0) {
      n_inches = Math.round(inches - feet * 12);
    } else {
      n_inches = 12 - Math.round(inches - feet * 12);
    }
    return {
      feet,
      inches: n_inches,
    };
  };

  updatePosition(trueX, trueY) {
    // pixels
    const pixelTr = document.createElement('tr');
    const pixelTdX = document.createElement('td');
    pixelTdX.classList.add('table-element', 'text-center')
    pixelTdX.innerText = trueX + ' px';
    const pixelTdY = document.createElement('td');
    pixelTdY.classList.add('table-element', 'text-center')
    pixelTdY.innerText = trueY + ' px';
    pixelTr.appendChild(pixelTdX);
    pixelTr.appendChild(pixelTdY);
    this.m_position.appendChild(pixelTr);

    // inches
    const feetTr = document.createElement('tr');
    const feetTdX = document.createElement('td');
    feetTdX.classList.add('table-element', 'text-center')
    const totalInchesX = this.pixelsToInches(trueX);
    const {feet: feetX, inches: inchesX} = this.feetToInches(totalInchesX);
    feetTdX.innerText = feetX + ' ft ' + inchesX + ' in';

    const feetTdY = document.createElement('td');
    feetTdY.classList.add('table-element', 'text-center')
    const totalInchesY = this.pixelsToInches(trueY);
    const {feet: feetY, inches: inchesY} = this.feetToInches(totalInchesY);
    feetTdY.innerText = feetY + ' ft ' + inchesY + ' in';
    feetTr.appendChild(feetTdX);
    feetTr.appendChild(feetTdY);

    this.m_position.appendChild(feetTr);
  }

  limitDegree(degree) { 
    if (degree < 0) {
      return degree + 360;
    } else {
      return degree;
    }
  }

  bearingToTrig(bearing) {
    return -1 * (bearing - 90)
  }

  beingRotated() {
    this.deleteChildren(this.m_rotation);
    const bearing = this.limitDegree(this.robotRotate.getNode().rotation())
    const trig = this.limitDegree(this.bearingToTrig(bearing))
    

    const directionTr = document.createElement('tr');
    const bearingTd = document.createElement('td');
    bearingTd.classList.add('table-element', 'text-center')
    bearingTd.innerText = bearing
    const trigTd = document.createElement('td');
    trigTd.classList.add('table-element', 'text-center')
    trigTd.innerText = trig
    directionTr.appendChild(bearingTd);
    directionTr.appendChild(trigTd);
    this.m_rotation.appendChild(directionTr);
    
  }
}