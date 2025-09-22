import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@/api/firebase'

export async function registerUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export async function logoutUser() {
  await signOut(auth)
}

export const getCurrentUser = () => {
  return new Promise(resolve => {
    const removeListener = onAuthStateChanged(auth, user => {
      removeListener()
      resolve(user)
    })
  })
}

export function requireUserId(user) {
  if (!user) throw new Error('User not authenticated')
  if (!user.uid) throw new Error('User object has no uid')
  return user.uid
}
