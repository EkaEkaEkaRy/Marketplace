import React, { useState, useRef, useEffect } from 'react';
import s from './select_flower.module.css'

const ProductSelector = ({flowers, onSelect}) => {

  function coalesce(value, defaultValue) {
    return value !== undefined && value !== null ? value : defaultValue;
  }

  const [inputValue, setInputValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(coalesce(JSON.parse(flowers), []));
  
  async function  getListOfFlowers(){
    let flowers = [];
    const res = await fetch('http://localhost:1337/api/flower?id=' + localStorage.getItem('userId'), {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type":
        "application/json" }
    });
    if (res.status === 404) console.log('Цветы не найдены');
    else if (res.ok) {
          const data = await res.json();
          data.forEach((i) => {
            flowers.push(i['name'])
          })
          localStorage.setItem('ListOfSkladFlowers', flowers)
    }
  }

getListOfFlowers();

const products = localStorage.getItem('ListOfSkladFlowers').split(",");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const getMatchingProducts = () => {
    const regex = new RegExp(inputValue, 'i');
    const matchingProducts = products.filter((product) => regex.test(product) && !selectedProducts.includes(product)).slice(0, 3);
    return matchingProducts.length > 0 ? matchingProducts : ['Цветок не найден'];
  };

  useEffect(() => {
    console.log(selectedProducts);
    localStorage.setItem('selected_flowers_in_bunch', JSON.stringify(selectedProducts))
    onSelect(JSON.stringify(selectedProducts))
  }, [selectedProducts]);


  const handleProductSelect = (product) => {
    let count = 0;
    selectedProducts.map((pr) => {
      if (pr.name === product) count += 1;
    });
    if (count === 0) {
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
      <input className={s.input} type="text" value={inputValue} autoComplete="off"
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
        <div key={index} style={{marginLeft: '2rem', marginTop: '0.5rem'}}>
          <div style={{display: 'inline-block', width: '20rem'}}>{product.name}</div>
          <input
            type="number"
            value={product.quantity} className={s.input_count}
            onChange={(event) => handleQuantityChange(index, event.target.value)} min="1"
          />
          <button onClick={() => handleRemoveProduct(index)} className={s.input_del}>X</button>
        </div>
      ))}
    </div>
  );
};

export default ProductSelector;