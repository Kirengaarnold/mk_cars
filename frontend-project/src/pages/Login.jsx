import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin }){
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const res = await api.post('/admin/login', { name, password })
      if(res.data){
        onLogin?.()
        navigate('/dashboard')
      }
    }catch(err){
      alert(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome</h1>
        <p className="text-center text-gray-600 mb-8">HR Management System</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <button className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign In</button>
        </form>
      </div>
    </div>
  )
}
