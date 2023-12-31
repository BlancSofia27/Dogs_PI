import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addDog, getTemperaments,getAllDogs } from '../../redux/actions'

import validate from './validates'

import styles from './create.module.css'
import NavBar from '../../components/NavBar/NavBar'

export default function Create(){
    const dispatch = useDispatch();//configuro el dispatch
    const navigate = useNavigate();//configuro navigate

    

    //Traigo los temperamentos del estado Globalen mi reducer y los guardo en una constante
    const { allDogsCopy,temperaments} = useSelector((state) => state); 
    console.log(allDogsCopy)


    const [availabilityMessage, setAvailabilityMessage] = useState('')




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
        name:'required',//agrego algunos mensajes por defecto
        image:'required',
        min_lifeSpan:'required',
        max_lifeSpan:'required',
        min_weight: 'required',
        max_weight: 'required',
        min_height: 'required',
        max_height: 'required',
        temperaments:'required',
        validateName:'you need to validate the name'
    });

    

    //uso useEffect para renderizar los temperamentos al cargarse la pagina
    useEffect(()=>{
        dispatch(getTemperaments())//mediante una action
        dispatch(getAllDogs());
    },[dispatch]);


    //funcion para guardar los cambios constantemente
    function handleChange(e){
        e.preventDefault();
        
        // Para guardar los inputs de mi dog
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        });
    
        // Para verificar las validaciones
        const validationErrors = validate({
            ...newDog,
            [e.target.name]: e.target.value
        });
    
        // Establecer los errores de validación
        setErrors({
            ...errors,
            ...validationErrors,
        });


        
    }

    function handleChangeName(e){
        e.preventDefault
        
        // Para guardar los inputs de mi dog
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        });
    
        // Para verificar las validaciones
        const validationErrors = validate({
            ...newDog,
            [e.target.name]: e.target.value
        });
    
        // Establecer los errores de validación
        setErrors({
            ...errors,
            ...validationErrors,
            validateName: 'validate name required' // Esto parece ser un mensaje de error estático
        });
        setAvailabilityMessage('')
        
    
    }

    //funcion para seleccionar los temperamentos
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

    function validateName(newDog,e){
        e.preventDefault();
        if(newDog.name && allDogsCopy.find(dog => dog.name === newDog.name)){
            setErrors({...errors, validateName: "Name already exists."});
            setAvailabilityMessage(""); // Clear availability message if a dog with that name already exists
        } else {
            setErrors({...errors, validateName: null});
            setAvailabilityMessage("Name available"); // Set availability message if the name is available
        }
    }
    
    


    
    //funcion para eliminar algun temperamento que agregue por error
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

        if(!errors.name&&!errors.image&&!errors.min_lifeSpan&&!errors.max_lifeSpan&&!errors.min_weight&&//valido que no haya errores
            !errors.max_weight&&!errors.min_height&&!errors.max_height
             ){

            dispatch(addDog(newDog));//mediante el dispatch uso la action addDog y le mando mi newDog
            alert('dog created successfully!')
            
    
            setNewDog({//seteo newDog de 0
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
        } 
    }

    return(
        <div className={styles.layout}>
            <NavBar/>
            <form className={styles.form} >
            <NavLink to='/home'>
         <button className={styles.back}>⇦back</button>
       </NavLink>
            <h1 className={styles.FirstText}>Create your dog</h1>
                <div className={styles.inputBox}>
                    <label>Name</label>
                    < input type="text" className={styles.name} value={newDog.name} name='name' placeholder="Dog's name..." autoComplete='off' onChange={(e)=>handleChangeName(e)}></input>
                    { !errors.name && <button onClick={(e) => validateName(newDog,e) }className={styles.validateButton}>validate name</button>}
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </div>
                
                {!errors.name && <span style={{color: "green"}}>{availabilityMessage}</span>}
                <span className="error">{errors.validateName}</span>
                <div className={styles.inputBox}>
                    <label>Image</label>
                    <input type="text" value={newDog.image} name='image' autoComplete='off' placeholder='Enter url of the image...' onChange={(e)=>handleChange(e)}></input>
                    {errors.image && (
                        <span className="error">{errors.image}</span>
                    )}
                </div>
                <div className={styles.inputBox}>
                <div className={styles.minmax}>
                    <div  className={styles.errorAdapDiv}>
                        <label>Min Life Span</label>
                        <input type="number" value={newDog.min_lifeSpan} name='min_lifeSpan' autoComplete='off' placeholder="" onChange={(e)=>handleChange(e)}></input>
                        {errors.min_lifeSpan && (
                        <h4 className={styles.errorAdap}>{errors.min_lifeSpan}</h4>
                        )}  
                    </div>
                    
                    <div>
                        <label>Max Life Span</label>
                        <input type="number" value={newDog.max_lifeSpan} name='max_lifeSpan' autoComplete='off' placeholder="" onChange={(e)=>handleChange(e)}></input>
                        {errors.max_lifeSpan && (
                            <h4 className={styles.errorAdap}>{errors.max_lifeSpan}</h4>
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
                            {temperaments.map((temperament) => (// mapeo los temperaments para mostrar las opciones
                                <option key={temperament} value={temperament.name}>
                                    {temperament.name}
                                </option> //muestro la propiedad temperament.name 
                            ))}
                    </select>
                            
                    {newDog.temperaments.length > 0 && (//condicional para cuando se agregue un temperament muestro los seleccionados
                     <div>
                        <label>Selected temperaments: </label>
                        {newDog.temperaments.map((temp, index) => (//los mapeo y agrego handleTemperamentDelete para eliminarlos si quisiera en un button dentro de p
                            <p key={index}> {index===0 ?temp: `, ${temp}`} <button className={styles.deleteTemp} type='button' onClick={() => handleTemperamentDelete(temp)}>x</button></p>
                        ))}
                     </div>
                    )}
                    {errors.temperaments && (
                                <span className="error">{errors.temperaments}</span>// aca muestro un mensaje en caso de que no haya seleccionados
                            )}
                </div>
                {!errors.name &&// condicional para validar que no haya errores
          !errors.image &&
          !errors.min_height &&
          !errors.max_height &&
          !errors.min_weight &&
          !errors.max_weight &&
          !errors.min_lifeSpan &&
          !errors.max_lifeSpan &&
          !errors.validateName &&
          newDog.temperaments.length > 0 ? (
          <button type='submit'  onClick={(e)=>handleSubmit(e)} className={styles.createButton}>Create Dog!</button>// si no los hay agrego un button funcional para crear el dog 
        ) : (
            //si hay algun error renderizo un falso button de create
          <button disabled className={styles.disabledButton}>
            Create Dog!
          </button>
        )}
            </form>
        </div>
    )
}

