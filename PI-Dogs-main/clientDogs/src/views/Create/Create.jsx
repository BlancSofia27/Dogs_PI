import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addDog, getTemperaments } from '../../redux/actions'

import validate from './validates'

import styles from './create.module.css'
import NavBar from '../../components/NavBar/NavBar'

export default function Create(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    //Traigo los temperamentos del estado Global
    const Temperaments = useSelector((state) => state.temperaments); 
  
    //Creo un estado Local para los inputs del form
    const [newDog, setNewDog] = useState({
        name: '',
        image:'',   
        min_lifeSpan:'',
        max_lifeSpan:'',
        min_weight: '',
        max_weight: '',
        min_height: '',
        max_height: '',
        temperaments: []
    });

    

  

    //Creo un estado Local para los errors
    const [errors, setErrors] = useState({
        name:'dogs name is required',
        image:'enter a url',
        min_lifeSpan:'',
        max_lifeSpan:'',
        min_weight: '',
        max_weight: '',
        min_height: '',
        max_height: '',
        temperaments:'Select the least one temperament for your dog'
    });
    

    //Para renderizar los temperamentos
    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch]);

    function handleChange(e){
        e.preventDefault();
        //Para guardar los inputs
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        });

        //Para verificar las validaciones
        setErrors(validate({
            ...newDog,
            [e.target.name]: e.target.value
        }));
    }

    //Para el select de los temperamentos
    function handleTemperament(e){
        e.preventDefault();
        const selectedTemperament=e.target.value;

        if (newDog.temperaments.includes(selectedTemperament)) {     //Para evitar que se agregue dos veces el mismo temperamento
            setNewDog({
              ...newDog,
              temperaments: newDog.temperaments.filter(temp => temp !== selectedTemperament)
            });
          } else {
            setNewDog({
              ...newDog,
              temperaments: [...newDog.temperaments, selectedTemperament]
            });
            setErrors({
                ...errors,
                temperaments:null
            });
          }
    }

    //Para eliminar algun temperamento que agregue por error
    function handleTemperamentDelete(temperaments){
        const updatedTemperaments = newDog.temperaments.filter((temp) => temp !== temperaments);
        setNewDog({
            ...newDog,
            temperaments: updatedTemperaments
        });
    }

    
    //Para limpiar el input y cargar la info
    function handleSubmit(e){
        e.preventDefault();

        if(!errors.name&&!errors.image&&!errors.min_lifeSpan&&!errors.max_lifeSpan&&!errors.min_weight&&!errors.max_weight&&!errors.min_height&&!errors.max_height&&!errors.temperaments){

            dispatch(addDog(newDog));
            
            alert('Dog created successfully!');
    
            setNewDog({
              name: '',
              image:'',   
              min_lifeSpan:'',
              max_lifeSpan:'',
              min_weight: '',
              max_weight: '',
              min_height: '',
              max_height: '',
              temperaments: []
            });

            //Me redirige a home
            navigate('/home');
        } else alert('Data is missing or incorrect!')
    }

    return(
        <div className={styles.layout}>
            <NavBar/>
            
            <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
            <h1>Dog form</h1>
                <div className={styles.inputBox}>
                    <label>Name</label>
                    <input type="text" value={newDog.name} name='name' placeholder="Dog's name..." autoComplete='off' onChange={(e)=>handleChange(e)}></input>
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </div>
                <div className={styles.inputBox}>
                    <label>Image</label>
                    <input type="text" value={newDog.image} name='image' autoComplete='off' placeholder='Enter url of the image...' onChange={(e)=>handleChange(e)}></input>
                    {errors.image && (
                        <span className="error">{errors.image}</span>
                    )}
                </div>
                <div className={styles.inputBox}>
                <div className={styles.minmax}>
                    <div>
                        <label>Min Life Span</label>
                        <input type="number" value={newDog.min_lifeSpan} name='min_lifeSpan' autoComplete='off' placeholder="" onChange={(e)=>handleChange(e)}></input>
                        {errors.min_lifeSpan && (
                        <span className="error">{errors.min_lifeSpan}</span>
                        )}  
                    </div>
                    
                    <div>
                        <label>Max Life Span</label>
                        <input type="number" value={newDog.max_lifeSpan} name='max_lifeSpan' autoComplete='off' placeholder="" onChange={(e)=>handleChange(e)}></input>
                        {errors.max_lifeSpan && (
                            <span className="error">{errors.max_lifeSpan}</span>
                        )}  
                    </div>
                </div>
                </div>
                <div className={styles.inputBox}>
                <div className={styles.minmax}>
                    <div>
                        <label>Weight Min</label>
                        <input type="number" value={newDog.min_weight} name='min_weight' autoComplete='off' placeholder="Weight min in cm..." onChange={(e)=>handleChange(e)}></input>
                        {errors.min_weight && (
                        <span className="error">{errors.min_weight}</span>
                        )}  
                    </div>
                    
                    <div>
                        <label>Weight Max</label>
                        <input type="number" value={newDog.max_weight} name='max_weight' autoComplete='off' placeholder="Weight max in cm..." onChange={(e)=>handleChange(e)}></input>
                        {errors.max_weight && (
                            <span className="error">{errors.max_weight}</span>
                        )}  
                    </div>
                </div>
                </div>
                <div className={styles.inputBox}>
                    <div className={styles.minmax}>
                    <div>
                        <label>Height Min</label>
                        <input type="number" value={newDog.min_height} name='min_height' autoComplete='off' placeholder="Height min in cm..." onChange={(e)=>handleChange(e)}></input>
                        {errors.min_height && (
                            <span className="error">{errors.min_height}</span>
                        )}  
                    </div>
                    <div>
                        <label>Height Max</label>
                        <input type="number" value={newDog.max_height} name='max_height' autoComplete='off' placeholder="Height max in cm..." onChange={(e)=>handleChange(e)}></input>
                        {errors.max_height && (
                            <span className="error">{errors.max_height}</span>
                        )}
                    </div>
                    </div>
                </div>
                
                <div className={styles.inputBox}>
                    <label>Temperaments</label>
                   
                    <select onChange={(e) => handleTemperament(e)} defaultValue={""}>
                        <option value='' disabled>Select temperaments</option>
                            {Temperaments.map((temperament) => (
                                <option key={temperament} value={temperament.name}>
                                    {temperament.name}
                                </option> 
                            ))}
                    </select>
                            
                    {newDog.temperaments.length > 0 && (
                     <div>
                        <label>Selected temperaments: </label>
                        {newDog.temperaments.map((temp, index) => (
                            <p key={index}> {index===0 ?temp: `, ${temp}`} <button className={styles.deleteTemp} type='button' onClick={() => handleTemperamentDelete(temp)}>x</button></p>
                        ))}
                     </div>
                    )}
                    {errors.temperaments && (
                                <span className="error">{errors.temperaments}</span>
                            )}
                </div>

                <button type="submit" className={styles.submit}>Create Dog!</button>
            </form>
        </div>
    )
}

