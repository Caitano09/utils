import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {loadData} from './action'

export const Info = (props) =>{
    
    useEffect(()=>{
        props.loadData()
    },[])
    
    if(props.isFetching){
        return <span>Loading...</span>
    }else if(props.error){
        return <span>Error</span>
    }else{
        return <span>Info: {props.data.origin}</span>
    }
}

const mapStateToProps = (state) =>{
    return{
        isFetching: state.ip.isFetching,
        data: state.ip.data,
        error: state.ip.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loadData: () => dispatch(loadData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)