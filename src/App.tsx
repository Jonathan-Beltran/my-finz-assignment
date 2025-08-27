import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import LoginPage from './LoginPage'
import MarginPage from './MarginPage'
import { auth } from './firebase'
import { onAuthStateChanged, type User} from 'firebase/auth'

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }


  return (
    <BrowserRouter>
      <Routes>
        {/* login page route*/}
        <Route path="/userlogin" element={!user ? <LoginPage /> : <Navigate to= "/margin"/>} />

        {/* margin tab page route available only after login*/}
        <Route path="/margin" element={user ? <MarginPage /> : <Navigate to="/userlogin" />} />

        {/* default route*/}
        <Route path="/" element={<Navigate to={user ? "/margin" : "/userlogin"} />} />
        
        {/*
        <Route path="/" element={<MarginPage/>} />
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
