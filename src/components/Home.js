import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import { connect } from 'react-redux'
import '../style/dashboard.css'
// import Dashboard from './Dashboard'

function Home({ isAuth }) {
    localStorage.setItem("loginDetails", JSON.stringify(isAuth))
    let loginStatus = localStorage.getItem("isAuth")
    if (loginStatus === "false") {
        return <Redirect to='/' />
    }
    return (
        <div>

            <section id="cover" className="min-vh-100" >
                <Header />
                {/* <Dashboard /> */}
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.login
    }
}

export default connect(mapStateToProps)(Home)


