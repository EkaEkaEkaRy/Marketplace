import s from "./filter.module.css"
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const Filter = () => {
    const [selectedFlowers, setSelectedFlowers] = useState([]);
    const flowers = [
        { label: 'Роза', value: 'роза' },
        { label: 'Ромашка', value: 'ромашка' },
        { label: 'Тюльпан', value: 'тюльпан' },
        { label: 'Незабудка', value: 'незабудка' },
        { label: 'Фиалка', value: 'фиалка' },
        { label: 'Подсолнух', value: 'подсолнух' }
    ];

    return (
        <div className={s.back}>
            <div>
                <form action="#" method="POST">
                    <div>
                        <div className={s.lines}>
                            <label className={s.input_place}>
                                Тип цветов в букете <MultiSelect options={flowers} value={selectedFlowers} onChange={setSelectedFlowers} hasSelectAll={false} ClearSelectedIcon={null} className={s.input1}/></label>
                        </div>
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