import s from "./filter.module.css"
//import React, { useState } from "react";
//import { MultiSelect } from "react-multi-select-component";
import MultiSelect from "./MultiSelectMain";

const Filter = () => {    

    return (
        <div className={s.back}>
            <div>
                <form action="#" method="POST" className={s.form}>
                    <div>
                        
                        <MultiSelect/>
                        <div className={s.lines}>
                        <label className={s.input_place}>Количество цветов в букете <input className={s.input2} type="number"></input></label>
                        </div>
                        <div className={s.lines}>
                            <label>Стоимость от <input className={s.input2} type="number"></input> до <input className={s.input2} type="number"></input></label>
                        </div>
                        <div className={s.lines}>
                            <label><input className={s.input_name} type="text" placeholder="Название букета"></input></label>
                        </div>
                    </div>
                    <input type="submit" className={s.button} value={"Найти"}></input>
                </form>

            </div>
        </div>
    )
}

export default Filter


/*<MultiSelect options={flowers} value={selectedFlowers} onChange={setSelectedFlowers} hasSelectAll={false} ClearSelectedIcon={null} className={s.input1}/> */