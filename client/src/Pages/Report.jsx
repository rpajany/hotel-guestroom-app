// rfce tab
import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Report = () => {
    const navigate = useNavigate();
    let { Bill_No } = useParams()
    return (
        <div>
            <h1>Report - {Bill_No}</h1>
            <button onClick={() => { navigate("/rooms") }}>Go to Rooms page</button>
        </div>
    );
}

export default Report;