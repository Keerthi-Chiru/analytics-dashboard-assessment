import React from 'react'
import useEvData from '../hooks/useEvData'
import Filters from '../components/Filters'
import KPIGrid from '../components/KPIGrid'
import AreaByYear from '../components/Charts/AreaByYear'
import BarByMake from '../components/Charts/BarByMake'
import PieByType from '../components/Charts/PieByType'
import RangeDistribution from '../components/Charts/RangeDistribution'
import TopModelsTable from '../components/Charts/TopModelsTable'
import Papa from 'papaparse'

export default function Dashboard(){
  const data = useEvData()
  if (data.loading) return <div className="p-8">Loading CSV…</div>
  if (data.error) return <div className="p-8 text-red-600">Error: {data.error}</div>

  const { totalEVs, byType, byYear, byMake, rangeStats, cafvShare, topModels, filtered } = data

  function handleExport(){
    const csv = Papa.unparse(filtered)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ev-filtered.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

// Dashboard.jsx (only key style updates shown)
return (
  <div className="min-h-screen bg-[#fbcd10] ">
    {/* HEADER */}
    <header className="bg-black  backdrop-blur border-b sticky top-0 z-20 shadow-sm ">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#fbcd10]">⚡ EV Analytics Dashboard</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleExport} 
            className="px-4 py-2 bg-[#fbcd10] text-black font-bold rounded-lg hover:scale-105 cursor-pointer transition"
          >
            Export CSV
          </button>
        </div>
      </div>
    </header>

    {/* MAIN */}
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <Filters {...data} />
      <KPIGrid totalEVs={totalEVs} byType={byType} avgRange={rangeStats.mean} cafvShare={cafvShare} />

      <div className="grid gap-6 lg:grid-cols-2 ">
        <div className="p-6 bg-black text-[#fbcd10] rounded-2xl shadow-md hover:shadow-lg hover:scale-102 transition">
          <h3 className="text-lg font-semibold mb-4">📈 EVs by Model Year</h3>
          <AreaByYear data={byYear} />
        </div>

        <div className="p-6 rounded-2xl shadow-md hover:shadow-lg transition bg-black text-[#fbcd10] hover:scale-102">
          <h3 className="text-lg font-semibold mb-4">🏭 Top 10 Makes</h3>
          <BarByMake data={byMake} />
        </div>

        <div className="p-6 bg-black text-[#fbcd10] rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4">🔋 BEV vs PHEV</h3>
          <PieByType data={byType} />
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4">📊 Electric Range Distribution</h3>
          <RangeDistribution data={rangeStats.dist} />
        </div>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold mb-4">🚗 Top Models</h3>
        <TopModelsTable data={topModels} />
      </div>
    </main>
  </div>
)

}
