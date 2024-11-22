export function trim(val: unknown) {
  if (typeof val === 'string') return val.trim()
  else return val
}
