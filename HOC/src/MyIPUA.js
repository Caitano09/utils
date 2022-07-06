import React from 'react'
import withHttp from './withHttp.js'

const MyIPUA = (props) => {
    console.log(props)
    if (props.props.ip.isLoading && props.props.ua.isLoading) {
        return <p>Carregando...</p>
    } else {
        return (
            <div>
                <p>Meu ip: {props.props.ip.data.origin}</p>
                <p>Meu UA: {props.props.ua.data['user-agent']}</p>
            </div>
            )
    }
}

const ComIp = withHttp({
    url: 'http://httpbin.org/ip',
    propName: 'ip'
})(MyIPUA)

export default withHttp({
    url: 'http://httpbin.org/user-agent',
    propName: 'ua'
})(ComIp)