import { createStore, applyMiddleware } from 'redux';
import createSagaMiddlerware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import rootSaga from './index';

const sagaMiddleware = createSagaMiddlerware();

const store = createStore(reducers,  composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
