import React from 'react'

export default function TopModelsTable({ data = [] }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">#</th>
            <th className="text-left p-2">Model</th>
            <th className="text-right p-2">Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={r.key || i} className="border-b hover:bg-gray-50">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{r.key}</td>
              <td className="p-2 text-right">{r.value.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
