export function findCol(sample = {}, candidates = []) {
  const keys = Object.keys(sample || {})
  for (const c of candidates) {
    const exact = keys.find(k => k.toLowerCase() === c.toLowerCase())
    if (exact) return exact
  }
  for (const c of candidates) {
    const found = keys.find(k => k.toLowerCase().includes(c.toLowerCase()))
    if (found) return found
  }
  return null
}

export function toInt(n) {
  if (n == null) return null
  const x = typeof n === 'string' ? n.replace(/[^\d-]/g, '') : n
  const v = Number.parseInt(x, 10)
  return Number.isFinite(v) ? v : null
}

export function toNum(n) {
  if (n == null) return null
  const x = typeof n === 'string' ? n.replace(/[^\d.-]/g, '') : n
  const v = Number.parseFloat(x)
  return Number.isFinite(v) ? v : null
}

export function countBy(arr = [], keyFn) {
  const m = new Map()
  for (const r of arr) {
    const k = keyFn(r)
    if (k == null) continue
    m.set(k, (m.get(k) || 0) + 1)
  }
  return [...m.entries()].map(([key, value]) => ({ key, value }))
}

export function topN(list = [], n = 10) {
  return [...list].sort((a, b) => b.value - a.value).slice(0, n)
}

export function binBy(arr = [], valueFn, bins = []) {
  const out = bins.map(b => ({ label: b.label, value: 0 }))
  for (const row of arr) {
    const v = valueFn(row)
    if (v == null) continue
    const i = bins.findIndex(b => v >= b.min && v <= b.max)
    if (i >= 0) out[i].value++
  }
  return out
}

export function avg(arr = []) {
  let s = 0, c = 0
  for (const x of arr) {
    if (Number.isFinite(x)) { s += x; c++ }
  }
  return c ? (s / c) : null
}
