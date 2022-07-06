import {loadDataUARequest} from './actions'
import {connect} from 'react-redux'

const UserAgent = props =>{
    return(
        <p>
        User-Agent {props.data}
        {!props.isFetching && <button onClick={() => props.loadData()}>Load</button>}
        {props.isFetching && <span>loading...</span>}
        </p>
    )
}

const mapStateToProps = state =>{
    return {
        isFetching: state.ua.isFetching,
        data: state.ua.data,
        error: state.ua.error
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        loadData: () => dispatch(loadDataUARequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAgent)