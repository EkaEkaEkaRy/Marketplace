import Header from "../catalog/components/header"
import s from "./bunch.module.css"
import React from 'react';
import { useNavigate } from "react-router-dom"

const Bunch_page = () => {
  const navigate = useNavigate()

  if (localStorage.getItem('user_role') !== '2')
    return (
      <div className={s.back}>
        <div>
            <Header/>
        </div>
        <div>
            <div className={s.body_blok}>
                <h1>Название цветка</h1>
                <div></div>
            </div>
            
        </div>
    </div>
    )
    else {navigate("/Login")}
  }
export default Bunch_page