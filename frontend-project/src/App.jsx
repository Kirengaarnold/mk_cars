import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import CreateUser from './pages/CreateUser'
import CreatePost from './pages/CreatePost'
import CreateEmployee from './pages/CreateEmployee'
import Report from './pages/Report'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4 mt-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="/report" element={<Report />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
