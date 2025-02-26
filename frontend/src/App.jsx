import {BrowserRouter as Router,Routes, Route} from 'react-router'
import Layout from "./components/templates/Layout"
import Home from './pages/Home'
import Contact from './pages/Contact'
import Compte from './pages/Compte'
import Panier from './pages/Panier'
import APropos from './pages/APropos'
import Categories from './pages/Categories'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

function App() {
  return (  

   
    
    
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<Home />} />
      <Route path='/categories' element={<Categories />}/>
      <Route path='/a-propos' element={<APropos />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='/compte' element={<Compte />} />
      <Route path='/panier' element={<Panier />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
      
    
   
  )
}

export default App;
