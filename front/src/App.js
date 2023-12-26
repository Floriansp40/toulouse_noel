import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthGuard from './_helpers/AuthGuard'
import MainLayout from './pages/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'


function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/admin/*" element={
              <AuthGuard>
                <Routes>
                  <Route index element={<Dashboard/>} />
                  <Route path="dashboard" element={<Dashboard/>} />
                </Routes>
              </AuthGuard>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
