import { NavLink, Navigate } from "react-router-dom"
import { useEffect } from "react";
import s from "./item.module.css"
import React, { useState } from 'react';
import DeleteModal from "./delete_module";


const Item = (props) => {
    const name = props.name
    const image = props.image
    const price = props.price
    const id = props.id
    

    const [countOfBunchs, setCountOfBunchs] = useState(props.count)
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    const res = await fetch('http://localhost:1337/api/shopping-cart?id=' + id, {
            method: "DELETE"});
        if (res.ok) console.log('Элемент удален');
        setIsModalOpen(false);
        window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCountOfBunchs(1);
  };
  /*
  useEffect(() => {
    if(countOfBunchs != "")
        window.location.reload();
  }, countOfBunchs)
  */

  async function HandlerChange(event) {
        setCountOfBunchs(event.target.value);
        if (event.target.value != '') {
        if (event.target.value == 0)
            setIsModalOpen(true);
        else {
            const count = event.target.value
            const res = await fetch('http://localhost:1337/api/shopping-cart', {
                method: "PUT",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    count
                })
            });
            if (res.ok) console.log('Элемент изменен');
        }
        //window.location.reload();
        //return <Navigate to="/Shopping_cart"/>
        }
    }

    return (
        <div className={s.item}>
        <div className={s.back} >
            <NavLink to = "/Bunch" style={{textDecoration: "none"}}>
            <div className={s.image_position}><img src={image} alt="Фото букета" className={s.flower_image}/></div>
            </NavLink>
            <div className={s.text_position}>
            <NavLink to = "/Bunch" style={{textDecoration: "none"}}>
                <div className={s.text_name}>{name}</div>
            </NavLink>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{fontSize: '15px'}}>Цена: {price} ₽</div>
                    <div><input type="number" className={s.input} value={countOfBunchs} onChange={HandlerChange} min={0}/></div>
                </div>
            </div>
            <DeleteModal isOpen={isModalOpen} onDelete={handleDelete} onCancel={handleCancel} />
        </div>
        
        </div>
    )
}

export default Item