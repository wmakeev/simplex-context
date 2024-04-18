import { cast } from '@wmakeev/filtrex'

export function round(num: unknown, places = 0) {
  num = cast.asNumber(num)
  places = cast.asNumber(places)

  if (Math.abs(places) > 10) {
    throw new Error(`places argument should be inside -10 to 10`)
  }

  const powPlaces = Math.pow(10, places)

  return Math.round((num as number) * powPlaces) / powPlaces
}
