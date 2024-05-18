import React, { useState, useRef, useEffect } from 'react';
import s from './functionlist.module.css'

const FunctionList = ({ functions }, onclick_func) => {
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
          <ul>
            {functions.map((func, index) => (
              <li key={index} onClick={onclick_func}>{func}</li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default FunctionList;