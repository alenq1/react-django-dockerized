import { createSelector } from 'reselect'

const rawData = state => state.example && state.example.dataTest

export const exampleSelector = createSelector(


    [rawData],

    (data) => {
        
            //console.log(data, "data")
            
            return data
        
    }

)
