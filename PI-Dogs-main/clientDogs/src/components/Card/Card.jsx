import React from 'react';
import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'


export default function Card(dog) {
    const {id, name, image, weight, temperament} = dog;
    const navigate = useNavigate();
    

    const toDetail = () => {
        navigate(`/dogs/${id}`)
    }
    

    return (
        <div key={id} className={styles.card} >
            <h6>{weight}</h6>
            <img src={image} alt={name} className={styles.img} onClick={toDetail}/>
            <h3>{name}</h3>
            <div className={styles.diets}>
                {temperament?.map((temperament, i) => ( //para recorrer la lista de dietas
                    //para agrupar varios elementos en 1 solo bloque
                    <React.Fragment key={i}>
                        <span className={styles.diet}>{temperament.charAt(0).toUpperCase() + temperament.slice(1)}</span>
                        {i < temperament.length - 1 && <span className={styles.separator}> - </span>}
                    </React.Fragment>
                ))}
            </div>
            <button onClick={toDetail} className={styles.detail}>visualize</button>
        </div>
    )
}
