import React, { useState, useEffect } from 'react'
import axios from 'axios'

//const withHttp = ({url, propName}) => {
const withHttp = (url) => {
    return (WrappedComponent) => (props) => {
        const [isLoading, setIsLoading] = useState(false)
        const [data, setData] = useState({})

        useEffect(() => {
            console.log(url)
            setIsLoading(true)
            axios
                .get(url)
                .then(data => {
                    setIsLoading(false)
                    setData(data.data)
                })
        }, [])

        return <WrappedComponent
            data={data}
            isLoading={isLoading}
            {...props}
        />
    }
}
export default withHttp