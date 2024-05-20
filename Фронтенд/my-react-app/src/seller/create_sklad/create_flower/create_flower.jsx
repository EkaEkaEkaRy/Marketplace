import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import s from './create_f.module.css'
import Header from '../../sklad/header/header';
import ProductSelector from './components/select_flower';
import Delete_flower from './components/image/recycle-bin.png'

const Create_bunch = () => {

    const navigate = useNavigate();

    
    let [user, setuser] = useState({
        seller: localStorage.getItem('userId'),
        count: "",
        cost: ""
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


    const handlerSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('flower', localStorage.getItem('flower_type_for_create_flower_form'))
        formData.append('seller', user.seller);
        formData.append('count', user.count);
        formData.append('cost', user.cost);
        formData.append('image', image);

        const res = await fetch('http://localhost:1337/api/flower', {
            method: "POST",
            body: formData,
        });
        if (res.ok) navigate('/Flower_sklad')
    }

    if (localStorage.getItem('user_role') === '2')
    return(
        <div className={s.app_wrapper}>
            <Header/>
      <main className={s.main}>
      <div className={s.title}>Создать цветок</div>
        <div className={s.item}>
            <div>
            <form onSubmit={handlerSubmit}>
                <div>
                    <div className={s.form}>
                        <div> 
                            <input type="file" onChange={handleImageUpload} className={s.input}
                            />
                            {user.image && (
                                <div>
                                <img
                                    src={URL.createObjectURL(user.image)}
                                    alt="Uploaded"
                                    style={{ width: '15rem', height: '15rem', marginTop: '1rem' }}
                                />
                                </div>
                            )}
                        </div>
                    </div>
                    
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
        <div className={s.delete_text}>Удалить информацию о цветке <img src={Delete_flower} alt="" className={s.delete_img}/></div>
      </main>
    </div>
    )
    else navigate("/Login")
}

export default Create_bunch