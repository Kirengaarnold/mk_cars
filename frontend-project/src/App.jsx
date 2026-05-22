import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import CreateUser from './pages/CreateUser'
import CreatePost from './pages/CreatePost'
import CreateEmployee from './pages/CreateEmployee'
import Report from './pages/Report'
import Navbar from './components/Navbar'
import api from './api'

function ProtectedRoute({ auth, loading, children }) {
  if (loading) {
    return <div className="text-center py-20 text-gray-700">Checking session…</div>
  }
  if (!auth) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    async function checkSession() {
      try {
        await api.get('/admin/me')
        setAuth(true)
      } catch (err) {
        setAuth(false)
      } finally {
        setLoading(false)
      }
    }
    checkSession()
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-50">
      {auth && <Navbar auth={auth} onLogout={() => setAuth(false)} />}
      <main className="max-w-6xl mx-auto p-4 mt-6">
        <Routes>
          <Route
            path="/"
            element={
              auth ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => setAuth(true)} />
            }
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute auth={auth} loading={loading}><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/employees"
            element={<ProtectedRoute auth={auth} loading={loading}><Employees /></ProtectedRoute>}
          />
          <Route
            path="/create-user"
            element={<ProtectedRoute auth={auth} loading={loading}><CreateUser /></ProtectedRoute>}
          />
          <Route
            path="/create-post"
            element={<ProtectedRoute auth={auth} loading={loading}><CreatePost /></ProtectedRoute>}
          />
          <Route
            path="/create-employee"
            element={<ProtectedRoute auth={auth} loading={loading}><CreateEmployee /></ProtectedRoute>}
          />
          <Route
            path="/report"
            element={<ProtectedRoute auth={auth} loading={loading}><Report /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to={auth ? '/dashboard' : '/'} replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
