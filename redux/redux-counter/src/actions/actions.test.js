import {increment, decrement} from './index'

test('action: increment', ()=>{
    let incr = increment(10)
    expect(incr).toEqual({
        type: 'INCREMENT',
        value: 10
    })
})

test('action: decrement', ()=>{
    let decr = decrement(20)
    expect(decr).toEqual({
        type: 'DECREMENT',
        value: 20
    })
})