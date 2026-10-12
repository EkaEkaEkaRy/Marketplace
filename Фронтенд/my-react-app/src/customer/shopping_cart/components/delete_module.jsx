import s from './delete.module.css'

const DeleteModal = ({ isOpen, onDelete, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className={s.window}>
        <div className={s.box}
          style={{
            padding: '20px',
            borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div>Вы хотите убрать этот букет из корзины?</div>
          <div className={s.buttons}>
            <button className={s.button} onClick={onDelete}>Удалить</button>
            <button className={s.button} onClick={onCancel}>Отмена</button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteModal