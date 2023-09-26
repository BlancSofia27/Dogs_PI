
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../images/loaderDog.gif";
import { getDetail } from "../../redux/actions";

export default function Detail(props) {
  
  
  const dispatch = useDispatch(); //para actualizar el estado global
  useEffect(() => {
    dispatch(getDetail(props.match.params.id))//para obtener el detalle de un dog 
  }, [dispatch])
  

  const myDog = useSelector ((state) => state.detail)
  return (
    <div className='container'>
      <NavLink to='/home'>
        <button className='back'>back</button>
      </NavLink>
      
        <div className='data'>
          <h1>{myDog.name}</h1>
          <img src={myDog.image} alt={myDog.image} />
          <h4 className='hs'>Height: {myDog.height}</h4>
          <h4 className='hs'>Height: {myDog.height}</h4>
          <h4 className='hs'>Life Span: {myDog.lifeSpan}</h4>
          <h4 className=''>Temperaments: {myDog.temperaments}</h4>
        </div>
    </div>
  );
}