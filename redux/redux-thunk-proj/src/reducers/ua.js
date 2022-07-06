const INITIAL_STATE = {
    data: [],
    isFatching: false,
    error: false
}

const ua = (state = INITIAL_STATE, action) =>{
    if(action.type === 'LOAD_UA_REQUEST'){
        return {
            isFatching: true,
            data: [],
            error: false
        }
    }else if(action.type === 'LOAD_UA_SUCCESS'){
        return{
            isFatching: false,
            data: action.data,
            error: false
        }
    }else if(action.type === 'LOAD_UA_ERROR'){
        return{
            isFatching: false,
            data: [],
            error: true
        }
    }
    return state
}

export default ua