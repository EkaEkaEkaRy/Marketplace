import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from './customer/catalog/main_page'
import Login from './login/login_page'
import Bunch_page from './customer/bunch_page/bunch_page';
import Bunch_sklad from './seller/sklad/bunch/bunch_page';
import Flower_sklad from './seller/sklad/flower/flower_page';
import Orders from './seller/sklad/orders/orders'
import Create_bunch from "./seller/create_sklad/create_bunch/create_bunch";
import Create_flower from "./seller/create_sklad/create_flower/create_flower.jsx"
import Shopping_cart from "./customer/shopping_cart/shopping_cart";
import Profile from "./customer/profile_page/profile.jsx";
import Edit_profile from "./edit_profile/edit_profile.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" Component={Main} />
        <Route path="/Login" Component={Login} />
        <Route path="/Bunch" Component={Bunch_page}/>
        <Route path="/Shopping_cart" Component={Shopping_cart}/>
        <Route path="/Bunch_sklad" Component={Bunch_sklad}/>
        <Route path="/Bunch_sklad/Create" Component={Create_bunch}/>
        <Route path="/Flower_sklad" Component={Flower_sklad}/>
        <Route path="/Flower_sklad/Create" Component={Create_flower}/>
        <Route path="/Orders" Component={Orders}/>
        <Route path="/Profile" Component={Profile}/>
        <Route path="/Profile/Edit" Component={Edit_profile}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
