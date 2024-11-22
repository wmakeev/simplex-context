export function typeOf(val: unknown) {
  // https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.tostring
  const type = Object.prototype.toString.call(val).slice(8, -1)

  if (type === 'Number' && !Number.isFinite(val)) {
    if (Number.isNaN(val)) return 'NaN'
    else if (val === Number.NEGATIVE_INFINITY) return '-Infinity'
    else if (val === Number.POSITIVE_INFINITY) return 'Infinity'
  }

  return type
}
