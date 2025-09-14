export function getRequiredEnvs(names) {
  const missing = []
  const values = {}

  for (const name of names) {
    const value = import.meta.env[name]

    if (!value) {
      missing.push(name)
    } else {
      values[name] = value
    }
  }

  if (missing.length > 0) {
    throw new Error(`❌ Missing environment variables:\n${missing.map(v => `- ${v}`).join('\n')}`)
  }

  return values
}
