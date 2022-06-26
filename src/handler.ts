import { moveMouseSmooth, setMouseDelay, getMousePos, screen } from "robotjs";
import { COMMANDS } from "./commands.enum";
import { drawCircle } from "./http_server/functions/drawCircle";
import { drawRectangle } from "./http_server/functions/drawRectangle";
import { printScreen } from "./http_server/functions/printScreen";

export async function handler(data: string) {
  try {
    console.log(`Received: ${data}`);

    const [command, pixels = 0, additionalPixels = 0] = data.split(" ");
    const offset = Number(pixels);
    const additionalOffset = Number(additionalPixels);

    const { x: currentX, y: currentY } = getMousePos();
    setMouseDelay(10);

    let message = `${command} \0`;

    if (command === COMMANDS.MOUSE_UP) {
      moveMouseSmooth(currentX, currentY - offset);
    } else if (command === COMMANDS.MOUSE_DOWN) {
      moveMouseSmooth(currentX, currentY + offset);
    } else if (command === COMMANDS.MOUSE_RIGHT) {
      moveMouseSmooth(currentX + offset, currentY);
    } else if (command === COMMANDS.MOUSE_LEFT) {
      moveMouseSmooth(currentX - offset, currentY);
    } else if (command === COMMANDS.MOUSE_POSITION) {
      message = `${COMMANDS.MOUSE_POSITION} ${currentX},${currentY} \0`;
    } else if (command === COMMANDS.DRAW_CIRCLE) {
      drawCircle(currentX, currentY, offset);
    } else if (command === COMMANDS.DRAW_SQUARE) {
      drawRectangle(currentX, currentY, offset, offset);
    } else if (command === COMMANDS.DRAW_RECT) {
      drawRectangle(currentX, currentY, offset, additionalOffset);
    } else if (command === COMMANDS.PRINT_SCREEN) {
      message = await printScreen(currentX, currentY);
    }

    console.log(`Result: ${command} completed successfully \n`);
    return message;
  } catch (error) {
    console.log("Something went wrong");
    return `An error has already occurs during the execution of the last command \n`;
  }
}
