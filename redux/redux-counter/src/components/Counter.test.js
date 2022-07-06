import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {increment, decrement} from '../actions'
import counterReducer from '../reducers'
import Counter from './Counter'

configure({ adapter: new Adapter() });

describe('<Counter/>', ()=>{

    const getWrapper = (mockStore = createStore(counterReducer, {count: 10})) => mount(
        <Provider store={mockStore}>
            <Counter/>
        </Provider>
    );

    it('mounts', ()=>{
        const wrapper = getWrapper()
        expect(wrapper.length).toEqual(1)
    })

    it('calls increment and decrement', () => {

        const mockStore = createStore(counterReducer, { count: 0 });
        mockStore.dispatch = jest.fn();
        
        const wrapper = getWrapper(mockStore)

        wrapper.find('.increment').simulate('click')
        expect(mockStore.dispatch).toHaveBeenCalledWith(increment(20));

        wrapper.find('.decrement').simulate('click')
        expect(mockStore.dispatch).toHaveBeenCalledWith(decrement(10));

        expect(wrapper.find('.counter').text()).toEqual('0')
        //expect(wrapper.find('.counter').html()
    })
})

