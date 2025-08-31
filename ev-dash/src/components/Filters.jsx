import React from 'react'

export default function Filters(props){
  const { yearMin, setYearMin, yearMax, setYearMax, yearDomain, typeFilter, setTypeFilter, makes, makeFilter, setMakeFilter, searchModel, setSearchModel } = props

  return (
    <div className="grid gap-3 md:grid-cols-4 bg-black text-[#fbcd10] p-4 rounded shadow">
      <div>
        <div className="text-xs text-[#fbcd10]">Year range</div>
        <div className="flex gap-2 mt-1">
          <input type="number" className="w-24 border rounded px-2 py-1" value={yearMin??''} onChange={e=>setYearMin(Number(e.target.value)||null)} />
          <span className="self-center">to</span>
          <input type="number" className="w-24 border rounded px-2 py-1" value={yearMax??''} onChange={e=>setYearMax(Number(e.target.value)||null)} />
        </div>
        <div className="text-xs text-[#fbcd10] mt-1">Data: {yearDomain?.[0] ?? '—'} — {yearDomain?.[1] ?? '—'}</div>
      </div>

      <div>
        <div className="text-xs text-[#fbcd10]">EV Type</div>
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="w-full border rounded px-2 py-1 mt-1 bg-black">
          <option value="ALL">All</option>
          <option value="BEV">BEV</option>
          <option value="PHEV">PHEV</option>
        </select>
      </div>

      <div>
        <div className="text-xs text-[#fbcd10]">Make</div>
        <select value={makeFilter} onChange={e=>setMakeFilter(e.target.value)} className="w-full border rounded px-2 py-1 mt-1 bg-black">
          {makes.map(m=> <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div>
        <div className="text-xs text-[#fbcd10]">Search Model</div>
        <input value={searchModel} onChange={e=>setSearchModel(e.target.value)} placeholder="e.g., Model 3" className="w-full border rounded px-2 py-1 mt-1" />
      </div>
    </div>
  )
}
