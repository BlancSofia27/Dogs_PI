import React from 'react'
import Card from '../Card/Card'
import styles from "./cards.module.css"

const Cards = ({info}) => {
    
  return (
    <div className={styles.Cont}>
        {
            info?.map((dog)=> <Card name={dog.name} image={dog.image} weight={dog.weight} temperament={dog.temperament}/>)
        }
    </div>
  )
}

export default Cards