import React, { useState, useRef, useEffect } from 'react';
import s from './select_flower.module.css'

const ProductSelector = () => {

  async function  getListOfTypes(){
      let type_flowers = [];
      const res = await fetch('http://localhost:1337/api/flower-type', {
          method: "GET",
          headers: { "Accept": "application/json", "Content-Type":
          "application/json" }
      });
      if (res.status === 404) console.log('Цветы не найдены');
      else if (res.ok) {
            const data = await res.json();
            data.forEach((i) => {
              type_flowers.push(i['name'])
            })
            localStorage.setItem('ListOfTypes', type_flowers)
      }
    }

  getListOfTypes();

  const [inputValue, setInputValue] = useState('');
  const products = localStorage.getItem('ListOfTypes').split(",");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const getMatchingProducts = () => {
    const regex = new RegExp(inputValue, 'i');
    const matchingProducts = products.filter((product) => regex.test(product)).slice(0, 3);
    return matchingProducts[0] === inputValue && matchingProducts.length === 1? null: matchingProducts.length > 0 ? matchingProducts : ['Цветок не найден'];
  };


  const handleProductSelect = (product) => {
    setInputValue(product);
  };

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
    <div>
      <input className={s.input} name="type" value={inputValue}
        onChange={handleInputChange} placeholder="Выберите цветок"
      />
      {inputValue && getMatchingProducts() && (
        <div className={s.function_list_container}><div className={s.function_list}
        style={{position: 'absolute', top: buttonRect.top, left: buttonRect.left}}>
          {getMatchingProducts().map((product) => (
            <div key={product} onClick={() => handleProductSelect(product)}>
              {product}
            </div>
          ))}
        </div></div>
      )}
    </div>
  );
};

export default ProductSelector;