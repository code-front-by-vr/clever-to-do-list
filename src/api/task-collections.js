import { db } from '../config/firebase'
import { collection } from 'firebase/firestore/lite'

export function getTasksCollection(userId) {
  return collection(db, `users/${userId}/tasks`)
}
