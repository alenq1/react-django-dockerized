import { createSelector } from 'reselect'

const rawData = state => state.example && state.example.data

export const exampleSelector = createSelector(


    [rawData],

    (data) => {
        
            //console.log(data, "data")
            
            return JSON.stringify(data, null, 2)
        
    }

)
