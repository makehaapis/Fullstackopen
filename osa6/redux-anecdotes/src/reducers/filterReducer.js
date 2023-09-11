const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            state = action.payload.searchstring
            return state
        default:
            return state
    }
  }
  
  export const filterChange = (searchstring) => {
        return {
        type: 'SET_FILTER',
        payload: {searchstring},
        }
  }

  export default filterReducer