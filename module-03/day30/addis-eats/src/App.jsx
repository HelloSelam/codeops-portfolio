import './App.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { CartProvider } from "./context/CartContext";


function App() {

  return (
    <CartProvider>
      <Header />
      <Main />
    </CartProvider>
  );
}

export default App;