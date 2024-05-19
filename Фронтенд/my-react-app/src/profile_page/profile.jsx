import { useLocation } from "react-router-dom"
import p from "./profile.module.css"
import Header from './components/header_p'
import Person from './components/person'
import History from './components/history'
import { useState } from 'react';
import { useNavigate } from "react-router-dom"


const Profile = () => {
    const navigate = useNavigate();
    return (
        <div className={p.app_wrapper}>
            <Header className={p.header}/>
            <main className={p.main}>
                <Person name={localStorage.getItem('userNameId')} />
                <div className={p.content_wrapper}>
                    <div className={p.wrapper1}>
                        <History />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile