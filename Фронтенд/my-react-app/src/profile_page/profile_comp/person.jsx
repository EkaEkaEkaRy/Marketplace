import p from './person.module.css'
import profile from '../profile.svg'

const Person = () => {

    return (
        <div className={p.person}>
            <img className={p.ava} src={profile} alt="Назад" />
            <div>{localStorage.getItem('userNameId')}</div>
        </div>
    )
}

export default Person