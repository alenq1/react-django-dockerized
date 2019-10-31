import { EXAMPLE_ACTION } from '../constants/action-types'


const initialState = {

  dataTest: ''
}
const exampleReducer = (state = initialState, action) => {


  //console.log(action.payload, "PAYLOAD PARA CAMBIAR")
  switch (action.type) {
    case EXAMPLE_ACTION:

      return {
        ...state,
        dataTest: action.payload
      };
    default:

      return state

  }
}
export default exampleReducer;