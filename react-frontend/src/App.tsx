import './App.css'
import ListCartItem from './features/cart/component/ListCartItem'
import LoginSimulation from './components/LoginSimulation'
import CheckoutPage from './features/stripe/components/StripeCheckoutPage'
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
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
  return(
    <BrowserRouter>
      {getNavigationHtml()}
      <h2>My Cart</h2>
      <Routes>
        <Route path={"/login"} element={<LoginSimulation />} />
        <Route path="/list-cart" element={<ListCartItem />} />
        <Route path="/" element={<ListCartItem />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
