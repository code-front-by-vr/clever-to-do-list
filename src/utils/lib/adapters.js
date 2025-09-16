import { toTimestamp, toDate } from '@/utils/date'

export function toFirestoreTask(task) {
  return {
    ...task,
    date: task.date instanceof Date ? toTimestamp(task.date) : task.date,
  }
}

export function fromFirestoreTask(doc) {
  const data = doc.data()
  return {
    id: doc.id,
    ...data,
    date: data.date?.toDate ? toDate(data.date) : data.date,
  }
}
