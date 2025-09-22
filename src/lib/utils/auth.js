export function requireUserId(rootGetters) {
  const userId = rootGetters['auth/userId']
  if (!userId) throw new Error('User not authenticated')
  return userId
}
