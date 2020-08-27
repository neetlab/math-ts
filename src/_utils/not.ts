export const not = <T extends unknown[]>(fn: (...args: T) => boolean) => (...args: T) => !fn(...args);
