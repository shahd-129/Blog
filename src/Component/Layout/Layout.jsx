
import React from 'react'
// import Navbar from './Navbar/Navbar.jsx'
import Sidebar from '../Sidebar/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (<>



    <Sidebar />
    <Outlet />




  </>
  )
}
