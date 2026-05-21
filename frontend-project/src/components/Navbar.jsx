import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-gray-800">HR System</div>
            <div className="flex gap-6">
              <Link to="/dashboard" className="text-gray-600 text-sm hover:text-gray-900 transition">Dashboard</Link>
              <Link to="/employees" className="text-gray-600 text-sm hover:text-gray-900 transition">Employees</Link>
              <Link to="/create-employee" className="text-gray-600 text-sm hover:text-gray-900 transition">Add Employee</Link>
              <Link to="/create-user" className="text-gray-600 text-sm hover:text-gray-900 transition">Create User</Link>
              <Link to="/create-post" className="text-gray-600 text-sm hover:text-gray-900 transition">Create Post</Link>
              <Link to="/report" className="text-gray-600 text-sm hover:text-gray-900 transition">Reports</Link>
            </div>
          </div>
          <Link to="/login" className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition font-semibold text-sm">Logout</Link>
        </div>
      </div>
    </nav>
  )
}
