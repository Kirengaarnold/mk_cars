import { useEffect, useState } from 'react'
import api from '../api'

export default function Employees(){
  const [employees, setEmployees] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [editForm, setEditForm] = useState({
    firstname:'',lastname:'',gender:'',dateofbirth:'',email:'',phonenumber:'',position:'',HireDate:'',salary:'',status:'',department:'',address:''
  })

  const loadEmployees = async () => {
    try{
      const res = await api.get('/employee')
      setEmployees(res.data || [])
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    loadEmployees()
  },[])

  const handleEdit = (employee) => {
    setEditingEmployee(employee)
    setEditForm(employee)
    setShowEditModal(true)
  }

  const handleEditChange = (e) => {
    setEditForm({...editForm, [e.target.name]: e.target.value})
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try{
      await api.put(`/employee/${editingEmployee.employee_id}`, editForm)
      alert('Employee updated successfully')
      setShowEditModal(false)
      loadEmployees()
    }catch(err){
      alert(err.response?.data?.error || 'Error updating employee')
    }
  }

  const handleDelete = async (employee_id) => {
    if(window.confirm('Are you sure you want to delete this employee?')){
      try{
        await api.delete(`/employee/${employee_id}`)
        alert('Employee deleted successfully')
        loadEmployees()
      }catch(err){
        alert(err.response?.data?.error || 'Error deleting employee')
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Employees List</h2>
      {employees.length===0 ? (
        <p className="text-sm text-gray-600">No employees found. Create one to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="text-left p-3 font-semibold text-gray-800">Name</th>
                <th className="text-left p-3 font-semibold text-gray-800">Department</th>
                <th className="text-left p-3 font-semibold text-gray-800">Position</th>
                <th className="text-left p-3 font-semibold text-gray-800">Email</th>
                <th className="text-left p-3 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp=> (
                <tr key={emp.employee_id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{emp.firstname} {emp.lastname}</td>
                  <td className="p-3">{emp.department || '-'}</td>
                  <td className="p-3">{emp.position || '-'}</td>
                  <td className="p-3 text-gray-600">{emp.email || '-'}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(emp)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">Edit</button>
                    <button onClick={() => handleDelete(emp.employee_id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Employee</h3>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstname" placeholder="First name" value={editForm.firstname} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="lastname" placeholder="Last name" value={editForm.lastname} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="gender" placeholder="Gender" value={editForm.gender} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="dateofbirth" type="date" value={editForm.dateofbirth} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="email" placeholder="Email" value={editForm.email} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="phonenumber" placeholder="Phone" value={editForm.phonenumber} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="position" placeholder="Position" value={editForm.position} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="HireDate" type="date" value={editForm.HireDate} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="salary" placeholder="Salary" value={editForm.salary} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="status" placeholder="Status" value={editForm.status} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="department" placeholder="Department" value={editForm.department} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="address" placeholder="Address" value={editForm.address} onChange={handleEditChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition">Update Employee</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-400 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-500 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
