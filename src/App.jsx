
import ProductGrid from './components/ProductGrid';
import Benefit from './components/Benefit'
import HomeBanner from './components/HomeBanner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


import './custom.css'

function App() {
  return (
    <>
    <Navbar />
    <HomeBanner/>
    <Benefit />
    <ProductGrid/>
    <Footer/>
    </>
  );
}

export default App
