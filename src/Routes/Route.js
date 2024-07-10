import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "Component/Layout/Layout";
import Signup from "View/SignUp/Signup";
import Login from "View/Login/Login";
import Home from "View/Home/Home";
import AuthLayout from "Component/Layout/AuthLayout";
import Gurd from "Component/Gurd/Gurd";

export default function Route() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/signup" />,
    },
    {
      path: "/home",
      element: <Layout />,
      children: [{ path: "", element: <Gurd><Home/></Gurd> }],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
