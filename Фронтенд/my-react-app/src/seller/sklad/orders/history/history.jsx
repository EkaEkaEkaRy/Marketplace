import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Orders from "./order";
import s from "./history.module.css"
import filter from "./filter.png"
import FunctionList from "./functionlist";

const History = () => {

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get('status');

    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("")
    const handleFilter = () => {
      if (activeTab === "filter") setActiveTab("");
      else setActiveTab("filter");
    };

    const handleOrderButton = () => {
        setActiveTab("");
      };

    useEffect(() => {
      const getBunchs = async () => {
        const res = await fetch('http://localhost:1337/api/order?user=' + localStorage.getItem('userId') + '&status=' + status, {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            SetResList(data);
            setIsLoading(false)
      }}
    
      getBunchs();

    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <div className={activeTab === "filter" ? "active" : ""} onClick={handleFilter} style={{listStyle: "none", cursor: 'pointer'}}>
                    <div className={s.filter} style={{display: 'flex', alignItems: 'center'}}><img src={filter} style={{width:'1.5rem', height: '1.5rem'}} alt=""/>Фильтр</div>
              </div>
              <div>
                {activeTab === "filter" ? 
                <FunctionList onChoose={handleOrderButton}/>
                 : <div></div>}

            </div>
            </div>
            
            {resList && resList.map(element => {
              let cost = 0;
              for (const el of JSON.parse(element.bunches)) {
                    cost += Number(el.count) * Number(el.cost)
              } 
              return (
                <div className={s.order_body}>
                <Orders order_id={element["order_id"]} address={element["address"]} date_deliver={element["date_deliver"]} 
                time_deliver={element["time_deliver"]} status={element["status"]} bunches={element["bunches"]} cost = {cost}
                date_order={element["date_order"]} comment={element["comment"]}/>
                </div>
            )})}
        </div>
    )
}

export default History