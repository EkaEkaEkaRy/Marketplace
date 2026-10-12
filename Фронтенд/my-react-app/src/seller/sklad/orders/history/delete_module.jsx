import s from './delete.module.css'

const DeleteModal = ({ isOpen, onCancel, address, date_order, date_deliver, time_deliver, comment, order_id }) => {
    if (!isOpen) return null;
  
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }

    const date_order_format = formatDate(date_order);
    const date_deliver_format = formatDate(date_deliver)
    return (
      <div className={s.window}>
        <div className={s.box}
          style={{
            padding: '20px',
            borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div><b>Номер заказа:</b> {order_id}</div>
          <div><b>Дата заказа:</b> {date_order_format}</div>
          <div><b>Адрес доставки:</b> {address}</div>
          <div><b>Дата доставки:</b> {date_deliver_format}</div>
          <div><b>Время доставки:</b> {time_deliver}</div>
          <div><b>Комментарий к заказу:</b> {comment}</div>
          <div className={s.buttons}>
            <button className={s.button} onClick={onCancel}>Ок</button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteModal