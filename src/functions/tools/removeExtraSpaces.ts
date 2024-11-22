export function removeExtraSpaces(str: unknown) {
  if (typeof str !== 'string') return str

  /**
   * Все Unicode пробелы
   * https://unicode.org/reports/tr44/#General_Category_Values:~:text=Sc%20%7C%20Sk%20%7C%20So-,Zs,-Space_Separator
   */
  return str.replaceAll(/\p{Zs}{2,}/gu, ' ')
}
