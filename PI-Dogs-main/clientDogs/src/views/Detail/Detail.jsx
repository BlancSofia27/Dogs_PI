
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../images/loaderDog.gif";
import { getDetail } from "../../redux/actions";

export default function Detail() {
  const { id } = useParams(); //para obtener el id desde los parametros de la URL
  const { detail, loading } = useSelector(state => state) //para acceder a las propiedades detail y loading del estado global
  const dispatch = useDispatch(); //para actualizar el estado global
  useEffect(() => {
    dispatch(getDetail(id))//para obtener el detalle de una receta especifica
  }, [dispatch, id])
  const regExp = /<[^>]*>/g;
  return (
    <div className='container'>
      <NavLink to='/home'>
        <button className='back' style={{ display: loading ? "none" : "" }}>back</button>
      </NavLink>
      {loading ? <div className='loader'><img src={loader} alt='Loading' /> </div> :
        (<div className='data'>
          <h1>{detail.title}</h1>
          <img src={detail.img} alt={detail.title} />
          <h4 className='hs'>Health Score: {detail.health_score}</h4>
          <h3>Summary</h3>
          <p>{detail.summary?.replace(regExp, "")}</p>
          <h3>How To</h3>
          {detail.step_by_step ? (
            <p>{detail.step_by_step.replace(regExp, "")}</p>
          ) : <p>This recipe does not have its step by step</p>}
          <h4 className='diets'>Diets: {detail.diets?.map((diet, i) => <li key={i}>{diet.name?.charAt(0).toUpperCase() + diet.name?.slice(1)}</li>)}</h4>
        </div>)}
    </div>
  );
}