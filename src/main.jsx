import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'      
import { store } from './store'

import { TamaguiProvider } from 'tamagui'
import { config as tamaguiConfig } from '../tamagui.config'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>                 
      <TamaguiProvider config={tamaguiConfig}>
        <App />
      </TamaguiProvider>
    </Provider>
  </React.StrictMode>
)
