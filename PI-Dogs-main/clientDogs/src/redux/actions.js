import {
    ADD_DOG,
    GET_ALL_DOGS,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_ORIGIN,
    WEIGHT_ORDER,
    ALPHABETIC_ORDER,
    GET_DETAIL_DOG,
    SET_LOADING,
    GET_TEMPERAMENTS,
    CLEAN_STATES,
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
            const response = await axios.post("http://localhost:3001/dogs/", dog);
            return dispatch({ type: ADD_DOG, payload: response.data }); 
        } catch (error) {
            console.log(error.message);
            alert("No se pudo crear receta");
        }
    };
};
export const getAllDogs = () => { //funcion para obtener los perros
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            console.log('ejecutando action');
            const response = await axios.get("http://localhost:3001/dogs/allDogs");
            console.log('ejecutando action 2');
            dispatch({ type: GET_ALL_DOGS, payload: response.data });
            dispatch(setLoading(false));
        } catch (error) {
            console.log("dogs not found");
        }
    };
};
export const getQueryDog = (name) => { //para obtener recetas segun el nombre
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(
                `http://localhost:3001/dogs/?name=${name}`
            );
            dispatch({ type: GET_ALL_DOGS, payload: response.data });
            dispatch(setLoading(false));
        } catch (error) {
            alert("No encontré el dog que estás buscando");
        }
    };
};
export const getDetail = (id) => { //para obtener los detalles de una receta segun su id
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            dispatch({ type: GET_DETAIL_DOG, payload: response.data });
            dispatch(setLoading(false));
        } catch (error) {
            alert("No existe la receta con el ID indicado");
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
        payload: temperament,
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

