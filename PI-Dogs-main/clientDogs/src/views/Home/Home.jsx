
import Cards from "../../components/Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDogs,
  filterByOrigin,
  filterDogsByTemperaments,
  orderDogsAlphabetic,
  weightOrder,
  getTemperaments,
  deleteFilters,
  cleanStates
} from "../../redux/actions";
import { useEffect, useState } from "react";
import loader from "../../images/loaderDog.gif";
import Paginado from "../../components/Paginado/Paginado";
import NavBar from "../../components/NavBar/NavBar";
import styles from './Home.module.css'

export default function HomePage() {
  const { myDogs, loading, temperaments } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(cleanStates())
  }, [dispatch]);
  useEffect(() => {
    if (!temperaments.length) {
      dispatch(getTemperaments())
    }
  }, [dispatch, temperaments])
  const [page, setPage] = useState(1);
  const finalPage = page * 9; //9 indica la cantidad de recetas que voy a mostrar por página
  const startPage = finalPage - 9;
  const actualPage = myDogs?.slice(startPage, finalPage)
  const totalPages = Math.ceil(myDogs.length / 9);
  const handlerPrevPage = () => {
    setPage(page - 1);
  };
  const handlerNextPage = () => {
    setPage(page + 1);
  };
  const handlerPageNumber = (n) => {
    setPage(n);
  };

  

  const filterHandler = (event) => {
    const { name,  value } = event.target;
    if (name === "Temperaments") {
      console.log('pasa por aca ')
      dispatch(filterDogsByTemperaments(value));
      setPage(1)
    } else {
      dispatch(filterByOrigin(value));
      setPage(1)
    }
    if (value === 'All') {
      dispatch(deleteFilters())
      setPage(1)
    }
  };

  const orderHandler = (event) => {
    const { name, value } = event.target;
    if (name === "Alphabetic") {
      dispatch(orderDogsAlphabetic(value));
    } else {
      dispatch(weightOrder(value));
    }
  };

  const reset = () => {
    dispatch(deleteFilters());
    const selectElements = document.getElementsByTagName("select");
    for (let i = 0; i < selectElements.length; i++) {
      selectElements[i].selectedIndex = 0;
    }
  };

  return (
    <div >
      <NavBar setPage={setPage} />
      <div className={styles.options}>
        <select name="Origin" onChange={filterHandler} defaultValue='Filter By Origin'>
          <option disabled >Filter By</option>
          <option value="All">All</option>
          <option value="Api">Api</option>
          <option value="DataBase">DataBase</option>
        </select>
        <select name="Temperaments" onChange={filterHandler} defaultValue='Filter By Temperaments'>
          <option disabled >Filter By</option>
          <option value="All">All</option>
          
          {temperaments.map((temperament) => {
            return (
              <option value={temperament.name} key={temperament.Id} name={temperament.name}>
                {temperament.name}
              </option>
            );
          })}
        </select>
        
        <select name="Alphabetic" onChange={orderHandler} defaultValue='Alphabetic Order'>
          <option disabled >Order By</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select name="weight" className={styles.weight} onChange={orderHandler} defaultValue='Weight Order'>
          <option disabled > Order By</option>
          <option value="Ascendente">Lowest Weight</option>
          <option value="Descendente">Highest Weight</option>
        </select>
        <button onClick={reset} className={styles.reset}>Reset</button>
      </div>
      <br />
      <div className={styles.paginado}>
        <Paginado
          totalPages={totalPages}
          page={page}
          prevPage={handlerPrevPage}
          nextPage={handlerNextPage}
          pageNumber={handlerPageNumber}
        />
      </div>
      <div className={styles.contenedor}>
        {loading ? (
          <div className={styles.loader}>
            <img src={loader} alt="Loading" />
          </div>

        )
          : actualPage.length > 0 ? (
            actualPage.map((dog) => {
              return (
                <div key={dog.id}>
                  <Cards info={myDogs}/>
                </div>
              );
            })
          ) : (
            <h2>
              I did not find the recipe you are looking for, but we are working on it
            </h2>
          )}
      </div>
    </div>
  );
}