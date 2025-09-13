import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore/lite'
import { firebaseConfig } from '@/config/firebase'

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, collection }
