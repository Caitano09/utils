const INITIAL_STATE = {
    data: [],
    isFatching: false,
    error: false
}

const ip = (state = INITIAL_STATE, action) =>{
    if(action.type === 'LOAD_DATA_REQUEST'){
        return {
            isFatching: true,
            data: [],
            error: false
        }
    }else if(action.type === 'LOAD_DATA_SUCCESS'){
        return{
            isFatching: false,
            data: action.data,
            error: false
        }
    }else if(action.type === 'LOAD_DATA_ERROR'){
        return{
            isFatching: false,
            data: [],
            error: true
        }
    }
    return state
}

export default ip