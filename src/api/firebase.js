import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  collection,
  getFirestore,
  Timestamp,
  query,
  where,
} from 'firebase/firestore/lite'
import { firebaseConfig } from '@/config/firebase'

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  collection,
  Timestamp,
  query,
  where,
}
