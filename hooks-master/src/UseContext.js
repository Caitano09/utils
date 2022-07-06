import React, {useState, useEffect} from 'react'
import UseContextDeep from './UseContextDeep'
import MyContext from './MyContext'

const UseContext = () =>{

    const [counter, setCounter] = useState(0)

    useEffect(() =>{
        console.log('useEffect')
        const timer = setInterval(() => {
            setCounter(old => old + 1)
        }, 1000);
        return () => {
            console.log('useEffect unmount')
            clearInterval(timer)
        }
    }, [])

    return(
        <div>
            <MyContext.Provider value={counter}>
                <UseContextDeep />
            </MyContext.Provider>
        </div>
    )
}

export default UseContext