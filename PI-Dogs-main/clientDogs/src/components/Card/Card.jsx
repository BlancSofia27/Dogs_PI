import React from 'react';
import styles from './Card.module.css'

import { Link } from 'react-router-dom';


export default function Card(props) {
    const {id, name, image, weight, temperaments} = props
    
    console.log(props)

     
   
    

    return (
        <div key={id} className={styles.card} >
            <div className={styles.frontFace}>
            <img src={image} alt={name} className={styles.img} />
            </div>
            
            <div className={styles.backFace}>
            <h3 className={styles.name}>{name}</h3>
         <h3 className={styles.weight}>Weight: {weight}</h3>
            <div className={styles.temperaments}>
                Temperaments:{temperaments}
            </div>
            <div className={styles.divMoreInfo}>
                <Link to={`/detail/${id}`} className={styles.moreInfo}>More info </Link>
            </div>
            </div>
        </div>
    )
}

