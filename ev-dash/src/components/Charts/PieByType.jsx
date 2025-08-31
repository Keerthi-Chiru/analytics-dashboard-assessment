import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'

export default function PieByType({ data = [] }) {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="key" cx="50%" cy="50%" outerRadius={80} label fill='#fbcd10' strokeWidth='2' stroke='#000'>
            {data.map((_, idx) => <Cell key={idx} />)}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "black", border: "1px solid #fbcd10", borderRadius: "8px", color: "#fbcd10" }}   itemStyle={{ color: "#fbcd10" }} labelStyle={{ color: "#fbcd10" }} />
          <Legend  />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
