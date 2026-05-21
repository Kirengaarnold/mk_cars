import { useState } from 'react'
import api from '../api'

export default function CreateUser(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handle = async (e) =>{
    e.preventDefault()
    try{
      const res = await api.post('/user/register', { username, password })
      alert('User created: ' + res.data.user_id)
      setUsername(''); setPassword('')
    }catch(err){
      alert(err.response?.data?.error || err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New User</h2>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Enter username" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Enter password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <button className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-6">Create User</button>
        </form>
      </div>
    </div>
  )
}
