// import { Navigate } from "react-router-dom";

// export default function Gurd({children}) {

//     if(!!localStorage.getItem("token")){
//             return children
//     }
//     else {
//         return <Navigate to="/login"/>
//     }
// }
// // ////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// export default function Guard({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   const checkTokenValidity = async () => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       const response = await axios.get(
//         "http://localhost:3000/user/validate",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//         console.log(response);
//       if ( response.status === 200 && response.data.valid) {

//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     }
//   };

//   useEffect(() => {
//     checkTokenValidity();
//   }, []);
//   return isAuthenticated ? children : <Navigate to="/login" />;
// }
