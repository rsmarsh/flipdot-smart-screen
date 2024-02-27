import path from "path";
import fs from "fs";
import figlet, { type Fonts } from "figlet";
import SIZE from "@/config/size";
import { fontList } from "@/utils/fontList";

// A growing list of fonts worth using
const DEFAULT_FONT = "Banner";
const fontsLoaded: string[] = [];

/**
 * Loads the font into figlet before attempting to use it
 * This normally works by default, but NextJS API is hijacking the route somehow and basing it from \.next\server\app\api\
 */
export const getServerFont = (fontName: figlet.Fonts = DEFAULT_FONT) => {
  // disallow unknown fonts and anyone trying to do bad things like path traversal
  if (!fontList.includes(fontName)) {
    fontName = DEFAULT_FONT;
  }

  const fontPath = path.resolve(
    process.cwd(),
    `./node_modules/figlet/fonts/${fontName}.flf`
  );

  const data = fs.readFileSync(fontPath, "utf8");

  return data;
};

export const getAsciiFromText = (text: string, font?: Fonts) => {
  console.log(font);
  const fontName = font || DEFAULT_FONT;
  const fontOptions: figlet.Options = {
    font: fontName,
    width: SIZE.width,
    horizontalLayout: "default",
    verticalLayout: "default",
  };

  // Only need to load each unique font once, then figlet can access it
  if (!fontsLoaded.includes(fontName)) {
    console.log(`Loading new font '${fontName}'`);

    const fontData = getServerFont(fontName);
    figlet.parseFont(fontName, fontData);
    fontsLoaded.push(fontName);

    console.log("Fonts Loaded: ", fontsLoaded);
  }

  console.log("converting text ", text);

  const ascii = figlet.textSync(text, { ...fontOptions });

  // figlet returns all sorts of characters, but for a flipdot it's either on or off
  // this replaces everything that isn't a space, or a new line character, into an X
  const parsedAscii = ascii.replace(/[^\s\n]/g, "X");

  // convert string to array at line breaks
  const asciiRows = parsedAscii.split("\n");

  // get a matrix to fill
  // var mat = this.matrix(aart.length + offset[0], this.columns, invert);

  // fill matrix with on/off char/void
  // aart.forEach(function (row, i) {
  //   for (var j = 0; j < row.length; j++) {
  //     mat[i + offset[0]][j + offset[1]] =
  //       row.charAt(j) === '' || row.charAt(j) === ' ' ? invert : !invert;
  //   }
  // });

  return asciiRows;
};
