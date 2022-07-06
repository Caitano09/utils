import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from '../actions'

const Counter = () =>{
    const state = useSelector(stateProp => stateProp)
    const dispatch = useDispatch()
    return (
        <div>
            Contador: <span className='counter'>{state.count}</span>
            <button className='increment' onClick={()=>dispatch(increment(20))}>+</button>
            <button className='decrement' onClick={()=>dispatch(decrement(10))}>-</button>
        </div>
    )
}

export default Counter