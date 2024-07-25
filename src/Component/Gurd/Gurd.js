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

// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Guard({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (token) {
//       axios.post('/api/verify-token', {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then(response => {
//           if (response.status === 200 && response.data.valid) {
//             setIsAuthenticated(true);
//           } else {
//             setIsAuthenticated(false);
//           }
//         })
//         .catch(() => {
//           setIsAuthenticated(false);
//         });
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>
//   }

//   return isAuthenticated ? children : <Navigate to="/login" />;
// }
// // //////////////////////////////////

// // server/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');

// router.post('/verify-token', (req, res) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.status(401).json({ valid: false });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ valid: false });
//     res.json({ valid: true });
//   });
// });

// module.exports = router;

// src/components/Guard.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Guard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.get(
        "http://localhost:3000/user/validate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        console.log(response);
      if ( response.status === 200 && response.data.valid) {

        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);
  return isAuthenticated ? children : <Navigate to="/login" />;
}
