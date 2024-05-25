import React, { useState, useRef, useEffect } from 'react';
import s from './functionlist.module.css'
import { useNavigate } from 'react-router-dom';

const FunctionList = ({onChoose}) => {
  const navigate = useNavigate();



  const buttonRef = useRef(null);
  const [buttonRect, setButtonRect] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updateButtonRect = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonRect({ top: rect.top, left: rect.left });
      }
    };

    window.addEventListener('resize', updateButtonRect);
    updateButtonRect();

    return () => {
      window.removeEventListener('resize', updateButtonRect);
    };
  }, []);

  const onclick_func = (event) => {
    onChoose();
    let url;
    if (event.target.value === 'Все') url = `/Orders`
    else url = `/Orders?status=${event.target.value}`
    navigate(url)
  }

  return (
    <div className={s.function_list_container}>
        <div
          className={s.function_list}
          style={{
            position: 'absolute',
            top: buttonRect.top, // Расстояние от кнопки
            left: buttonRect.left,
          }}
        >
          <div>
              <input className={s.button} type="button" onClick={onclick_func} value={'Все'}></input>
              <input className={s.button} type="button" onClick={onclick_func} value={'Ожидает рассмотрения'}></input>
              <input className={s.button} type="button" onClick={onclick_func} value={'Заказ принят'}></input>
              <input className={s.button} type="button" onClick={onclick_func} value={'Заказ собран'}></input>
              <input className={s.button} type="button" onClick={onclick_func} value={'Заказ отправлен'}></input>
              <input className={s.button} type="button" onClick={onclick_func} value={'Заказ получен'}></input>
              <input className={s.button} type="button" onClick={onclick_func} value={'Заказ отменен'}></input>

          </div>
        </div>
    </div>
  );
};

export default FunctionList;