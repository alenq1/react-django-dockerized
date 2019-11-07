import { FETCH_DATA, LOADING_DATA, ERROR_FETCH } from '../constants/action-types'

const initialState = {

  data: '',
  loading: false,
  error: '',

}

const exampleReducer = (state = initialState, action) => {

  //console.log(action.payload, "PAYLOAD")
  switch (action.type) {
    case FETCH_DATA:

      return {
        ...state,
        data: action.payload,
        loading: false

      };
    case ERROR_FETCH:

      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case LOADING_DATA:

      return {
        // IF DONT WANT KEEP THE PREVIOUS STATE WHILE LOADING
        //...state,
        loading: true

      }

    default:

      return state

  }
}
export default exampleReducer;