import { useEffect, useState } from 'react'
import api from '../api'

const defaultForm = {
  firstname:'', lastname:'', gender:'', dateofbirth:'', email:'', phonenumber:'', position:'', HireDate:'', salary:'', status:'', department:'', address:''
}

const statusOptions = ['Active', 'Inactive', 'On Leave', 'Terminated']
const departmentOptions = ['Sales', 'Engineering', 'HR', 'Finance', 'Marketing', 'Operations', 'Support', 'Legal']

export default function CreateEmployee(){
  const [form, setForm] = useState(defaultForm)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const loadEmployees = async () => {
    try{
      const res = await api.get('/employee')
      setEmployees(res.data || [])
    }catch(err){
      console.error('Failed to load employees', err)
    }
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  const handle = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      let res
      if (editingEmployee) {
        res = await api.put(`/employee/${editingEmployee.employee_id}`, form)
        alert('Employee updated successfully')
      } else {
        res = await api.post('/employee/register', form)
        alert('Employee created: ' + res.data.employee_id)
      }
      setForm(defaultForm)
      setEditingEmployee(null)
      await loadEmployees()
      setView('list')
    }catch(err){
      alert(err.response?.data?.error || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (emp) => {
    setEditingEmployee(emp)
    setForm({
      firstname: emp.firstname || '',
      lastname: emp.lastname || '',
      gender: emp.gender || '',
      dateofbirth: emp.dateofbirth || '',
      email: emp.email || '',
      phonenumber: emp.phonenumber || '',
      position: emp.position || '',
      HireDate: emp.HireDate || '',
      salary: emp.salary || '',
      status: emp.status || '',
      department: emp.department || '',
      address: emp.address || '',
    })
  }

  const handleCancelEdit = () => {
    setEditingEmployee(null)
    setForm(defaultForm)
  }

  const handleDelete = async (employee_id) => {
    if (!window.confirm('Delete this employee?')) return
    try {
      await api.delete(`/employee/${employee_id}`)
      await loadEmployees()
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting employee')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
          <p className="text-sm text-gray-600">Use the form on the left to add or edit employees, and see the list on the right.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Employee Form</h3>
                <p className="text-sm text-gray-600">Enter employee details and save directly from this panel.</p>
              </div>
              <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium">
                {editingEmployee ? 'Editing' : 'New'}
              </span>
            </div>

            <form onSubmit={handle} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstname" placeholder="First name" value={form.firstname} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="lastname" placeholder="Last name" value={form.lastname} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="dateofbirth" type="date" aria-label="Date of Birth" placeholder="Date of Birth" value={form.dateofbirth} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="phonenumber" placeholder="Phone" value={form.phonenumber} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="position" placeholder="Position" value={form.position} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="HireDate" type="date" aria-label="Hire Date" placeholder="Hire Date" value={form.HireDate} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <select name="status" value={form.status} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white">
                <option value="">Select status</option>
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <select name="department" value={form.department} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white">
                <option value="">Select department</option>
                {departmentOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <div className="sm:col-span-2 flex flex-col gap-3">
                <button disabled={loading} className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                  {loading ? 'Saving…' : editingEmployee ? 'Update Employee' : 'Create Employee'}
                </button>
                {editingEmployee ? (
                  <button type="button" onClick={handleCancelEdit} className="w-full bg-gray-200 text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                    Cancel Edit
                  </button>
                ) : null}
              </div>
            </form>
          </section>

          <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Employee List</h3>
                <p className="text-sm text-gray-600">Your newest hires appear here instantly after saving.</p>
              </div>
              <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-sm font-medium">
                {employees.length} employees
              </span>
            </div>

            <div className="overflow-x-auto">
              {employees.length === 0 ? (
                <p className="text-sm text-gray-600">No employees found. Add one to display the list.</p>
              ) : (
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
                    {employees.map(emp => (
                      <tr key={emp.employee_id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3">{emp.firstname} {emp.lastname}</td>
                        <td className="p-3">{emp.department || '-'}</td>
                        <td className="p-3">{emp.position || '-'}</td>
                        <td className="p-3 text-gray-600">{emp.email || '-'}</td>
                        <td className="p-3 flex flex-wrap gap-2">
                          <button onClick={() => handleEdit(emp)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs">Edit</button>
                          <button onClick={() => handleDelete(emp.employee_id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-xs">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
