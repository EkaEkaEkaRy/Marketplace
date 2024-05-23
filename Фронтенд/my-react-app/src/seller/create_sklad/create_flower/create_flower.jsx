import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useState } from 'react';
import s from './create_f.module.css'
import Header from '../../sklad/header/header';
import ProductSelector from './components/select_flower';
import Delete_flower from './components/image/recycle-bin.png'
import arrow from './components/image/left-arrow.png'
import { Navigate } from 'react-router-dom';

const Create_bunch = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const id_flower = urlParams.get('id');
    const name_flower = urlParams.get('name');
    const count_flower = urlParams.get('count');
    const cost_flower = urlParams.get('cost');

    const navigate = useNavigate();
    
    function coalesce(value, defaultValue) {
        return value !== undefined && value !== null ? value : defaultValue;
      }

    let [user, setuser] = useState({
        type: coalesce(name_flower, ""),
        seller: localStorage.getItem('userId'),
        count: coalesce(count_flower, ""),
        cost: coalesce(cost_flower, ""),
    })

    

    const [isCreating, setIsCreating] = useState(true);
    const [newTypeValue, setNewTypeValue] = useState('');

    const handleCreateNewType = () => {
        if(isCreating) setIsCreating(false);
        else setIsCreating(true);
    };

    const handleSubmitNewType = async (event) => {
        event.preventDefault();
        const type = newTypeValue
        const res = await fetch('http://localhost:1337/api/flower-type', {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type":
                "application/json" },
                body: JSON.stringify({
                    type
                })
            });
            if (res.status === 400) console.log('Новый тип не был добавлен')
            else console.log('Новый тип создан')
        setIsCreating(true);
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

    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    const handlerSelect = (name) => {
        setuser({ ...user, "type": name })
    }


    const handlerSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('flower', user.type)
        console.log(user.type)
        localStorage.setItem('flower_type_for_create_flower_form', null)
        formData.append('count', user.count);
        formData.append('cost', user.cost);
        formData.append('image', image);

        if (!id_flower){
            formData.append('seller', user.seller);
            const res = await fetch('http://localhost:1337/api/flower', {
                method: "POST",
                body: formData});
            if (res.ok) navigate('/Flower_sklad')
        } else {
            formData.append('id_flower', id_flower);
            const res = await fetch("http://localhost:1337/api/flower", {
                method: "PUT",
                body: formData
            })
            console.log(res.status)
        if (res.status === 200) navigate("/Flower_sklad")
        }
        
    }

    const handlerDelete = async (event) => {
        event.preventDefault();
        const res = await fetch('http://localhost:1337/api/flower?flower=' + id_flower, {
            method: "DELETE"});
        if (res.ok) navigate('/Flower_sklad')
        
    }

    if (localStorage.getItem('user_role') !== '2'){
        return <Navigate to="/Login" />
    }
    return(
        <div className={s.app_wrapper}>
            <Header/>
      <main className={s.main}>
        <NavLink to="/Flower_sklad"><img src={arrow} alt="Назад" style={{width: '2.5rem', height: '2.5rem', paddingTop: '2rem', paddingLeft: '2rem'}}/></NavLink>
      <div className={s.title}>Создать цветок</div>
        <div className={s.item}>
            <div>
            <form onSubmit={handlerSubmit}>
                <div>
                    <div className={s.form}>
                        <div> 
                            <input type="file" onChange={handleImageUpload} className={s.input}/>
                        </div>
                    </div>
                    <input name="type" value={user.type} type="hidden"></input>
                    <div className={s.form}><ProductSelector type_name={user.type} onSelectType={handlerSelect}/><input onClick={handleCreateNewType} type="button" className={s.create_type_button} value={'Создать новый тип'}/>
                    </div>
                    {!isCreating && (
                        <div className={s.form}>
                        <input className={s.type_form} name="new_type" type="text" value={newTypeValue} onChange={handleInputChange} placeholder="Введите новый тип"/>
                        <input className={s.type_button} onClick={handleSubmitNewType} type="button" value='Создать'/>
                        </div>
                    )}


                    <div className={s.form}><input className={s.input} name="cost" type="number" placeholder='Стоимость цветка' value={user.cost} onChange={handlerChange} min={1} required /></div>
                    <div className={s.form}><input className={s.input} name="count" type="number" placeholder='Количество цветов на складе' value={user.count} onChange={handlerChange} min={1} required /></div>
                    <div className={s.form}>
                        <input className={s.button} type="submit" value="Сохранение" />
                    </div>
                </div>
                
            </form>
        </div>
        </div>
        <div className={s.delete_text} onClick={handlerDelete}>Удалить информацию о цветке <img src={Delete_flower} alt="" className={s.delete_img}/></div>
      </main>
    </div>
    )
}

export default Create_bunch