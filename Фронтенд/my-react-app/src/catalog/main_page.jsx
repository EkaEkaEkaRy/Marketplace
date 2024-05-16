import Header from "./components/header"
import Filter from "./components/filter"
import Ad from "./components/ad"
import s from "./main.module.css"
//import Nav from "./main_comp/nav"
//import { useEffect, useState } from "react"
//import { Navigate } from "react-router-dom"
import React from 'react';

const Main = () => {
    return (
      <div className={s.back}> 
      <div>
        <Header/> 
      </div>
        <div className={s.filter}><Filter/></div>
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
  }
export default Main