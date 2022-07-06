import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import counterReducer from '../reducers'
import DisplayCounter from './DisplayCounter'

configure({ adapter: new Adapter() });

describe('<DisplayCounter/>', ()=>{
    const mockStore = createStore(counterReducer, {count: 10});
    const getWrapper = () => mount(
        <Provider store={mockStore}>
            <DisplayCounter/>
        </Provider>
    );

    it('mounts', ()=>{
        const wrapper = getWrapper()
        expect(wrapper.contains(<p>O contador está em: 10</p>))            
            .toBe(true)

    })
})