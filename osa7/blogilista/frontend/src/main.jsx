import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import Store from './store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
      <App />
    </Provider>
  )

/*ReactDOM.createRoot(document.getElementById('root')).render(<App />)*/
