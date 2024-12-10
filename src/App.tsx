import './assets/css/input.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageMap from './pages/layouts/PageMap'
import Page404 from './pages/layouts/Page404'

function App() {

  return (
    <>
      <BrowserRouter>
      {/* The rest of your app goes here */}
      <Routes>
        <Route path='/' element={<PageMap />} />
        <Route path='/*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
