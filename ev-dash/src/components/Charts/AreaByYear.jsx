import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function AreaByYear({ data = [] }) {
  return (
    <div style={{ width: '100%', height: 260 }} >
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopOpacity={0.8} stopColor="#fbcd10" />
              <stop offset="95%" stopOpacity={0.2} stopColor="#fbcd10" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#fbcd10" />
          <XAxis dataKey="year" tick={{ fill: "#fbcd10", fontSize: 12, fontWeight: 500 }} stroke="#fbcd10" />
          <YAxis tick={{ fill: "#fbcd10", fontSize: 12, fontWeight: 500 }} stroke="#fbcd10" />
          <Tooltip contentStyle={{ backgroundColor: "black", border: "1px solid #fbcd10", borderRadius: "8px", color: "#fbcd10" }} />
          <Area dataKey="count" stroke="#fbcd10" fill="url(#grad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
