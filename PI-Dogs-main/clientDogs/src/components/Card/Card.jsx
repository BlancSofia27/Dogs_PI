import React from 'react';
import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'


export default function Card(dog) {
    const {id, name, image, weight, temperaments} = dog;
    const navigate = useNavigate();
    

    const toDetail = () => {
        navigate(`/dogs/${dog.id}`)
    }
    

    return (
        <div key={id} className={styles.card} >
            <div className={styles.frontFace}>
            <img src={image} alt={name} className={styles.img} onClick={toDetail}/>
            </div>
            
            <div className={styles.backFace}>
            <h3 className={styles.name}>{name}</h3>
         <h3 className={styles.weight}>Weight: {weight}</h3>
            <div className={styles.temperaments}>
                Temperaments:{temperaments}
            </div>
            <div className={styles.divMoreInfo}>
                <button onClick={toDetail} className={styles.moreInfo}>More info </button>
            </div>
            </div>
        </div>
    )
}

