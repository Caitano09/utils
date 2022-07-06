import {useSelector} from 'react-redux'

export const DisplayCounter = () =>{
    const count = useSelector(state => state.count)
    return (
        <p>O contador está em: {count}</p>
    )
}

export default DisplayCounter