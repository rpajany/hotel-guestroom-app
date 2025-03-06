import { Component, useEffect } from "react";
// import auth from "../services/authService";
import { useNavigate } from "react-router-dom";


function Logout({ authenticate }) {
    let navigate = useNavigate();
    useEffect(() => {
        authenticate(false);
        navigate("/"); // , { replace: true }
    }, [])

    return (
        null
    )
}

export default Logout;
