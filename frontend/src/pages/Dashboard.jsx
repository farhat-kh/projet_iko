import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import "../styles/global.css";
import { Link } from "react-router";

const Dashboard = () => {
  const [produits, setProduits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nom: "",
    prix: "",
    image: null,
  });

  // Récupérer les produits depuis le backend
  useEffect(() => {
    fetch("http://localhost:8000/api/produits")
      .then((response) => response.json())
      .then((data) => setProduits(data))
      .catch((error) => console.error("Erreur lors de la récupération des produits :", error));
  }, []);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  // Gérer l'ajout d'un produit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", newProduct.nom);
    formData.append("prix", newProduct.prix);
    formData.append("image", newProduct.image);

    try {
      const response = await fetch("http://localhost:8000/api/produits", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout du produit");

      const data = await response.json();
      setProduits([...produits, data]);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Barre latérale */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/admin/produits">Produits</Link></li>
            <li><Link to="/admin/utilisateurs">Utilisateurs</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="dashboard-content">
        <header>
          <h1>Tableau de Bord</h1>
        </header>

        {/* Section Produits */}
        <section className="produits-section">
          <h2>Liste des Produits</h2>
          <button className="add-product-btn" onClick={() => {
    console.log("Bouton cliqué !");
    setShowForm(!showForm);
}}>
  {showForm ? "Annuler" : "Ajouter un Produit"}
</button>


          {showForm && (
            <form className="add-product-form" onSubmit={handleSubmit}>
              <input type="text" name="nom" placeholder="Nom du produit" onChange={handleChange} required />
              <input type="number" name="prix" placeholder="Prix" onChange={handleChange} required />
              <input type="file" name="image" accept="image/*" onChange={handleChange} required />
              <button type="submit">Ajouter</button>
            </form>
          )}

          <div className="product-list">
            {produits.length > 0 ? (
              produits.map((produit) => (
                <div key={produit._id} className="product-card">
                  <img src={`http://localhost:8000${produit.image}`} alt={produit.nom} className="product-image" />
                  <h3>{produit.nom}</h3>
                  <p>Prix : {produit.prix}€</p>
                  <button className="delete-btn">Supprimer</button>
                </div>
              ))
            ) : (
              <p>Aucun produit trouvé.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
