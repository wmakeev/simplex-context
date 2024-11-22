import { cast } from '@wmakeev/filtrex'

const START_SPACE_REGEX =
  /^([\s\u00A0\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]+)/m

export function countLeftTabs(str: unknown, tab = 0) {
  if (typeof str !== 'string') return 0

  tab = cast.asNumber(tab)

  if (tab <= 0) return 0

  const match = (str as string).match(START_SPACE_REGEX)?.[1]

  if (match?.length !== undefined) {
    return Math.floor(match.length / tab)
  } else {
    return 0
  }
}
