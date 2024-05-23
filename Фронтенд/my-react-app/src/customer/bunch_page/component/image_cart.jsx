import React from 'react';
import s from './image_cart.module.css'
import { useState } from 'react';

const ImageShCart = (props) => {

    const [showElement, setShowElement] = useState(false);
    const [textMessege, setTextMessege] = useState("");

    const HandlerClick = async () => {
        const user = localStorage.getItem('userId')
        const bunch = props.id
        const res = await fetch('http://localhost:1337/api/shopping-cart', {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type":
                "application/json" },
                body: JSON.stringify({
                    user,
                    bunch
                })
            });
            let timer;
            if (res.status === 201) {
                setTextMessege('Букет добавлен в корзину')
                setShowElement(true);
                timer = setTimeout(() => {
                    setShowElement(false);
                  }, 3000);
            } else if (res.status === 400)
            {
                setTextMessege('Букет уже в корзине')
                setShowElement(true);
                timer = setTimeout(() => {
                    setShowElement(false);
                }, 3000);
            }
    }

    return (
        <div className={s.input}>
            {showElement && (
                <div className={s.windon_mes}>
                    {textMessege}
                </div>
            )}
            <img src={props.image} alt="Фото букета" className={s.image}/>
            <input type='submit' className={s.button} value={"Добавить в корзину"} onClick={HandlerClick}></input>
        </div>


    )
}

export default ImageShCart