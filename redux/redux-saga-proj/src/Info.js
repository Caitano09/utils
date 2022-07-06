import {loadDataRequest} from './actions'
import {connect} from 'react-redux'

const Info = props =>{
    return(
        <p>
        Info {props.data}
        {!props.isFetching && <button onClick={() => props.loadData()}>Load</button>}
        {props.isFetching && <span>loading...</span>}
        </p>
    )
}

const mapStateToProps = state =>{
    return {
        isFetching: state.ip.isFetching,
        data: state.ip.data,
        error: state.ip.error
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        loadData: () => dispatch(loadDataRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)