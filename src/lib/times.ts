export type DeconstructedTime = { d: number; h: number; m: number; s: number; ms: number };

export function destructMS(milli: number) {
  if (isNaN(milli) || milli < 0) {
    return { d: 0, h: 0, m: 0, s: 0, ms: 0 };
  }

  let d: number, h: number, m: number, s: number, ms: number;
  s = Math.floor(milli / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  ms = Math.floor((milli % 1000) * 1000) / 1000;
  return { d: d, h: h, m: m, s: s, ms: ms };
}
