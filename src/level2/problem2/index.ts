export type DowntimeLogs = [Date, Date][];

export function merge(...args: DowntimeLogs[]): DowntimeLogs {
  /**
   * insert your code here
   */
  const logs: DowntimeLogs = args.flat();

  logs.sort((a, b) => a[0].getTime() - b[0].getTime());

  const mergeLogs: DowntimeLogs = [];

  for (const [start, end] of logs) {
    if (mergeLogs.length === 0) {
      mergeLogs.push([start, end]);
    } else {
      const last = mergeLogs[mergeLogs.length - 1];
      if (start <= last[1]) {
        // Overlapping or contiguous intervals, merge them
        last[1] = new Date(Math.max(end.getTime(), last[1].getTime()));
      } else {
        // No overlap, push a new interval
        mergeLogs.push([start, end]);
      }
    }
  }

  return mergeLogs;
}
