import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  collection,
  getDoc,
  db,
  query,
  where,
} from '@/api/firebase'
import { mapTaskToFirestore, mapFirestoreToTask, toTimestamp } from '@/lib'

function getTasksCollection(userId) {
  return collection(db, `users/${userId}/tasks`)
}

export async function addTask(userId, task) {
  const firestoreTask = mapTaskToFirestore(task)
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
  return snapshot.docs.map(doc => mapFirestoreToTask(doc.data(), doc.id))
}

export async function deleteTask(userId, taskId) {
  const taskDoc = doc(getTasksCollection(userId), taskId)
  await deleteDoc(taskDoc)
}

export async function updateTask(userId, task) {
  const { id, ...fields } = mapTaskToFirestore(task)
  const taskDoc = doc(getTasksCollection(userId), id)

  await updateDoc(taskDoc, fields)
  const snapshot = await getDoc(taskDoc)
  return mapFirestoreToTask(snapshot.data(), snapshot.id)
}
