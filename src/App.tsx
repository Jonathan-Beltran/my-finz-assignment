import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import LoginPage from './LoginPage'
import MarginPage from './MarginPage'
function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* login page route*/}
        <Route path="/userlogin" element={<LoginPage />} />

        {/* margin tab page route available only after login*/}
        <Route path="/margin" element={user ? <MarginPage /> : <Navigate to="/userlogin" />} />

        {/* default route*
        <Route path="/" element={<Navigate to={user ? "/margin" : "/userlogin"} />} />
        */}
        <Route path="/" element={<MarginPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
