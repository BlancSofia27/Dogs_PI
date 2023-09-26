

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
import Pagination from "../../components/Pagination/Pagination"
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card"
import styles from './Home.module.css'

export default function HomePage() {


  
  const {  temperaments, allDogsCopy, allDogs} = useSelector( (state) => state);
  //const {allDogs} = useSelector((state) => state.allDogs)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
   
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }
      
  
    

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(cleanStates())
  }, [dispatch]);
  useEffect(() => {
    if (!temperaments.length) {
      dispatch(getTemperaments())
    }
  }, [dispatch, temperaments])

  const filterHandler = (event) => {
    const { name,  value } = event.target;
    if (name === 'Temperaments') {
     
      dispatch(filterDogsByTemperaments(value));
     
    }if(name === 'Origin') {
      console.log(value)
      dispatch(filterByOrigin(value));
     
    }
    
  };

  const orderHandler = (event) => {
    const { name, value } = event.target;
    if (name === "Alphabetic") {
      dispatch(orderDogsAlphabetic(value));
    } 
    else {
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
    <div>
      <NavBar  />
      <div className={styles.options}>
      <select name='Origin' onChange={filterHandler} defaultValue='Filter By Origin'>
          <option disabled >Filter By</option>
          <option value="All">All</option>
          <option value="Api">Api</option>
          <option value="DataBase">DataBase</option>
        </select>
        <select className={styles.adap} name='Temperaments' onChange={filterHandler} defaultValue='Filter By Temperaments'>
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
        <select name="weight" className={styles.adap} onChange={orderHandler} defaultValue='Weight Order'>
          <option disabled > Order By</option>
          <option value="Ascendente">Lowest Weight</option>
          <option value="Descendente">Highest Weight</option>
        </select>
        <button onClick={reset} className={styles.reset}>Reset</button>
      </div>
      <div className={styles.contenedor}>
       
      <Pagination
      dogsPerPage={dogsPerPage}
      allDogs={allDogs.length}
      paginado={paginado}
        />
      {currentDogs?.map((dog) => {
        return (
          <div key={dog}>
             <Card name={dog.name} image={dog.image} weight={dog.weight} temperaments={dog.temperaments}/>
          </div>
        );
            })} 
            </div>
            
        </div>






        
  
  );
}