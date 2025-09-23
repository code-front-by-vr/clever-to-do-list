import { Timestamp } from '@/api/firebase'

export function toDate(value) {
  if (!value) {return null}

  if (value instanceof Date) {return value}
  if (value.toDate) {return value.toDate()}

  return new Date(value)
}

export function toTimestamp(date) {
  return Timestamp.fromDate(date)
}

export function formatDateToDisplayValue(date) {
  const d = toDate(date)
  if (!d) {return ''}
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
const dayFormatter = new Intl.DateTimeFormat('en-US', { day: '2-digit' })
const monthYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

export function formatMonthYear(date) {
  const formatted = monthYearFormatter.format(date)
  return formatted.replace(' ', ', ')
}

export function generateCalendarDays(startDate = new Date(), endDate = null) {
  const start = new Date(startDate)
  const days = []

  const finalDate = endDate
    ? new Date(endDate)
    : new Date(start.getFullYear(), start.getMonth() + 1, 0)

  const current = new Date(start)

  while (current <= finalDate) {
    const date = new Date(current)
    days.push({
      id: formatDateToDisplayValue(date),
      date,
      weekday: weekdayFormatter.format(date),
      formattedDate: dayFormatter.format(date),
    })
    current.setDate(current.getDate() + 1)
  }

  return days
}

export function isSameDay(date1, date2) {
  return date1.toDateString() === date2.toDateString()
}
