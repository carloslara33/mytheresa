import '@babel/polyfill'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ScreensRoot from 'routes/ScreensRoot.jsx'
import { Header } from 'components'
import { StoreProvider } from '../store'

function App() {
  return (
    <StoreProvider>
      <Router>
        <Header></Header>
        <div className='container'>
          <ScreensRoot></ScreensRoot>
        </div>
      </Router>
    </StoreProvider>
  )
}
export default App
