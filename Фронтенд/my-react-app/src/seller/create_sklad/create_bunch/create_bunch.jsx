import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './create_b.module.css'
import Header from '../../sklad/header/header';
import ProductSelector from './components/select_flower';
import arrow from './components/image/left-arrow.png'
import Delete_flower from './components/image/recycle-bin.png'
import { Navigate } from 'react-router-dom';

const Create_bunch = () => {

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const id_bunch = urlParams.get('id');
    const name_bunch = urlParams.get('name');
    const flowers_bunch = urlParams.get('flowers');
    console.log(flowers_bunch)
    const description_bunch = urlParams.get('description');

    const navigate = useNavigate();
    /*
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false));
    */
    function coalesce(value, defaultValue) {
        return value !== undefined && value !== null ? value : defaultValue;
    }
    
    let [user, setuser] = useState({
        name: coalesce(name_bunch, ''),
        description: coalesce(description_bunch, ''),
        flowers: ''
    })

    console.log(user.description)

    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    let name, value;

    const handlerChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setuser({ ...user, [name]: value })
    }

    const handlerChangeFlowers = (selectedFlowers) => {
        setuser({ ...user, "flowers": selectedFlowers})
    }


    const handlerSubmit = async (event) => {
        event.preventDefault();
        if (!localStorage.getItem('selected_flowers_in_bunch'))
        {
            localStorage.setItem('selected_flowers_in_bunch', flowers_bunch)
        }
        const formData = new FormData();
        formData.append('flowers', localStorage.getItem('selected_flowers_in_bunch'))
        console.log(localStorage.getItem('selected_flowers_in_bunch'))
        localStorage.setItem('selected_flowers_in_bunch', null)
        formData.append('name', user.name);
        formData.append('image', image);
        formData.append('description', user.description)
        formData.append('user_id', localStorage.getItem('userId'))
        console.log(localStorage.getItem('userId'))

        if (!id_bunch){
            const res = await fetch('http://localhost:1337/api/bunch', {
                method: "POST",
                body: formData});
            if (res.ok) navigate('/Bunch_sklad')
        } else {
            formData.append('id', id_bunch);
            const res = await fetch("http://localhost:1337/api/bunch", {
                method: "PUT",
                body: formData
            })
        if (res.ok) navigate('/Bunch_sklad')
        }
        
    }


    const handlerDelete = async (event) => {
        event.preventDefault();
        const res = await fetch('http://localhost:1337/api/bunch?id=' + id_bunch, {
            method: "DELETE"});
        if (res.ok) navigate('/Bunch_sklad')
        
    }
    if (localStorage.getItem('user_role') !== '2'){
        return <Navigate to="/Login" />
    }
    return(
        <div className={s.app_wrapper}>
            <Header/>
      <main className={s.main}>
      <NavLink to="/Bunch_sklad"><img src={arrow} alt="Назад" style={{width: '2.5rem', height: '2.5rem', paddingTop: '2rem', paddingLeft: '2rem'}}/></NavLink>
      <div className={s.title}>Создать букет</div>
        <div className={s.item}>
            <div>
            <form onSubmit={handlerSubmit}>
                <div>
                    <div className={s.form}><input className={s.input} name="name" type="text" placeholder='Название букета' value={user.name} onChange={handlerChange} maxLength={35} required /></div>
                    <div className={s.form}><input className={s.input} name="description" type="text" placeholder='Описание' value={user.description} onChange={handlerChange} /></div>
                    <div className={s.form}><input type="file" onChange={handleImageUpload} className={s.input}/></div>
                    <div className={s.form}><ProductSelector flowers = {flowers_bunch} onSelect={handlerChangeFlowers}/></div>
                    <div className={s.form}>
                        <input className={s.button} type="submit" value="Сохранить" />
                    </div>
                </div>
                
            </form>
        </div>
        </div>
        <div className={s.delete_text} onClick={handlerDelete}>Удалить информацию о букете <img src={Delete_flower} alt="" className={s.delete_img}/></div>
      </main>
    </div>
    )
}

export default Create_bunch