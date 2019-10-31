import { createSelector } from 'reselect'

const rawData = state => state.example && state.example.dataTest

export const exampleSelector = createSelector(


    [rawData],

    (data) => {
        
            //console.log("OMITO EL SORT")
            //console.log(data[0].cryptoData, "ESTRUCTURA DENTRO DE CRYTPO DATA")
            return data
        
    }

)
