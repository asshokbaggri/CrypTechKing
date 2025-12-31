const cooldownMap = new Map()

export function isCooldown(key, seconds = 900) {
  const now = Date.now()
  const last = cooldownMap.get(key) || 0

  if (now - last < seconds * 1000) return true

  cooldownMap.set(key, now)
  return false
}
