import React, {useState, useEffect} from 'react'
const Card = (props) =>{
    const [counter, setCounter] = useState(0)
    useEffect(() =>{
        setInterval(() =>{
            setCounter(old => old+1)
        }, 1000)
    },[])

    return(
        <div>
            <h1>{props.header(counter)}</h1>
            <p>{props.body}</p>
            <div>{props.children(counter)}</div>
        </div>
    )
}

export default Card

