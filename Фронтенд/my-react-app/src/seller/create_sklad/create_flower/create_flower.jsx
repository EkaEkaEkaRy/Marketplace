import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import s from './create_f.module.css'
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
        type: "",
        cost: "",
        count: ""
    })

    const [isCreating, setIsCreating] = useState(true);
    const [newTypeValue, setNewTypeValue] = useState('');

    const handleCreateNewType = () => {
        if(isCreating) setIsCreating(false);
        else setIsCreating(true);
    };

    const handleSubmitNewType = (event) => {
        event.preventDefault();
        // Здесь вы можете добавить логику для отправки нового типа на сервер
        setIsCreating(false);
        setNewTypeValue('');
    };

    const handleInputChange = (event) => {
        setNewTypeValue(event.target.value);
    };

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
                    <div className={s.form}><ImageUploader/></div>
                    <div className={s.form}><ProductSelector/><input onClick={handleCreateNewType} type="button" className={s.create_type_button} value={'Создать новый тип'}/>
                    </div>
                    {!isCreating && (
                        <div className={s.form}>
                        <input className={s.type_form} name="new_type" type="text" value={newTypeValue} onChange={handleInputChange} placeholder="Введите новый тип"/>
                        <input className={s.type_button} onClick={handleSubmitNewType} type="button" value='Создать'/>
                        </div>
                    )}


                    <div className={s.form}><input className={s.input} name="cost" type="number" placeholder='Стоимость цветка' value={user.cost} onChange={handlerChange} required /></div>
                    <div className={s.form}><input className={s.input} name="count" type="number" placeholder='Количество цветов на складе' value={user.count} onChange={handlerChange} required /></div>
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