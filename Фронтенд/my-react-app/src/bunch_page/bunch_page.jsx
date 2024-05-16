import Header from "../catalog/components/header"
import s from "./bunch.module.css"
import React from 'react';

const Bunch_page = () => {
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
  }
export default Bunch_page