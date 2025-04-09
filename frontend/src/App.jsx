import { useState } from 'react'
import {BrowserRouter as Router } from "react-router-dom";
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import PublicRoutes from './PublicRoutes'
import Footer from './Footer';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
      <PublicRoutes />
      
    </Router>
        <Header/>
        <Sidebar/>
        <Footer/>


    </>
  )
}

export default App
