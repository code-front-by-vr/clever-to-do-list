import { toTimestamp, toDate } from '../utils/date'

export function mapTaskToFirestore(task) {
  return {
    ...task,
    date: task.date instanceof Date ? toTimestamp(task.date) : task.date,
  }
}

export function mapFirestoreToTask(data, docId) {
  return {
    id: docId,
    ...data,
    date: data.date?.toDate ? toDate(data.date) : data.date,
  }
}

export function formToTaskData(formData, taskId = null) {
  const trimmedTitle = formData.title.trim()
  const trimmedDescription = formData.description.trim()

  if (!trimmedTitle) {
    throw new Error('Task title cannot be empty or contain only whitespace')
  }

  if (!trimmedDescription) {
    throw new Error('Task description cannot be empty or contain only whitespace')
  }

  const data = {
    title: trimmedTitle,
    description: trimmedDescription,
    date: toDate(formData.date),
    done: formData.done,
  }

  if (taskId) {
    data.id = taskId
  }

  return data
}
