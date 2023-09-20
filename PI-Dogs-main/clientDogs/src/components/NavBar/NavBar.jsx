import styles from './NavBar.module.css'
import { NavLink, useLocation } from "react-router-dom"
import image from '../../images/logoDog.png'
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar(props) {
    const location = useLocation();
    return (
        <div className={styles.nav}>
            <NavLink to='/landing'>
                <img src={image} alt='toHome' />
            </NavLink>
            <br />
            <div className={styles.botones}>
                <NavLink to='/create'>
                    {location.pathname === '/create' || <button>New Dog</button>}
                </NavLink>
            </div>
            <div className={styles.searchbar}>
                {location.pathname !== '/create'  ? <SearchBar setPage={props.setPage} /> : null}
            </div>
        </div>
    )
}