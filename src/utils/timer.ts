export class Timer {
  lastProc: number;

  constructor() {
    this.lastProc = Date.now() - 1000 * 60 * 50;
  }

  isTimerElapsed() {
    if (Date.now() - this.lastProc > 1000 * 60 * 60) {
      this.lastProc = Date.now();
      return true;
    }
    return false;
  }
}
