export function typeOf(val: unknown) {
  const type = Object.prototype.toString
    .call(val)
    .slice(1, -1)
    .split(' ')[1]
    ?.toLowerCase()

  if (type === 'number' && !Number.isFinite(val)) {
    if (Number.isNaN(val)) return 'nan'
    else if (val === Number.NEGATIVE_INFINITY) return '-infinity'
    else if (val === Number.POSITIVE_INFINITY) return 'infinity'
  }

  return type
}
