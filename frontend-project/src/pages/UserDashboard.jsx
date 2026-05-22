import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function UserDashboard(){
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/user/me')
        setProfile(res.data)
      } catch (err) {
        navigate('/user-login')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await api.post('/user/logout')
    } catch (err) {
      console.error(err)
    }
    navigate('/user-login')
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-700">Loading your dashboard…</div>
  }

  if (!profile) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile.username}</h1>
          <p className="text-sm text-gray-600">Employee dashboard for {profile.firstname} {profile.lastname}</p>
        </div>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Logout</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-6 rounded-lg">
          <h2 className="font-semibold text-lg mb-3">Employee Info</h2>
          <p><span className="font-medium">Name:</span> {profile.firstname} {profile.lastname}</p>
          <p><span className="font-medium">Department:</span> {profile.department || '-'}</p>
          <p><span className="font-medium">Position:</span> {profile.position || '-'}</p>
          <p><span className="font-medium">Email:</span> {profile.email || '-'}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-lg">
          <h2 className="font-semibold text-lg mb-3">Account Details</h2>
          <p><span className="font-medium">Username:</span> {profile.username}</p>
          <p><span className="font-medium">Employee ID:</span> {profile.employee_id}</p>
          <p><span className="font-medium">User ID:</span> {profile.user_id}</p>
        </div>
      </div>
    </div>
  )
}
