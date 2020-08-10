import { createStore, applyMiddleware } from 'redux';
import createSagaMiddlerware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './index';
import rootSaga from './RootSaga';

const sagaMiddleware = createSagaMiddlerware();

const store = createStore(reducers,  composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
