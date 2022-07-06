import withHttp from './withHttp.js'

const MyIp = (props) => {
    if (props.isLoading && props.data) {
        return <p>Carregando...</p>
    } else {
        return <p style={props.style}>Meu IP é: {props.data.origin}</p>
    }
}

export default withHttp('http://httpbin.org/ip')(MyIp)