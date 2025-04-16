import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducers from 'Reducers';
import { persistReducer, persistStore } from 'redux-persist';

const middleware: any = [];

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducers);
const configStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
          getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
          }).concat([...middleware]),
      });

      const persistor = persistStore(store);
      return { store, persistor };
};

const {store} = configStore();

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { configStore, store, useAppDispatch, useAppSelector };
export type { AppDispatch, RootState };
