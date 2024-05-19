import React, { useState, useRef, useEffect } from 'react';
import s from './select_flower.module.css'

const ProductSelector = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const products = [
    'Product A',
    'Product B',
    'Product C',
    'Product D',
    'Product E',
    'Product F',
    'Product G',
    'Product H',
    'Product I',
    'Product J',
  ];

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const getMatchingProducts = () => {
    const regex = new RegExp(inputValue, 'i');
    const matchingProducts = products.filter((product) => regex.test(product) && !selectedProducts.includes(product)).slice(0, 3);
    return matchingProducts.length > 0 ? matchingProducts : ['Цветок не найден'];
  };


  const handleProductSelect = (product) => {
    let count = 0;
    selectedProducts.map((pr) => {if (pr.name == product) count += 1;})
    if (count == 0) {
      setSelectedProducts([
        ...selectedProducts,
        { name: product, quantity: 1 },
      ]);
      setInputValue('');
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = quantity;
    setSelectedProducts(updatedProducts);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
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
      <input className={s.input} type="text" value={inputValue}
        onChange={handleInputChange} placeholder="Выберите цветок"
      />
      {inputValue && (
        <div className={s.function_list_container}><div className={s.function_list}
        style={{position: 'absolute', top: buttonRect.top, left: buttonRect.left}}>
          {getMatchingProducts().map((product) => (
            <div key={product} onClick={() => handleProductSelect(product)}>
              {product}
            </div>
          ))}
        </div></div>
      )}
      {selectedProducts.map((product, index) => (
        <div key={index}>
          {product.name}
          <input
            type="number"
            value={product.quantity}
            onChange={(event) =>
              handleQuantityChange(index, event.target.value)
            }
            min="1"
          />
          <button onClick={() => handleRemoveProduct(index)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default ProductSelector;