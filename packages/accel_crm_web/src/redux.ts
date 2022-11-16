import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from './reducers/app';
import { ReduxDevTools } from './components';
const rootReducer = combineReducers({
  app: appReducer,
});

let enhancer;
if (process.env.NODE_ENV === 'development') {
  enhancer = compose(
    applyMiddleware(thunkMiddleware),
    ReduxDevTools.instrument(),
  );
} else {
  enhancer = compose(applyMiddleware(thunkMiddleware));
}

const store: any = createStore(rootReducer, {}, enhancer);

export { store };
