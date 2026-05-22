import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Navbar({ auth, onLogout }){
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('/admin/logout')
    } catch (err) {
      console.error('Logout failed', err)
    } finally {
      onLogout()
      navigate('/')
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-gray-800">HR System</div>
            {auth && (
              <div className="flex gap-6">
                <Link to="/dashboard" className="text-gray-600 text-sm hover:text-gray-900 transition">Dashboard</Link>
                <Link to="/create-employee" className="text-gray-600 text-sm hover:text-gray-900 transition">Add Employee</Link>
                <Link to="/create-user" className="text-gray-600 text-sm hover:text-gray-900 transition">Create User</Link>
                <Link to="/create-post" className="text-gray-600 text-sm hover:text-gray-900 transition">Create Post</Link>
                <Link to="/report" className="text-gray-600 text-sm hover:text-gray-900 transition">Reports</Link>
              </div>
            )}
          </div>
          {auth ? (
            <button onClick={handleLogout} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition font-semibold text-sm">
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
