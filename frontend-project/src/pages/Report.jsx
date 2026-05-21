import { useEffect, useState } from 'react'
import api from '../api'

export default function Report(){
  const [report, setReport] = useState({})

  useEffect(()=>{
    async function load(){
      try{
        // Backend does not have a report route; attempt to fetch all employees then group
        const res = await api.get('/employee')
        const list = res.data || []
        const grouped = list.reduce((acc,e)=>{
          const dept = e.department || 'Unknown'
          acc[dept] = acc[dept]||[]
          acc[dept].push(e)
          return acc
        }, {})
        setReport(grouped)
      }catch(err){
        // fallback: no backend list
      }
    }
    load()
  },[])

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Employees by Department Report</h2>
      {Object.keys(report).length===0 ? (
        <p className="bg-white rounded-lg shadow p-6 text-gray-600">No report available from backend. Backend needs an endpoint that returns employees list.</p>
      ) : (
        Object.entries(report).map(([dept, list])=> (
          <div key={dept} className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{dept} <span className="text-blue-600 text-sm font-semibold">({list.length} employees)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {list.map(e=> <div key={e.employee_id} className="bg-gray-50 p-4 rounded border border-gray-200"><p className="text-gray-900 font-semibold">{e.firstname} {e.lastname}</p><p className="text-sm text-gray-600 mt-1">Position: {e.position}</p></div>)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
