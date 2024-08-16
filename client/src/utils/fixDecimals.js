export function fixDecimals(x) {
  let e = null;
  if (Math.abs(x) < 1.0) {
    e = parseInt(x.toString().split("e-")[1], 10);
    if (e) {
      // eslint-disable-next-line no-param-reassign
      x *= 10 ** (e - 1);
      // eslint-disable-next-line no-param-reassign
      x = `0.${new Array(e).join("0")}${x.toString().substring(2)}`;
    }
  } else {
    e = parseInt(x.toString().split("+")[1], 10);
    if (e > 20) {
      e -= 20;
      // eslint-disable-next-line no-param-reassign
      x /= 10 ** e;
      // eslint-disable-next-line no-param-reassign
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}
