import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import BoardReducer from './reducers/BoardReducer';
import ColumnReducer from './reducers/ColumnReducer';
import TaskReducer from './reducers/TaskReducer';

const rootReducer = combineReducers({
  BoardReducer,
  ColumnReducer,
  TaskReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
