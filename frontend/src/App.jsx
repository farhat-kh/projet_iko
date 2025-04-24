import { Routes, Route} from 'react-router'
import Layout from "./components/templates/Layout"
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/pageAuth/Login'
import Register from './pages/pageAuth/Register'
import Panier from './pages/Panier'
import APropos from './pages/APropos'
import Categories from './pages/Categories'
import CategoriePage from "./pages/CategoriePage";
import ProduitDetail  from './pages/ProduitDetail'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'



// services 
// import PrivateRouer from './utils/helpers/PrivateRouter'
import PublicRouter from './utils/helpers/PublicRouter'

function App() {
  return (  

   
    
    
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='/categories' element={<Categories />}/>
        <Route path="/categorie/:nom" element={<CategoriePage />} />
        <Route path="/produit/:id" element={<ProduitDetail />} />
        {/*route public*/}
        <Route element={<PublicRouter />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        </Route> {/*fin route public*/}
        </Route>
      <Route path='/panier' element={<Panier />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
      
    
   
  )
}

export default App;
