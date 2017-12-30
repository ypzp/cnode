import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import Reducer from '../reducers/reducer'
//import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
const configureStore = () => {
  const store = createStore(Reducer, applyMiddleware(sagaMiddleware))
  //sagaMiddleware.run(sagas)
  return store
}
export default configureStore