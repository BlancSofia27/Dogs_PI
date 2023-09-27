import styles from './NavBar.module.css'
import { NavLink } from "react-router-dom"
import logo from '../../images/bulldog.png'
import SearchBar from "../SearchBar/SearchBar";
import instagram from '../../images/instagramLog.png'
import whatsapp from '../../images/whatsappLog.png'
import youtube from '../../images/youtubeLog.png'
import logox from '../../images/logox.png'
export default function NavBar(props) {
    

    return(
        <header>
            <div className={styles.logoCont}>
            <img src={logo} alt='toHome' className={styles.logoDog} />
            <h2 className={styles.textDog}>Dogs Company</h2>
            <NavLink to='/Landing'>
         <button className={styles.back}>⇦Landing</button>
       </NavLink>
            </div>
            <nav>
            <div className={styles.newDogDiv}>
            <NavLink to='/create'>
                {location.pathname === '/create' || <button className={styles.newDog} >New Dog</button>}
            </NavLink>
             </div>
            <div className={styles.searchBarCont}>
                 {location.pathname !== '/create'  ? <SearchBar /> : null}
             </div>
            <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Faccountscenter.instagram.com%2F%3F__coig_login%3D1">
                <img src={instagram} alt="Instagram" className={styles.instagramLogo}/>
            </a>
            <a href="URL_de_tu_numero_de_whatsapp">
                <img src={whatsapp} alt="WhatsApp" className={styles.whatsappLogo}/>
            </a>
            <a href="https://www.youtube.com/">
                <img src={youtube} alt="YouTube" className={styles.youtubeLogo}/>
            </a>
            <a href="https://r.search.yahoo.com/_ylt=AwrNYRVarBBlq9Q3AU6r9Qt.;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1695620314/RO=10/RU=https%3a%2f%2fm.twitter.com%2flogin/RK=2/RS=gFDb4rWx3KVYV6tE5O8ZmlWC_Nc-">
                <img src={logox} alt="x" className={styles.xLogo} />
            </a> 
            </nav>
        </header>
    )

    }