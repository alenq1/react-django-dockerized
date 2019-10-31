import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import exampleReducer from '../reducers/exampleReducer'
import thunk from 'redux-thunk'


const reducers = combineReducers({
  example: exampleReducer
})

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  storeEnhancers(applyMiddleware(thunk))
)

export default store