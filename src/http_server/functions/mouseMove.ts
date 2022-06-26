import robot from "robotjs";

export function mouseMove(x: number, y: number, offset: number, direction) {
  robot.moveMouseSmooth(x + w, y);
  robot.moveMouseSmooth(x + w, y + h);
  robot.moveMouseSmooth(x, y + h);
  robot.moveMouseSmooth(x, y);
}
