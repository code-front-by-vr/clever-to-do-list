import {addDoc, getDocs, deleteDoc, doc, Timestamp, updateDoc} from 'firebase/firestore/lite'
import {getTasksCollection} from './task-collections'

export async function addTask(userId, task) {
  const docRef = await addDoc(getTasksCollection(userId), {
    ...task,
    date: task.date instanceof Date ? Timestamp.fromDate(task.date) : task.date,
  })

  return docRef.id
}

export async function getTasks(userId) {
  const snapshot = await getDocs(getTasksCollection(userId))
  const tasks = []

  snapshot.forEach(doc => tasks.push({id: doc.id, ...doc.data()}))

  return tasks
}

export async function deleteTask(userId, taskId) {
  await deleteDoc(doc(getTasksCollection(userId), taskId))
}

export async function updateTask(userId, task) {
  const {id, ...fields} = task
  const taskDoc = doc(getTasksCollection(userId), id)

  if (fields.date instanceof Date) {
    fields.date = Timestamp.fromDate(fields.date)
  }

  await updateDoc(taskDoc, fields)
}
