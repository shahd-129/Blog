import { Navigate } from "react-router-dom";


export default function Gurd({children}) {

    if(localStorage.getItem("token")!==null){
            return children
    }
    else {
        return <Navigate to="/login"/>
    }
}
