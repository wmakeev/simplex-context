export function toLowerCase(val: unknown) {
  if (typeof val === 'string') return val.toLowerCase()
  else return val
}
