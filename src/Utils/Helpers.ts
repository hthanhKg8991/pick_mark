import { SkFont, Skia } from "@shopify/react-native-skia";
import { FONT_LIST } from "Constants/fonts";

export function isEmpty(variable: string | undefined | null) {
  return variable === null || undefined === variable || variable === '';
}

export function stringInterpolate(
  theString: string,
  argumentArray: Array<any>,
) {
  const regex = /%s/;
  const _r = function (p: any, c: any) {
    return p.replace(regex, c);
  };
  return argumentArray.reduce(_r, theString);
}

export const FONT_MAP: Record<string, string> = {};
FONT_LIST.forEach(f => {
  FONT_MAP[f.key] = f.name; // key là id, name là fontFamily
});


export const getSingleFontSize = (imageWidth: number) => {
  return imageWidth * 0.25; // bạn có thể chỉnh 0.25 – 0.4
};

export const getFontSizeForWidth = (text: string, typeface: SkFont, targetWidth: number) => {
  let fontSize = 10; // bắt đầu font nhỏ
  let font = Skia.Font(typeface.getTypeface()!, fontSize);
  let bounds = font.measureText(text);

  // tăng font size đến khi gần đạt targetWidth (80–90% width)
  while (bounds.width < targetWidth * 0.85) {
    fontSize += 1;
    font = Skia.Font(typeface.getTypeface()!, fontSize);
    bounds = font.measureText(text);

    // tránh font quá lớn vượt 90%
    if (bounds.width > targetWidth * 0.9) break;
  }

  return fontSize;
};
