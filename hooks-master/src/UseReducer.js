import React, { useReducer } from 'react'

const reducer = (state, action) =>{
    switch(action.type){
        case 'INCREMENT': 
            return {counter: state.counter + action.value}
        case 'DECREMENT': 
            return {counter: state.counter - action.value}
        default:
            return state
    }
}

const UseReducer = () =>{
    const [state, dispatch] = useReducer(reducer, {counter: 0})
    return(
        <div>
            <h1>useReducer:</h1>
            <div>
                {JSON.stringify(state)}
                <button onClick={() => dispatch({type: 'INCREMENT', value: 10})}>+</button>
                <button onClick={() => dispatch({type: 'DECREMENT', value: 5})}>-</button>
            </div>
            <hr/>
        </div>
    )
}

export default UseReducer