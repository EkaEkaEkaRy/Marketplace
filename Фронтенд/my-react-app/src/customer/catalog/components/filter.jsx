import { useNavigate } from "react-router-dom";
import s from "./filter.module.css"
//import React, { useState } from "react";
//import { MultiSelect } from "react-multi-select-component";
import MultiSelect from "./MultiSelectMain";
import { useState } from "react";

const Filter = () => {   
    
    const navigate = useNavigate()
    const [filter, setFilter] = useState({
        type: "",
        count: "",
        min_cost: "",
        max_cost: "",
        name: ""
    })

    const HandlerChangeType = (selectedList) => {
        setFilter({ ...filter, 'type': selectedList })
        console.log(selectedList)
    }

    const HandlerSubmit = () => {
        const type = localStorage.getItem('filter_types_flower')
        const url = `?type=${type}&count=${filter.count}&min_cost=${filter.min_cost}&max_cost=${filter.max_cost}&name=${filter.name}`
        console.log(url)
        //return <Navigate to={`/*?type=${filter.type}&count=${filter.count}&min_cost=${filter.min_cost}&max_cost=${filter.max_cost}&name=${filter.name}`}/>
        navigate(url)
    }

    let name, value
    const HandlerChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setFilter({ ...filter, [name]: value })
    }

    return (
        <div className={s.back}>
            <div>
                <form className={s.form} onSubmit={HandlerSubmit}>
                    <div>
                        <input name="type" value={filter.type} type='hidden'></input>
                        <MultiSelect onSelect={HandlerChangeType}/>
                        <div className={s.lines}>
                        <label className={s.input_place}>Количество цветов в букете <input className={s.input2} name="count" type="number" value={filter.count} onChange={HandlerChange}></input></label>
                        </div>
                        <div className={s.lines}>
                            <label>Стоимость от <input className={s.input2} name="min_cost" type="number" value={filter.min_cost} onChange={HandlerChange}></input> до <input className={s.input2} name="max_cost" type="number" value={filter.max_cost} onChange={HandlerChange}></input></label>
                        </div>
                        <div className={s.lines}>
                            <label><input className={s.input_name} name="name" type="text" placeholder="Название букета" value={filter.name} onChange={HandlerChange}></input></label>
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