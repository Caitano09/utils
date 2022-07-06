import {Provider} from 'react-redux'
import {applyMiddleware,createStore} from 'redux'
import logger from 'redux-logger'

import counterReducer from './reducers'
import Counter from './components/Counter'
import DisplayCounter from './components/DisplayCounter'

const store = createStore(counterReducer, applyMiddleware(logger))//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
        <DisplayCounter />
      </div>
    </Provider>
  );
}

export default App;
