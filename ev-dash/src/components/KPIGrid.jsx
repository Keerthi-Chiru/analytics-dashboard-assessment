import React from 'react'

export default function KPIGrid({ totalEVs, byType = [], avgRange, cafvShare }) {
  const tot = byType.reduce((s, d) => s + (d.value || 0), 0)
  const bev = byType.find(d => d.key === 'BEV')?.value || 0
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-[#fbcd10]">
      <div className="p-4 bg-black rounded shadow hover:scale-105 transition">
        <div className="text-xs  ">Total EVs</div>
        <div className="text-xl font-bold">{totalEVs.toLocaleString()}</div>
      </div>
      <div className="p-4 bg-black rounded shadow hover:scale-105 transition">
        <div className="text-xs  ">BEV share</div>
        <div className="text-xl font-bold">{tot ? `${Math.round(100 * bev / tot)}%` : '—'}</div>
      </div>
      <div className="p-4 bg-black rounded shadow hover:scale-105 transition">
        <div className="text-xs  ">Avg range</div>
        <div className="text-xl font-bold">{avgRange ? `${Math.round(avgRange)} mi` : '—'}</div>
      </div>
      <div className="p-4 bg-black rounded shadow hover:scale-105 transition" title='CAFV (Clean Vehicle Rebate Foundation) eligibility indicates the percentage of vehicles qualifying for government incentive rebates.'>
        <div className="text-xs" >CAFV eligible</div>
        <div className="text-xl font-bold" >{cafvShare != null ? `${Math.round(cafvShare * 100)}%` : 'N/A'}</div>
      </div>
    </div>
  )
}
