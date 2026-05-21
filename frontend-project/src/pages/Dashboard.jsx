import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard(){
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [totalDepartments, setTotalDepartments] = useState(0)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get('/employee')
        const employees = res.data || []
        setTotalEmployees(employees.length)
        
        // Count unique departments
        const departments = new Set(employees.map(e => e.department).filter(d => d))
        setTotalDepartments(departments.size)
      } catch (err) {
        console.error('Failed to fetch employee stats:', err)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Quick Actions</h3>
          <ul className="space-y-3">
            <li><Link to="/create-employee" className="text-blue-600 hover:text-blue-800 font-medium transition">+ Add Employee</Link></li>
            <li><Link to="/create-user" className="text-blue-600 hover:text-blue-800 font-medium transition">+ Create User</Link></li>
            <li><Link to="/create-post" className="text-blue-600 hover:text-blue-800 font-medium transition">+ Create Post</Link></li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-400">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Statistics</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{totalDepartments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-300">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Reports</h3>
          <Link to="/report" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold w-full text-center text-sm">
            View Employee Report
          </Link>
          <p className="text-sm text-gray-600 mt-4">View employees grouped by department</p>
        </div>
      </div>
    </div>
  )
}
