export function toUpperCase(val: unknown) {
  if (typeof val === 'string') return val.toUpperCase()
  else return val
}
