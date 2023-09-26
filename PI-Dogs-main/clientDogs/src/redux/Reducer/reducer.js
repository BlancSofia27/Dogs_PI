import {
  ADD_DOG,
  GET_ALL_DOGS,
  GET_QUERY_DOGS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_ORIGIN,
  WEIGHT_ORDER,
  ALPHABETIC_ORDER,
  SET_LOADING,
  GET_DETAIL_DOG,
  CLEAN_STATES,
  DELETE_FILTERS,
} from "../actions-types";

const initialState = {  
  allDogs: [],
  loading: false,
  detail: {},
  temperaments: [],
  allDogsCopy:[],
  
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING: //Actualiza el estado loading con el valor de payload
      return {
        ...state,
        loading: payload,
      };
    case ADD_DOG: //Agrega la receta proporcionada en payload tanto a myRecipes como a allRecipes
      return {
        ...state,
        allDogs: [...state.allDogs, payload],
        allDogsCopy: [...state.allDogsCopy, payload]
      };
    case GET_ALL_DOGS: //Actualiza tanto myRecipes como allRecipes con las recetas proporcionadas en payload
      return {
        ...state,
        allDogs: payload,
        allDogsCopy: payload
      };
    case GET_QUERY_DOGS: //Actualiza allDogs con los dogs filtradas proporcionadas en payload
      return {
        ...state,
        allDogs: payload,
      }
      // {const allDogsFind = state.allDogs.filter(dog => dog.name.includes(payload))
      // return{
      //   ...state,
      //   allDogs:
      //   (payload === '')? state.allDogs : allDogsFind
      // }}
    case GET_TEMPERAMENTS: //Actualiza diets con los tipos de dietas proporcionados en payload
      return {
        ...state,
        temperaments: payload,
        
      }
    case GET_DETAIL_DOG: //Actualiza detail con el detalle de la receta proporcionada en payload
      return {
        ...state,
        detail: payload,
      };
      case FILTER_BY_TEMPERAMENTS: 
      { const AllDogsFiltered = state.allDogsCopy.filter( dog => dog.temperaments && dog.temperaments.includes(payload));
        console.log(AllDogsFiltered)
        console.log(state.allDogs)
        return {
        
        ...state,
        allDogs:
          (payload === 'All')
          ? state.allDogsCopy
          : AllDogsFiltered
          
      }
    }
    
        

      
      // { const allDogs = state.allDogs
      //   const originFilter = payload === 'Database' ? allDogs.filter(dog => dog.createdInDB) : allDogs.filter(dog => !dog.createdInDB)
      // return {
      //   ...state,
      //   allDogs : payload === 'All'? allDogs : originFilter
      // }}

      case FILTER_BY_ORIGIN:{
        const filteredDogs =
          (payload === 'DataBase') 
            ? state.allDogsCopy.filter(dog => dog.createdInDB)
            : (payload === 'Api') 
              ? state.allDogsCopy.filter(dog => !dog.createdInDB)
              : state.allDogsCopy;
      
        console.log('Dogs after filter:', filteredDogs);
      
        return {
          ...state,
          allDogs: filteredDogs
        };
      }
      
      
      
       
      
      
    
    case ALPHABETIC_ORDER: //Ordena las recetas en myRecipes alfabéticamente según el criterio especificado en payload
      return {
        ...state,
        allDogs:
          payload === "A-Z"
            ? state.allDogs.sort((a, b) => a.name.localeCompare(b.name))
            : state.allDogs.sort((a, b) => b.name.localeCompare(a.name)),
      };
    case WEIGHT_ORDER: //Ordena las recetas en myRecipes según la puntuación de salud en orden ascendente o descendente según el criterio especificado en payload
      return {
        ...state,
        allDogs:
          payload === "Ascendente"
            ? state.allDogs.sort((a, b) => (a.weight < b.weight ? -1 : 1))
            : state.allDogs.sort((a, b) => (a.weight > b.weight ? -1 : 1)),
      };
     
    case DELETE_FILTERS: // Restablece myRecipes con todas las recetas en allRecipes
      return {
        ...state,
        allDogs: state.allDogsCopy
      }
    case CLEAN_STATES: //Limpia el estado detail restableciéndolo a un objeto vacío
      return {
        ...state,
        detail: {}
      };
    default:
      return { ...state };
  }
};

export default reducer;
