import uaSagas from './uaSagas'
import sagaHelper from 'redux-saga-testing'
import {call, put} from 'redux-saga/effects'
import {loadDataUASuccess} from './../actions'

describe('should test uaSagas', ()=>{
    const axiosMock = {
        get: jest.fn()
    }
    const it = sagaHelper(uaSagas(axiosMock))
    it('should call api get', result =>{
        expect(result).toEqual(call(axiosMock.get, 'http://httpbin.org/user-agent'))
        return{
            data:{
                'user-agent': 'user agent'
            }
        }
    })
    it('should return user-agent', result =>{
        expect(result).toEqual(put(loadDataUASuccess('user agent')))
    })
})