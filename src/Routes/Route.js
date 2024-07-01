import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from 'Component/Layout'
import Signup from 'View/SignUp/Signup'
import Login from 'View/Login/Login'
import Home from 'View/Home/Home'

export default function Route() {
    let router = createBrowserRouter([
        {path: '' , element: <Layout/> , children:[
            {path:"/" , element: <Home/>},
            {path:"/signup" , element: <Signup/>},
            {path:"/login" , element: <Login/>},
        ]}
      ])
 
 
 return (<>
  <RouterProvider router={router} />
  </>
  )
}
