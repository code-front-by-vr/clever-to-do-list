import { addDoc, getDocs, deleteDoc, doc, updateDoc, collection, getDoc } from '@/api/firebase'
import { db, query, where } from '@/api/firebase'
import { toFirestoreTask, fromFirestoreTask, toTimestamp } from '@/lib'

function getTasksCollection(userId) {
  return collection(db, `users/${userId}/tasks`)
}

export async function addTask(userId, task) {
  const firestoreTask = toFirestoreTask(task)
  const docRef = await addDoc(getTasksCollection(userId), firestoreTask)

  return { id: docRef.id, ...task }
}

export async function getTasksByDateRange(userId, startDate, endDate) {
  const taskCollection = getTasksCollection(userId)
  const q = query(
    taskCollection,
    where('date', '>=', toTimestamp(startDate)),
    where('date', '<=', toTimestamp(endDate))
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(fromFirestoreTask)
}

export async function deleteTask(userId, taskId) {
  const taskDoc = doc(getTasksCollection(userId), taskId)
  await deleteDoc(taskDoc)
}

export async function updateTask(userId, task) {
  const { id, ...fields } = toFirestoreTask(task)
  const taskDoc = doc(getTasksCollection(userId), id)

  await updateDoc(taskDoc, fields)
  const snapshot = await getDoc(taskDoc)
  return fromFirestoreTask(snapshot)
}
