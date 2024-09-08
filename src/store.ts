// import React from 'react'; 
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/auth-slice';
import profileReducer from './features/profile/profile-slice';
import themaReducer from './features/thema/thema-slice';
import folderReducer from './features/folders/folders-slice';


// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};


// Create persisted reducers
const persistedReducerAuth = persistReducer(persistConfig, authReducer);
const persistedReducerUser = persistReducer(persistConfig, profileReducer);
const persistedReducerThema = persistReducer(persistConfig, themaReducer);
const persistedReducerFolders = persistReducer(persistConfig, folderReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducerAuth,
    profile: persistedReducerUser,
    thema: persistedReducerThema,
    folders: persistedReducerFolders
  },

  middleware: (getDefaultMiddleware: any) => // eslint-disable-line
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
