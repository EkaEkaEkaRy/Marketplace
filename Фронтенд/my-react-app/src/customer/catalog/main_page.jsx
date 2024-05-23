//import Nav from "./main_comp/nav"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import React from 'react';

import filter from './components/images/filter.png'
import sort from './components/images/sort.png'

import FunctionList from "./components/functionlist"
import Header from "./components/header"
import Filter from "./components/filter"
import Ad from "./components/ad"
import s from "./main.module.css"

const Main = () => {
  
  const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const type_flower_bunch = urlParams.get('type');
    const count_bunch = urlParams.get('count');
    const min_cost_bunch = urlParams.get('min_cost');
    const max_cost_bunch = urlParams.get('max_cost')
    const name_bunch = urlParams.get('name');
    const orderby = urlParams.get('orderby');

    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const getBunchs = async () => {
        const res = await fetch('http://localhost:1337/api/bunch?type=' + type_flower_bunch + "&count=" + count_bunch + "&min_cost=" + min_cost_bunch + "&max_cost=" + max_cost_bunch + "&name=" + name_bunch + "&orderby=" + orderby, {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            SetResList(data);
            setIsLoading(false)
      }}
    
      getBunchs();
    })

  const [activeTab, setActiveTab] = useState("")
    const handleFilter = () => {
      if (activeTab === "filter") setActiveTab("");
      else setActiveTab("filter");
    };
    const handleOrder = () => {
      if (activeTab === "orderby") setActiveTab("");
      else setActiveTab("orderby");
    };
    const handleOrderButton = () => {
      setActiveTab("");
    };

    //const functions = [{value:'По возрастанию цены', index: 0}, {value:'По убыванию цены', index: 1}];
    if (localStorage.getItem('user_role') === '2'){
      return <Navigate to="/Login" />
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

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
                <FunctionList onChoose={handleOrderButton}/>
                 : <div></div>}

            </div>
        </div>

        <main className={s.items}>
          {resList && resList.map(element => {
              return (
                <Ad name = {element['name']} image = {element["image"]} price = {element["cost"]} id = {element["id"]}/>
          )})}
        </main>

      </div>
    )
  }
export default Main