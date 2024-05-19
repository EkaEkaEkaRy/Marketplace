import s from './person.module.css'
import profile from './image/user-profile.png'
import edit from './image/edit.png'
import { NavLink } from 'react-router-dom'

const Person = () => {

    return (
        <div className={s.person}><div className={s.container}>
            <div className={s.centerElement}>
                <div className={s.image_form}><img className={s.ava} src={profile} alt="Назад" /></div>
                <div style={{display: 'flex', justifyContent: 'center'}}>{localStorage.getItem('userId')}</div>
            </div>
            <NavLink to="/Profile/Edit"><img src={edit} alt="Настройки" className={s.image} /></NavLink>
        </div>
            
        </div>
    )
}

export default Person