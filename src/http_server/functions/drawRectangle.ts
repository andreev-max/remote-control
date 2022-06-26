import { setMouseDelay, moveMouseSmooth } from "robotjs";

export function drawRectangle(x: number, y: number, w: number, h: number) {
  setMouseDelay(200);
  moveMouseSmooth(x + w, y);
  moveMouseSmooth(x + w, y + h);
  moveMouseSmooth(x, y + h);
  moveMouseSmooth(x, y);
}
