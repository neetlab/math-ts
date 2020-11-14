export const range = (since: number, until: number) => {
  return Array.from({ length: 1 + until - since }, (_, i) => i + since);
}
