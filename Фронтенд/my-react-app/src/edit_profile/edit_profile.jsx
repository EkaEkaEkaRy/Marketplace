import s from './edit_profile.module.css'
import Person from './components/profile'
import Edit_form from './components/edit'
import { Navigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Header from './components/header'
import arrow from "./components/image/left-arrow.png"

const Edit_profile = () => {

    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getShoppingCart = async () => {
            const res = await fetch('http://localhost:1337/api/info-user?user=' + localStorage.getItem('userId'), {
                method: "GET"
            });
            if (res.status === 200) {
                const data = await res.json()
                SetResList(JSON.stringify(data[0]));
                setIsLoading(false)
          }}
        
          getShoppingCart();
    }, [])

      if (isLoading) {
        return <div>Loading...</div>;
      }


    if (!localStorage.getItem('user_role')){
        return <Navigate to="/Login" />
      }

    return(
        <div className={s.app_wrapper}>
            <Header/>
        <main className={s.main}>
        <NavLink to="/Profile"><img src={arrow} alt="Назад" style={{width: '2.5rem', height: '2.5rem', paddingTop: '2rem', paddingLeft: '2rem'}}/></NavLink>
            <div className={s.item}>
            <div className={s.wrapper}>
                <div className={s.pos}>
                    <Person profile_info={resList}/>
                </div>
                <div className={s.pos}>
                    <Edit_form profile_info={resList}/>
                </div>
            </div>
            </div>
        </main>
        </div>
    )
}

export default Edit_profile