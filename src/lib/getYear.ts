import dayjs from 'dayjs'

export const getYear = (date?: any) => {
  return date ? dayjs(date).get('year') : dayjs().get('year')
}
