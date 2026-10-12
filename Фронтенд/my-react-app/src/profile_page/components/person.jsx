import s from './person.module.css'
import profile from './image/user-profile.png'
import edit from './image/edit.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const Person = () => {

    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);

    function coalesce(value, defaultValue) {
        return value !== undefined && value !== null && value !== "" ? value : defaultValue;
      }

    useEffect(() => {
        const getShoppingCart = async () => {
            const res = await fetch('http://localhost:1337/api/info-user?user=' + localStorage.getItem('userId'), {
                method: "GET"
            });
            if (res.status === 200) {
                const data = await res.json()
                SetResList(data[0]);
                setIsLoading(false)
          }}
        
          getShoppingCart();
    }, [])

      if (isLoading) {
        return <div>Loading...</div>;
      }

    return (
        <div className={s.person}><div className={s.container}>
            <div className={s.centerElement}>
                <div className={s.image_form}><img className={s.ava} src={coalesce(resList["image"], profile)} alt="Назад" /></div>
                <div className={s.text_name}>{resList["name"]}</div>
            </div>
            <NavLink to="/Profile/Edit"><img src={edit} alt="Настройки" className={s.image} /></NavLink>
        </div>
            
        </div>
    )
}

export default Person