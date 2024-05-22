import React from 'react';
import s from './image_cart.module.css'

const ImageShCart = (props) => {

    return (
        <div className={s.input}>
            <img src={props.image} alt="Фото букета" className={s.image}/>
            <input type='submit' className={s.button} value={"Добавить в корзину"}></input>
        </div>


    )
}

export default ImageShCart