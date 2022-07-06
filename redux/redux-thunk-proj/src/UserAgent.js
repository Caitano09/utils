import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import action from './action'

export const UserAgent = (props) =>{
    
    useEffect(()=>{
        props.loadData()
    },[])
    
    if(props.isFetching){
        return <span>Loading...</span>
    }else if(props.error){
        return <span>Error</span>
    }else{
        return <span>User-Agent: {props.data['user-agent']}</span>
    }
}

const mapStateToProps = (state) =>{
    return{
        isFetching: state.ua.isFetching,
        data: state.ua.data,
        error: state.ua.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loadData: () => dispatch(action.loadUA())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAgent)