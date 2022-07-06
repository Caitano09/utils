import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const Http = props =>{
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        setIsLoading(true)
        axios
            .get(props.url)
            .then(data => {
                setIsLoading(false)
                setData(data.data)
            })
    }, [])
    return(
        props.children({data, isLoading})
    )
}
Http.prototype = {
    children: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
}

export default Http