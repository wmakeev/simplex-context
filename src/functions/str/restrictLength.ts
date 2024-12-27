import { cast } from '@wmakeev/filtrex'

export function restrictLength(str: unknown, maxLen: unknown, filler: unknown) {
  const _str = cast.asString(str)
  const _maxLen = cast.asNumber(maxLen)
  const _filler = filler != null ? cast.asString(filler) : '...'

  if (_filler.length >= _maxLen) {
    throw new Error('to long filler text')
  }

  return _str.length > _maxLen
    ? _str.substring(0, _maxLen - _filler.length) + _filler
    : _str
}
