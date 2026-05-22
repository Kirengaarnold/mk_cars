import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function UserLogin(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/user/login', { username, password })
      navigate('/user-dashboard')
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">User Login</h1>
        <p className="text-center text-gray-600 mb-8">Sign in with your user account</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Enter your username" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <button className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign In</button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">Return to <Link to="/" className="text-blue-600 hover:text-blue-800">admin login</Link></p>
      </div>
    </div>
  )
}
