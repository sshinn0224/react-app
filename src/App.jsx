import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import MainPage from './pages/MainPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage></MainPage>}
        ></Route>
        <Route
          path="/pokemon/:id"
          element={<DetailPage></DetailPage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
