import { IFilter } from "models/Filter.interface";

export const filterType: IFilter[] = [
  { name: "Edgetv", command: "edgetv" },
  { name: "Revtv", command: "revtv" },
  { name: "Agingtv", command: "agingtv" },
  { name: "Optv", command: "optv" },
  { name: "Quarktv", command: "quarktv" },
  { name: "Radioactv", command: "radioactv" },
  { name: "Rippletv", command: "rippletv" },
  { name: "Shagadelictv", command: "shagadelictv" },
  { name: "Streaktv", command: "streaktv" },
  { name: "Vertigotv", command: "vertigotv" },
  { name: "Warptv", command: "warptv" },
  { name: "Bulge", command: "bulge" },
  { name: "Kaleidoscope", command: "kaleidoscope" },
  { name: "Mirror", command: "mirror" },
  { name: "Pinch", command: "pinch" },
  { name: "Stretch", command: "stretch" },
  { name: "Twirl", command: "twirl" },
  { name: "Square", command: "square" },
  { name: "Heat", command: "coloreffects preset=heat" },
  { name: "GrayScale", command: "videobalance saturation=0.0" },
  { name: "Dicetv", command: "dicetv" },
  {
    name: "Time overlay",
    command: `timeoverlay valignment=bottom halignment=right font-desc="Sans, 30"`,
  },
];
