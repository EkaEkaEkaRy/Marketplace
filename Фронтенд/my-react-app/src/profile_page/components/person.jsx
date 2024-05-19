import s from './person.module.css'
import profile from './image/user-profile.png'
import Im from './image/1.jpg'

const Person = () => {

    return (
        <div className={s.person}>
            <div className={s.image_form}><img className={s.ava} src={Im} alt="Назад" /></div>
            <div>{localStorage.getItem('userNameId')}</div>
        </div>
    )
}

export default Person