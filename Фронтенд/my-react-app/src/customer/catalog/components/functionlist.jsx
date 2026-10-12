import React, { useState, useRef, useEffect } from 'react';
import s from './functionlist.module.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FunctionList = ({onChoose}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const type_flower_bunch = urlParams.get('type');
  const count_bunch = urlParams.get('count');
  const min_cost_bunch = urlParams.get('min_cost');
  const max_cost_bunch = urlParams.get('max_cost')
  const name_bunch = urlParams.get('name');


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
    let orderby;
    if (event.target.name == 0) {
      orderby = "ASC"
    } else if (event.target.name == 1) {
      orderby = "DESC"
    }
    onChoose();
    
    const url = `?type=${type_flower_bunch}&count=${count_bunch}&min_cost=${min_cost_bunch}&max_cost=${max_cost_bunch}&name=${name_bunch}&orderby=${orderby}`
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
              <input className={s.button} name={0} type="button" onClick={onclick_func} value={'По возрастанию цены'}></input>
              <input className={s.button} name={1} type="button" onClick={onclick_func} value={'По убыванию цены'}></input>
          </div>
        </div>
    </div>
  );
};

export default FunctionList;