import React from 'react'
import { Redirect } from 'react-router-dom'

function Logout() {
    localStorage.setItem("isAuth", false)
    return <Redirect to="/"/>
}

export default Logout
