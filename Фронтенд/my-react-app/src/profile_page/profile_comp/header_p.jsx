import h from './header_p.module.css'
import left from './arrow-left.png'
import { Link, NavLink } from "react-router-dom"

const Header = () => {
    return (
        <header className={h.header}>
            <NavLink to="/Main">
                <div className={h.back}>
                    <img className={h.arrow} src={left} alt="Назад" />
                </div>
            </NavLink>
        </header>
    )
}

export default Header