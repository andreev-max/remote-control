import robot from "robotjs";

export function drawCircle(x: number, y: number, r: number) {
  robot.setMouseDelay(10);
  for (let i = 0; i <= Math.PI * 2; i += 0.1) {
    robot.dragMouse(x + r * Math.cos(i), y + r * Math.sin(i));
  }
}
