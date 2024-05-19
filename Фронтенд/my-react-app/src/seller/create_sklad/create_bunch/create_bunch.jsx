import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import s from './create_b.module.css'
import Header from '../../sklad/header/header';
import ImageUploader from '../image_add/image_add';
import ProductSelector from './components/select_flower';

const Create_bunch = () => {

    const navigate = useNavigate();
    /*
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false));
    */
    
    let [user, setuser] = useState({
        name: ""
    })

    let name, value;

    const handlerChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setuser({ ...user, [name]: value })
    }


    const handlerSubmit = async (event) => {
        event.preventDefault();
        const {login, password} = user;
        const res = await fetch('http://localhost:1337/api/find-user?mail=' + login + '&password=' + password, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type":
            "application/json" }
        });
        const data = await res.json();
    }

    if (localStorage.getItem('user_role') === '2')
    return(
        <div className={s.app_wrapper}>
            <Header/>
      <main className={s.main}>
      <div className={s.title}>Создать букет</div>
        <div className={s.item}>
            <div>
            <form onSubmit={handlerSubmit}>
                <div>
                    <div className={s.form}><input className={s.input} name="name" type="text" placeholder='Название букета' value={user.name} onChange={handlerChange} required /></div>
                    <div className={s.form}><ImageUploader/></div>
                    <div className={s.form}><ProductSelector/></div>
                    <div className={s.form}>
                        <input className={s.button} type="submit" value="Войти" />
                    </div>
                </div>
                
            </form>
        </div>
        </div>
      </main>
    </div>
    )
    else navigate("/Login")
}

export default Create_bunch