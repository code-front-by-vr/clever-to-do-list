export function getEnv(name) {
  const value = import.meta.env[name]

  if (!value) {
    throw new Error(`❌ Environment variable "${name}" is missing in .env.local`)
  }

  return value
}
