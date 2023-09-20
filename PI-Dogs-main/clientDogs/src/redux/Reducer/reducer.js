import {
  ADD_DOG,
  GET_ALL_DOGS,
  GET_QUERY_DOG,
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
  myDogs: [],
  loading: false,
  detail: {},
  temperaments: [],
  allDogs:[],
  
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
        myDogs: [...state.myDogs, payload],
        allDogs: [...state.allDogs, payload]
      };
    case GET_ALL_DOGS: //Actualiza tanto myRecipes como allRecipes con las recetas proporcionadas en payload
      return {
        ...state,
        myDogs: payload,
        allDogs: payload
      };
    case GET_QUERY_DOG: //Actualiza myRecipes con las recetas filtradas proporcionadas en payload
      return {
        ...state,
        myDogs: payload,
      }
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
    case FILTER_BY_TEMPERAMENTS: //Filtra las recetas en allRecipes basándose en el tipo de dieta proporcionado en payload y actualiza myRecipes con las recetas filtradas
    
      {
        const allDogsFiltered = state.allDogs.filter(
          (dog) => dog.temperaments.includes(payload)
        );
        return {
          ...state,
          myDogs: allDogsFiltered,
        };
      }
    
        
  
    
    case ALPHABETIC_ORDER: //Ordena las recetas en myRecipes alfabéticamente según el criterio especificado en payload
      return {
        ...state,
        myDogs:
          payload === "A-Z"
            ? state.myDogs.sort((a, b) => a.name.localeCompare(b.name))
            : state.myDogs.sort((a, b) => b.name.localeCompare(a.name)),
      };
    case WEIGHT_ORDER: //Ordena las recetas en myRecipes según la puntuación de salud en orden ascendente o descendente según el criterio especificado en payload
      return {
        ...state,
        myDogs:
          payload === "Ascendente"
            ? state.myDogs.sort((a, b) => (a.weight < b.weight ? -1 : 1))
            : state.myDogs.sort((a, b) => (a.weight > b.weight ? -1 : 1)),
      };
      case FILTER_BY_ORIGIN: //Filtra las recetas en allRecipes según el origen especificado en payload y actualiza myRecipes con las recetas filtradas
         {
        const filtered = state.allDogs.filter((dog) => {
          const regExp = /^[0-9]+$/;
          if (payload === 'Api' && regExp.test(dog.id)) {
            return true;
          } else if (payload === 'DataBase' && !regExp.test(dog.id)) {
            return true;
          } else {
            return false;
          }
        });
        return {
          ...state,
          myDogs: filtered
        };
      }
      
      
    case DELETE_FILTERS: // Restablece myRecipes con todas las recetas en allRecipes
      return {
        ...state,
        myDogs: state.allDogs
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
