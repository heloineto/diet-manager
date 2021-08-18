export const hexToRgb = (color: HexColor) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getContrastColor = (
  color: HexColor,
  lightColor?: HexColor,
  darkColor?: HexColor
) => {
  if (!lightColor) lightColor = '#ffffff';
  if (!darkColor) darkColor = '#000000';

  const rgbColor = hexToRgb(color);
  if (!rgbColor) return null;

  const { r, g, b } = rgbColor;
  const uiColors = [r / 255, g / 255, b / 255];

  const c = uiColors.map((col) =>
    col <= 0.03928 ? col / 12.92 : Math.pow((col + 0.055) / 1.055, 2.4)
  );

  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
};
