import { Routes, Route } from "react-router";
import Layout from "./components/templates/Layout";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/pageAuth/Login";
import Register from "./pages/pageAuth/Register";
import MonCompte from "./components/moncompte/MonCompte";
import MotDePasseOublie from "./pages/MotDePasseOublie";
import ConfirmationEmail from "./pages/ConfirmationEmail";
import ResetPassword from "./pages/ResetPassword";
import Panier from "./pages/Panier";
import Commande from "./pages/Commande";
import ConfirmationCommande from "./pages/ConfirmationCommande";
import APropos from "./pages/APropos";
import Categories from "./pages/Categories";
import CategoriePage from "./pages/CategoriePage";
import ProduitDetail from "./pages/ProduitDetail";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Routes protégées
import PrivateRouter from "./utils/helpers/PrivateRouter";
import PublicRouter from "./utils/helpers/PublicRouter";

function App() {
  return (
    <Routes>
      {/* Layout général */}
      <Route path="/" element={<Layout />}>
        {/* Pages accessibles à tous */}
        <Route index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categorie/:nom" element={<CategoriePage />} />
        <Route path="/produit/:id" element={<ProduitDetail />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Routes publiques  */}
        <Route element={<PublicRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
          <Route path="/panier" element={<Panier />} />

          <Route path="/commande" element={<Commande />} />
          <Route path="/confirmation-commande" element={<ConfirmationCommande />} />
          <Route path="/forgot-password" element={<MotDePasseOublie />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/confirmation-email" element={<ConfirmationEmail />} />

        {/* Routes privées (auth requise) */}
        <Route element={<PrivateRouter />}>
         <Route path="/mon-compte" element={<MonCompte />} />
        </Route>
      </Route>

      {/* Page 404 */}
      <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
    </Routes>
  );
}

export default App;
