import { Timestamp } from '@/api/task'

export function toDate(value) {
  if (!value) return null

  if (value instanceof Date) return value
  if (value.toDate) return value.toDate()

  return new Date(value)
}

export function toTimestamp(date) {
  return Timestamp.fromDate(date)
}

export function formatForInput(date) {
  const d = toDate(date)
  if (!d) return ''
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
