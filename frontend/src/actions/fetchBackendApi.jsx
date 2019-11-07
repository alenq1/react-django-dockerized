import {
    FETCH_DATA,
    LOADING_DATA,
    ERROR_FETCH,
    
} from '../constants/action-types'
import axios from 'axios'
import adapter from 'axios/lib/adapters/http'

  
  
const fetchBackendApi = (url) => (dispatch) => {
  
    dispatch({ type: LOADING_DATA })
  
    axios(url)
      .then(response => {
          
          dispatch({ type: FETCH_DATA, payload: response.data })
        
      })
  
      .catch(error => {
    
        dispatch({ type: ERROR_FETCH, payload: error })
      })
  }

export default fetchBackendApi  