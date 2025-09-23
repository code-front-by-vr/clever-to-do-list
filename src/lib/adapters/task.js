import { toTimestamp, toDate } from '../utils/date'

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

export function formToTaskData(formData, taskId = null) {
  const data = {
    title: formData.title.trim(),
    description: formData.description.trim(),
    date: toDate(formData.date),
    done: formData.done,
  }

  if (taskId) {data.id = taskId}

  return data
}
