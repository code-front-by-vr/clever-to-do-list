import { addDoc, getDocs, deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore/lite'
import { getTasksCollection } from '@/api/task-collections'
import { toTimestamp } from '@/utils/date'

export async function addTask(userId, task) {
  const docRef = await addDoc(getTasksCollection(userId), {
    ...task,
    date: task.date instanceof Date ? toTimestamp(task.date) : task.date,
  })

  return docRef.id
}

export async function getTasks(userId) {
  const snapshot = await getDocs(getTasksCollection(userId))
  const tasks = []

  snapshot.forEach(doc => tasks.push({ id: doc.id, ...doc.data() }))

  return tasks
}

export async function deleteTask(userId, taskId) {
  const taskDoc = doc(getTasksCollection(userId), taskId)
  await deleteDoc(taskDoc)
}

export async function updateTask(userId, task) {
  const { id, ...fields } = task
  const taskDoc = doc(getTasksCollection(userId), id)

  if (fields.date instanceof Date) {
    fields.date = toTimestamp(fields.date)
  }

  await updateDoc(taskDoc, fields)
}

export { Timestamp }
