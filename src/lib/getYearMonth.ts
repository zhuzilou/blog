import dayjs from 'dayjs'

export const getYear = (date?: any) => {
  return date ? dayjs(date).get('year') : dayjs().get('year')
}

export const getmonth = (date?: any) => {
  return date ? dayjs(date).get('month') : dayjs().get('month')
}

export const getYearMonth = (date?: any) => {
  return date ? dayjs(date).format('YYYY-MM') : dayjs().format('YYYY-MM')
}

export const sortYearMonth = (a: string, b: string) => {
  // Split year-month strings into arrays containing year and month parts
  const [yearA, monthA] = a.split('-')
  const [yearB, monthB] = b.split('-')

  // Parse the year and month strings into integers
  const parsedYearA = parseInt(yearA, 10)
  const parsedMonthA = parseInt(monthA, 10)
  const parsedYearB = parseInt(yearB, 10)
  const parsedMonthB = parseInt(monthB, 10)

  // First, compare years. If they are equal, proceed to compare months.
  if (parsedYearA === parsedYearB) {
    return -parsedMonthA + parsedMonthB
  } else {
    return -parsedYearA + parsedYearB
  }
}
