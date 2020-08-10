import { createStore, applyMiddleware } from 'redux';
import createSagaMiddlerware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddlerware();

const store = createStore(reducers,  applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
