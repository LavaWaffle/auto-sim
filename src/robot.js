import Konva from 'konva';

export default class Robot {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = src;
  }

  get image() {
    const robot = new Konva.Image({
      x: this.x,
      y: this.y,
      image: robotSprite,
      width: this.width, // 48.49
      height: this.height, // 47.98
      draggable: true,
    });
    return robot;
  }
}