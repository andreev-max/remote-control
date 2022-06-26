import Jimp from "jimp";
import { screen } from "robotjs";

export async function printScreen(x: number, y: number) {
  try {
    const picture = screen.capture(x - 100, y - 100, 200, 200);
    const image = new Jimp(picture.width, picture.height);

    image.bitmap.data = picture.image;
    const imageBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    return `prnt_scrn ${imageBuffer.toString("base64")}`;
  } catch (e) {
    console.log(e);
    return `prnt_scrn error`;
  }
}
