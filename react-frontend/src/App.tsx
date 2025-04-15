import './App.css'
import ListCartItem from './components/ListCartItem'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  function getNavigationHtml() {
    return(
      <nav>
        <div>
          <ul>
            <li>
              <Link to={"/list-cart"}>Cart</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
  return(
    <BrowserRouter>
      {getNavigationHtml()}
      <h2>Cart</h2>
      <Routes>
        <Route path="/list-cart" element={<ListCartItem />} />
        <Route path="/" element={<ListCartItem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
