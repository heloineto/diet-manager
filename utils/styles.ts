export const hexToRgb = (color: HexColor): RgbColor => {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  return res
    ? `${parseInt(res[1], 16)} ${parseInt(res[2], 16)} ${parseInt(res[3], 16)}`
    : '0 0 0';
};
