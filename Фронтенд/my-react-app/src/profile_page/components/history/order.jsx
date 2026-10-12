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
                <div>{status}</div>
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