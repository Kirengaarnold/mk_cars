import { useState } from 'react'
import api from '../api'

export default function CreateEmployee(){
  const [form, setForm] = useState({
    firstname:'',lastname:'',gender:'',dateofbirth:'',email:'',phonenumber:'',position:'',HireDate:'',salary:'',status:'',department:'',address:''
  })

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const handle = async (e) =>{
    e.preventDefault()
    try{
      const res = await api.post('/employee/register', form)
      alert('Employee created: ' + res.data.employee_id)
      setForm({firstname:'',lastname:'',gender:'',dateofbirth:'',email:'',phonenumber:'',position:'',HireDate:'',salary:'',status:'',department:'',address:''})
    }catch(err){
      alert(err.response?.data?.error || 'Error')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Employee</h2>
        <form onSubmit={handle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstname" placeholder="First name" value={form.firstname} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="lastname" placeholder="Last name" value={form.lastname} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="dateofbirth" type="date" placeholder="DOB" value={form.dateofbirth} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="phonenumber" placeholder="Phone" value={form.phonenumber} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="position" placeholder="Position" value={form.position} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="HireDate" type="date" placeholder="Hire Date" value={form.HireDate} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <div className="md:col-span-2">
          <button className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition">Create Employee</button>
        </div>
      </form>
      </div>
    </div>
  )
}
