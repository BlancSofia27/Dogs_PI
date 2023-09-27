import {
    ADD_DOG,
    GET_ALL_DOGS,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_ORIGIN,
    WEIGHT_ORDER,
    ALPHABETIC_ORDER,
    GET_DETAIL_DOG,
    GET_QUERY_DOGS,
    SET_LOADING,
    GET_TEMPERAMENTS,
    CLEAN_STATES,
    GET_STATE_DOGS,
} from "./actions-types"
import axios from "axios";




export const setLoading = (isLoading) => { //para cambiar el estado de carga de la aplicacion
    return {
        type: SET_LOADING,
        payload: isLoading, 
    };
};
export const addDog = (dog) => { //para agregar una nueva receta
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:3001/dogs/dogs", dog);
            return dispatch({ type: ADD_DOG, payload: response.data }); 
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };
};
export const getAllDogs = () => { //funcion para obtener los perros
    return async function (dispatch) {
        try {
            
            console.log('dogs obtenidos');
            const response = await axios.get("http://localhost:3001/dogs/dogs");
            
            dispatch({ type: GET_ALL_DOGS, payload: response.data });
            
        } catch (error) {
            console.log("dogs not found");
        }
    };
};
export const getStateDogs = (dogs) =>{
    return {
        type: GET_STATE_DOGS,
        payload:dogs
    }
};

export const getQueryDog = (name) => { //para obtener dogs segun el nombre
    return async function (dispatch) {
        try {
           
            const response = await axios.get(
                `http://localhost:3001/dogs/?name=${name}`
            );
            dispatch({ type: GET_QUERY_DOGS, payload: response.data });
            
        } catch (error) {
            alert("No encontré el dog que estás buscando");
        }
    };
};
export const getDetail = (id) => { //para obtener los detalles de una dog segun su id
    return async function (dispatch) {
        try {
           
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            dispatch({ type: GET_DETAIL_DOG, payload: response.data });
            
            console.log('estamos en el detail')
        } catch (error) {
            alert("The dog with the requested id does not exist");
        }
    };
};
export const getTemperaments = () => { //para obtener los tipos de dietas disponibles
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/temperaments/get");
            dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
            
        } catch (error) {
            console.log("Mi base de datos no tiene los temperaments solicitadas");
        }
    };
};
export const filterDogsByTemperaments = (temperament) => { //para filtrar las recetas por tipos de dieta
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload:temperament,
    };
};
export const orderDogsAlphabetic = (option) => { //para ordenar las recetas alfabeticamente
    return {
        type: ALPHABETIC_ORDER,
        payload: option,
    };
};
export const filterByOrigin = (origin) => { //para filtrar las recetas por origen
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin,
    };
};
export const weightOrder = (weight) => { //para ordenar las recetas por puntuacion de salud
    return {
        type: WEIGHT_ORDER,
        payload: weight,
    };
};
export const deleteFilters = () => { //para eliminar los filtros aplicados en las recetas
    return {
        type: "DELETE_FILTERS"
    }
};
export const cleanStates = () => { //para limpiar o reiniciar los estados de la aplicacion
    return {
        type: CLEAN_STATES
    }
};

