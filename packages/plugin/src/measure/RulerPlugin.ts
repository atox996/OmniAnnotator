export class RulerPlugin {
  measure(start: [number, number], end: [number, number]): number {
    // ...测量距离逻辑...
    return Math.hypot(end[0] - start[0], end[1] - start[1]);
  }
}
