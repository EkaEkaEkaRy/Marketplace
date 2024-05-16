//import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './catalog/main_page'
import Login from './login/login_page'
import Bunch_page from './bunch_page/bunch_page';
import Bunch_sklad from './sklad/bunch/bunch_page';
import Flower_sklad from './sklad/flower/flower_page';
import Orders from './sklad/orders/orders'
import React from 'react';

function App() {
  return (
    <div className="App">
      <form>
      <BrowserRouter>
      <Routes>
        <Route path="*" Component={Main} />
        <Route path="/Login" Component={Login} />
        <Route path="/Bunch" Component={Bunch_page}/>
        <Route path="/Bunch_sklad" Component={Bunch_sklad}/>
        <Route path="/Flower_sklad" Component={Flower_sklad}/>
        <Route path="/Orders" Component={Orders}/>
      </Routes>
    </BrowserRouter>
      </form>
    </div>
  );
}

export default App;
