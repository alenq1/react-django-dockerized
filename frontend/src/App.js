import React from 'react'
import {Provider} from 'react-redux'
import store from './store/store'
import 'bootstrap/dist/css/bootstrap.css';
import Main from './layout/Main'


const App = () => {

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
)
}

export default App
