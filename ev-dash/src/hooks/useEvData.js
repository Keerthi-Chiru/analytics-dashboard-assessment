import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
import { findCol, toInt, toNum, countBy, topN, binBy, avg } from '../utils/cols'

const CSV_URL = '/Electric_Vehicle_Population_Data.csv' 

export default function useEvData() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    Papa.parse(CSV_URL, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: res => {
        setRows(Array.isArray(res.data) ? res.data : [])
        setLoading(false)
      },
      error: err => {
        setError(String(err?.message || err))
        setLoading(false)
      }
    })
  }, [])

  const cols = useMemo(() => {
    const sample = rows[0] || {}
    return {
      MODEL_YEAR: findCol(sample, ['Model Year', 'model_year', 'year']),
      MAKE: findCol(sample, ['Make', 'make', 'manufacturer']),
      MODEL: findCol(sample, ['Model', 'model']),
      EV_TYPE: findCol(sample, ['Electric Vehicle Type', 'EV Type', 'Type']),
      RANGE: findCol(sample, ['Electric Range', 'EPA Range', 'Range']),
      CAFV: findCol(sample, ['CAFV Eligibility', 'Clean Alternative Fuel Vehicle']),
    }
  }, [rows])

  // year domain
  const yearDomain = useMemo(() => {
    const ys = rows.map(r => toInt(r[cols.MODEL_YEAR])).filter(v => Number.isFinite(v))
    if (!ys.length) return [null, null]
    return [Math.min(...ys), Math.max(...ys)]
  }, [rows, cols.MODEL_YEAR])

  // filters (default to full domain)
  const [yearMin, setYearMin] = useState(null)
  const [yearMax, setYearMax] = useState(null)
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [makeFilter, setMakeFilter] = useState('ALL')
  const [searchModel, setSearchModel] = useState('')

  // initialize years once data loads
  useEffect(() => {
    const [minY, maxY] = yearDomain
    if (minY != null && yearMin == null) setYearMin(minY)
    if (maxY != null && yearMax == null) setYearMax(maxY)
    // eslint-disable-next-line
  }, [yearDomain])

  const makes = useMemo(() => {
    const s = new Set(rows.map(r => r[cols.MAKE]).filter(Boolean))
    return ['ALL', ...[...s].sort((a, b) => String(a).localeCompare(String(b)))]
  }, [rows, cols.MAKE])

  const filtered = useMemo(() => {
    return rows.filter(r => {
      const y = toInt(r[cols.MODEL_YEAR])
      if (yearMin != null && y != null && y < yearMin) return false
      if (yearMax != null && y != null && y > yearMax) return false
      const t = String(r[cols.EV_TYPE] || '').toUpperCase()
      if (typeFilter !== 'ALL' && t && !t.includes(typeFilter)) return false
      if (makeFilter !== 'ALL' && r[cols.MAKE] !== makeFilter) return false
      if (searchModel.trim()) {
        const m = String(r[cols.MODEL] || '').toLowerCase()
        if (!m.includes(searchModel.toLowerCase())) return false
      }
      return true
    })
  }, [rows, cols, yearMin, yearMax, typeFilter, makeFilter, searchModel])

  const totalEVs = filtered.length

  const byType = useMemo(() => countBy(filtered, r => {
    const t = String(r[cols.EV_TYPE] || '').toUpperCase()
    return t.includes('BEV') ? 'BEV' : (t.includes('PHEV') ? 'PHEV' : (t || 'Other'))
  }), [filtered, cols.EV_TYPE])

  const byYear = useMemo(() => {
    return countBy(filtered, r => toInt(r[cols.MODEL_YEAR]))
      .filter(d => d.key != null)
      .sort((a, b) => a.key - b.key)
      .map(d => ({ year: d.key, count: d.value }))
  }, [filtered, cols.MODEL_YEAR])

  const byMake = useMemo(() => {
    const entries = countBy(filtered, r => r[cols.MAKE]).filter(d => d.key != null)
    return topN(entries, 10).map(d => ({ make: d.key, count: d.value }))
  }, [filtered, cols.MAKE])

  const rangeStats = useMemo(() => {
    const ranges = filtered.map(r => toNum(r[cols.RANGE])).filter(Number.isFinite)
    const mean = avg(ranges)
    const bins = [
      { label: '0–50', min: 0, max: 50 },
      { label: '51–100', min: 51, max: 100 },
      { label: '101–200', min: 101, max: 200 },
      { label: '201–300', min: 201, max: 300 },
      { label: '301–400', min: 301, max: 400 },
      { label: '401+', min: 401, max: 99999 },
    ]
    const dist = binBy(filtered, r => toNum(r[cols.RANGE]), bins)
    return { mean, dist }
  }, [filtered, cols.RANGE])

  const cafvShare = useMemo(() => {
    if (!cols.CAFV) return null
    let eligible = 0, known = 0
    for (const r of filtered) {
      const v = String(r[cols.CAFV] || '').toLowerCase()
      if (!v) continue
      known++
      if (v.includes('eligible')) eligible++
    }
    return known ? (eligible / known) : null
  }, [filtered, cols.CAFV])

  const topModels = useMemo(() => {
    return countBy(filtered, r => r[cols.MODEL]).filter(x => x.key).sort((a, b) => b.value - a.value).slice(0, 20)
  }, [filtered, cols.MODEL])

  return {
    rows, loading, error, cols,
    // filters + setters
    yearMin, setYearMin, yearMax, setYearMax,
    typeFilter, setTypeFilter, makeFilter, setMakeFilter,
    searchModel, setSearchModel, makes,
    // computed
    filtered, totalEVs, byType, byYear, byMake, rangeStats, cafvShare, topModels, yearDomain
  }
}
