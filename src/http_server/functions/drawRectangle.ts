import robot from "robotjs";

export function drawRectangle(x: number, y: number, w: number, h: number) {
  robot.setMouseDelay(200);
  robot.moveMouseSmooth(x + w, y);
  robot.moveMouseSmooth(x + w, y + h);
  robot.moveMouseSmooth(x, y + h);
  robot.moveMouseSmooth(x, y);
}
