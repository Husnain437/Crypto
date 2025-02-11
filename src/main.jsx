import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css';
import { store,persistor  } from './Redux/store.js'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <BrowserRouter>
      
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
    </BrowserRouter>
</Provider>
)
