
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../../redux/actions";
import styles from './Detail.module.css'
export default function Detail(props) {
  const {id} = useParams();
  const dispatch = useDispatch(); //para actualizar el estado global
  const dog = useSelector((state) => state.detail)
  console.log(dog)
  useEffect(() => {
    dispatch(getDetail(id))//para obtener el detalle de un dog 
  }, [id,dispatch])
  

 
  return (
    // <div classNameN{styles.me={styles.container}>
    //   <NavLink to='/home'>
    //     <button classNameN{styles.me='back'>back</button>
    //   </NavLink>
      
    //     <div classNameN{styles.me={styles.contDog}>
    //       <h1>{dog.name}</h1>
    //       <img src={dog.image} alt={dog.image} />
    //       <h4 classNameN{styles.me='hs'>Height: {dog.height}</h4>
    //       <h4 classNameN{styles.me='hs'>Height: {dog.height}</h4>
    //       <h4 classNameN{styles.me='hs'>Life Span: {dog.years}</h4>
    //       <h4 classNameN{styles.me=''>Temperaments: {dog.temperaments}</h4>
    //     </div>
    // </div>
<div>

    <div className={styles.container}>
    <NavLink to='/home'>
         <button className={styles.back}>⇦back</button>
       </NavLink>
  <div className={styles.images}>
  <img className={styles.imgDetail} src={dog.image} alt={dog.image} width={300} height={300}  />
  </div>
  
  <p className={styles.temperamentText}>Temperaments</p>
  <div className={styles.sizes}>
  <h4 className={styles.temp}> {dog.temperaments}</h4>
  </div>
  <div className={styles.product}>
    <div  className={styles.text}>
    <h1 className={styles.name}>{dog.name}</h1>
    <h2 className={styles.textDog}>Height: {dog.height}</h2>
   <h2 className={styles.textDog}>Height: {dog.height}</h2>
   <h2 className={styles.textDog}>Life Span: {dog.years}</h2>
   </div>
    
  </div>
</div>
</div>


  );
}


