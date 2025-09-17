import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  collection,
  getDoc,
} from 'firebase/firestore/lite'
import { db } from '@/api/firebase'
import { toFirestoreTask, fromFirestoreTask } from '@/lib/adapters'

function getTasksCollection(userId) {
  return collection(db, `users/${userId}/tasks`)
}

export async function addTask(userId, task) {
  const firestoreTask = toFirestoreTask(task)
  const docRef = await addDoc(getTasksCollection(userId), firestoreTask)

  return { id: docRef.id, ...task }
}

export async function getTasks(userId) {
  const snapshot = await getDocs(getTasksCollection(userId))

  return snapshot.docs.map(doc => fromFirestoreTask(doc))
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
