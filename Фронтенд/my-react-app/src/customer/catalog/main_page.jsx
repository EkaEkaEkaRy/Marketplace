//import Nav from "./main_comp/nav"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import React from 'react';

import filter from './components/images/filter.png'
import sort from './components/images/sort.png'

import FunctionList from "./components/functionlist"
import Header from "./components/header"
import Filter from "./components/filter"
import Ad from "./components/ad"
import s from "./main.module.css"

const Main = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("")
    const handleFilter = () => {
      if (activeTab === "filter") setActiveTab("");
      else setActiveTab("filter");
    };
    const handleOrder = () => {
      if (activeTab === "orderby") setActiveTab("");
      else setActiveTab("orderby");
    };

    const functions = ['По возрастанию цены', 'По убыванию цены'];
    if (localStorage.getItem('user_role') !== '2')
    return (
      <div className={s.back}> 
      <div>
        <Header/> 
      </div>
      <div className={s.filter}>
            <ul>
              <div className={s.options_inline}>
              <li className={activeTab === "orderby" ? "active" : ""}
                      onClick={handleOrder}
                      style={{listStyle: "none", cursor: 'pointer'}}><div className={s.order_text}><img src={sort} className={s.order_image} alt=""/>Сортировка</div></li>
              </div>
              <div className={s.options_inline}>
              <li className={activeTab === "filter" ? "active" : ""}
                    onClick={handleFilter}
                    style={{listStyle: "none", cursor: 'pointer'}}><div className={s.filter_text}><img src={filter} className={s.filter_image} alt=""/>Фильтр</div></li>
              </div>
            </ul>
            <div>
                {activeTab === "filter" ? <Filter/> : activeTab === "orderby" ? 
                <FunctionList functions={functions}/>
                 : <div></div>}

            </div>
        </div>

        <main className={s.items}>
          
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
          <Ad image="image.png" name="Букет цветочный" price="2000"/>
        </main>

      </div>
    )
    else {navigate("/Login")}
  }
export default Main