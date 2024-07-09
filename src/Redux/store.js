// import { configureStore } from "@reduxjs/toolkit";
// import { cryptoApi } from "./services/CryptoApi";

// export const store =   configureStore({
//     reducer:{
//         [cryptoApi.reducerPath]: cryptoApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(cryptoApi.middleware),
// })

import { configureStore } from "@reduxjs/toolkit";

import  cryptSlice  from "./Reducer/ApiCall";

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root', 
    storage, 
  };

  const persistedReducer = persistReducer(persistConfig, cryptSlice);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);
