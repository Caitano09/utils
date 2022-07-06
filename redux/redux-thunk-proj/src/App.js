import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import logger from 'redux-logger'
import Info from './Info'
import UserAgent from './UserAgent'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Info />
        <UserAgent />
      </div>
    </Provider>
  );
}

export default App
