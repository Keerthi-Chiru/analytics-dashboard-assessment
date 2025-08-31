import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function BarByMake({ data = [] }) {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#fbcd10" />
          <XAxis dataKey="make" interval={0} angle={-20} textAnchor="end" height={70} stroke="#fbcd10" />
          <YAxis stroke="#fbcd10" />
          <Tooltip contentStyle={{ backgroundColor: "black", border: "1px solid #fbcd10", borderRadius: "8px", color: "#fbcd10" }}  />
          <Bar dataKey="count" fill='#fbcd10' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
