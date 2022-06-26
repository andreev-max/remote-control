import robot, { moveMouse } from "robotjs";
import { COMMANDS } from "./commands.enum";

export function handler(stringData: string) {
  try {
    console.log(`Received: ${stringData}`);

    const [command, pixels = 0, additionalPixels = 0] = stringData.split(" ");

    const { x: currentX, y: currentY } = robot.getMousePos();
    robot.setMouseDelay(500);

    let offsetX: number = 0;
    let offsetY: number = 0;
    let message = `${command} \0`;

    if (command === COMMANDS.MOUSE_UP) {
      offsetY = -Number(pixels);
    } else if (command === COMMANDS.MOUSE_DOWN) {
      offsetY = Number(pixels);
    } else if (command === COMMANDS.MOUSE_RIGHT) {
      offsetX = Number(pixels);
    } else if (command === COMMANDS.MOUSE_LEFT) {
      offsetX = -Number(pixels);
    } else if (command === COMMANDS.MOUSE_POSITION) {
      message = `${COMMANDS.MOUSE_POSITION} ${currentX + Number(pixels)},${
        currentY + Number(pixels)
      } \0`;
    } else if (command === COMMANDS.DRAW_CIRCLE) {
      robot.setMouseDelay(2);
      for (let i = 0; i < currentX + Number(pixels); i++) {
        moveMouse(currentX + offsetX, currentY + offsetY);
      }
    } else if (command === COMMANDS.DRAW_SQUARE) {
      robot.moveMouseSmooth(currentX + Number(pixels), currentY);
      robot.moveMouseSmooth(
        currentX + Number(pixels),
        currentY + Number(pixels)
      );
      robot.moveMouseSmooth(currentX, currentY + Number(pixels));
      robot.moveMouseSmooth(currentX, currentY);
    } else if (command === COMMANDS.DRAW_RECT) {
      robot.moveMouseSmooth(currentX + Number(pixels), currentY);
      robot.moveMouseSmooth(
        currentX + Number(pixels),
        currentY + Number(additionalPixels || pixels)
      );
      robot.moveMouseSmooth(
        currentX,
        currentY + Number(additionalPixels || pixels)
      );
      robot.moveMouseSmooth(currentX, currentY);
    }

    console.log("X: ", offsetX);
    console.log("Y: ", offsetY);

    // robot.moveMouse(currentX + offsetX, currentY + offsetY);

    // console.log(`Result: ${command} completed successfully \n`);
    return message;
  } catch (error) {
    console.log("Something went wrong");
  }
}
