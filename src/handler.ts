import robot, { moveMouse } from "robotjs";
import { COMMANDS } from "./commands.enum";
import { drawCircle } from "./http_server/functions/drawCircle";
import { drawRectangle } from "./http_server/functions/drawRectangle";

export function handler(stringData: string) {
  try {
    console.log(`Received: ${stringData}`);

    const [command, pixels = 0, additionalPixels = 0] = stringData.split(" ");
    const offset = Number(pixels);
    const additionalOffset = Number(additionalPixels);

    const { x: currentX, y: currentY } = robot.getMousePos();
    robot.setMouseDelay(10);

    let message = `${command} \0`;

    if (command === COMMANDS.MOUSE_UP) {
      robot.moveMouseSmooth(currentX, currentY - offset);
    } else if (command === COMMANDS.MOUSE_DOWN) {
      robot.moveMouseSmooth(currentX, currentY + offset);
    } else if (command === COMMANDS.MOUSE_RIGHT) {
      robot.moveMouseSmooth(currentX + offset, currentY);
    } else if (command === COMMANDS.MOUSE_LEFT) {
      robot.moveMouseSmooth(currentX - offset, currentY);
    } else if (command === COMMANDS.MOUSE_POSITION) {
      message = `${COMMANDS.MOUSE_POSITION} ${currentX},${currentY} \0`;
    } else if (command === COMMANDS.DRAW_CIRCLE) {
      drawCircle(currentX, currentY, offset);
    } else if (command === COMMANDS.DRAW_SQUARE) {
      drawRectangle(currentX, currentY, offset, offset);
    } else if (command === COMMANDS.DRAW_RECT) {
      drawRectangle(currentX, currentY, offset, additionalOffset);
    }

    console.log(`Result: ${command} completed successfully \n`);
    return message;
  } catch (error) {
    console.log("Something went wrong");
  }
}
