import withHttp from './withHttp.js'

const MyUserAgent = (props) => {
    if (props.isLoading && props.data) {
        return <p>Carregando...</p>
    } else {
        return <p style={props.style}>Meu UA é: {props.data['user-agent']}</p>
    }
}

export default withHttp('http://httpbin.org/user-agent')(MyUserAgent)