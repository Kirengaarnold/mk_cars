import { useState } from 'react'
import api from '../api'

export default function CreatePost(){
  const [postname, setPostname] = useState('')

  const handle = async (e) =>{
    e.preventDefault()
    try{
      const res = await api.post('/post/register', { postname })
      alert('Post created: ' + res.data.post_id)
      setPostname('')
    }catch(err){
      alert(err.response?.data?.error || 'Error')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Post Name</label>
            <input value={postname} onChange={e=>setPostname(e.target.value)} placeholder="e.g., Manager, Developer" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <button className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-6">Create Post</button>
        </form>
      </div>
    </div>
  )
}
