import s from "./order.module.css"
import React from 'react';
import Items from "./items"
import DeleteModal from "./delete_module";
import { useState } from "react";

const Orders = (props) => {
    const order_id = props.order_id
    const address = props.address
    const date_order = props.date_order
    const date_deliver = props.date_deliver
    const time_deliver = props.time_deliver
    const comment = props.comment
    const status = props.status
    const bunches = props.bunches
    const cost = props.cost

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(status);

    const handleChange = async (event) => {
        setSelectedOption(event.target.value);
        const id = order_id;
        const status = event.target.value
        const res = await fetch('http://localhost:1337/api/order', {
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type":
            "application/json" },
            body: JSON.stringify({
                id,
                status
            })
        });
    };

    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div id = {order_id} className={s.order_body}>
            <div className={s.head}>
                <div>Стоимость заказа: {cost} ₽</div>
                <div><select value={selectedOption} onChange={handleChange} className={s.input}>
                <option value="Ожидает рассмотрения">Ожидает рассмотрения</option>
                <option value="Заказ принят">Заказ принят</option>
                <option value="Заказ собран">Заказ собран</option>
                <option value="Заказ отправлен">Заказ отправлен</option>
                <option value="Заказ получен">Заказ получен</option>
                <option value="Заказ отменен">Заказ отменен</option>
            </select></div>
            </div>
            <div style={{display: 'inline-block'}}>
                {JSON.parse(bunches).map(element => {
                    return(
                    <Items bunches={bunches} id={element.id} name={element.name} count={element.count} image={element.image} cost={element.cost}/>
                )})}
            </div>
            <div className={s.info} onClick={handleClick}>Узнать детали заказа</div>
            <DeleteModal isOpen={isModalOpen} onCancel={handleCancel} address={address} date_order={date_order} date_deliver={date_deliver}
            time_deliver={time_deliver} comment={comment} order_id={order_id}/>
        </div>
    )
}

export default Orders