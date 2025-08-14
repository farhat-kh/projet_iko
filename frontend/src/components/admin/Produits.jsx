import { useEffect, useState, useContext } from "react";
import api from '../../utils/services/AxiosInstance'
import { AuthContext } from "../../utils/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faBoxOpen,
  faPenToSquare,
  faFloppyDisk,
  faXmark,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import "./produits.css"; // Assuming you have a CSS file for styling

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduit, setNewProduit] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: "",
    imageUrl: "",
    categorie: "",
  });

  const [produitEnEdition, setProduitEnEdition] = useState(null);
  const [formModif, setFormModif] = useState(null);
  const { auth } = useContext(AuthContext);

  const fetchProduits = async () => {
    try {
      const { data } = await api.get("/produit", {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setProduits(data);
    } catch (error) {
      console.error("Erreur récupération :", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categorie", {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setCategories(data);
    } catch (error) {
      console.error("Erreur récupération catégories :", error);
    }
  };

  const addProduit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/produit", newProduit, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setProduits((prev) => [...prev, data]);
      setNewProduit({
        nom: "",
        description: "",
        prix: "",
        quantite: "",
        imageUrl: "",
        categorie: "",
      });
    } catch (error) {
      console.error("Erreur ajout produit :", error);
    }
  };

  const deleteProduit = async (id) => {
    try {
      await api.delete(`/produit/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setProduits((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Erreur suppression produit :", error);
    }
  };

  const augmenterStock = async (produit) => {
    try {
      const updated = { ...produit, quantite: produit.quantite + 1 };
      await api.put(`/produit/${produit._id}`, updated, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      fetchProduits();
    } catch (error) {
      console.error("Erreur stock :", error);
    }
  };

  const toggleVisibilite = async (produit) => {
    try {
      const updated = { ...produit, isVisible: !produit.isVisible };
      await api.put(`/produit/${produit._id}`, updated, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      fetchProduits();
    } catch (error) {
      console.error("Erreur visibilité :", error);
    }
  };

  const commencerModification = (produit) => {
    setProduitEnEdition(produit._id);
    setFormModif({ ...produit });
  };

  const enregistrerModification = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/produit/${formModif._id}`, formModif, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setProduitEnEdition(null);
      fetchProduits();
    } catch (error) {
      console.error("Erreur modification produit :", error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchProduits();
    fetchCategories();
  }, [auth]);

  return (
    <div className="produits-container">
      <h2>Gestion des Produits</h2>

      <form onSubmit={addProduit} className="produit-form">
        <input placeholder="Nom" value={newProduit.nom} onChange={e => setNewProduit(prev => ({ ...prev, nom: e.target.value }))} required />
        <input placeholder="Description" value={newProduit.description} onChange={e => setNewProduit(prev => ({ ...prev, description: e.target.value }))} required />
        <input type="number" placeholder="Prix" value={newProduit.prix} onChange={e => setNewProduit(prev => ({ ...prev, prix: e.target.value }))} required />
        <input type="number" placeholder="Quantité" value={newProduit.quantite} onChange={e => setNewProduit(prev => ({ ...prev, quantite: e.target.value }))} required />
        <input placeholder="Image URL" value={newProduit.imageUrl} onChange={e => setNewProduit(prev => ({ ...prev, imageUrl: e.target.value }))} />
        <select value={newProduit.categorie} onChange={e => setNewProduit(prev => ({ ...prev, categorie: e.target.value }))} required>
          <option value="">Sélectionner une catégorie</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} /> Ajouter
        </button>
      </form>

      <table className="produits-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Catégorie</th>
            <th>Visible</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((p) =>
            produitEnEdition === p._id ? (
              <tr key={p._id}>
                <td><input value={formModif.nom} onChange={e => setFormModif(prev => ({ ...prev, nom: e.target.value }))} /></td>
                <td><input type="number" value={formModif.prix} onChange={e => setFormModif(prev => ({ ...prev, prix: e.target.value }))} /></td>
                <td><input type="number" value={formModif.quantite} onChange={e => setFormModif(prev => ({ ...prev, quantite: e.target.value }))} /></td>
                <td>
                  <select value={formModif.categorie} onChange={e => setFormModif(prev => ({ ...prev, categorie: e.target.value }))}>
                    <option value="">-- Sélectionner --</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </td>
                <td>{formModif.isVisible ? "✔️" : "❌"}</td>
                <td>
                  <button onClick={enregistrerModification} title="Enregistrer">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                  <button onClick={() => setProduitEnEdition(null)} title="Annuler">
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={p._id}>
                <td>{p.nom}</td>
                <td>{p.prix} €</td>
                <td style={{ color: p.quantite <= 1 ? "red" : "inherit" }}>{p.quantite}</td>
                <td>{p.categorie?.name || "—"}</td>
                <td>
                  <FontAwesomeIcon
                    icon={p.isVisible ? faEye : faEyeSlash}
                    color={p.isVisible ? "green" : "gray"}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleVisibilite(p)}
                    title="Changer visibilité"
                  />
                </td>
                <td>
                  <button onClick={() => augmenterStock(p)} title="Ajouter stock">
                    <FontAwesomeIcon icon={faBoxOpen} />
                  </button>
                  <button onClick={() => deleteProduit(p._id)} title="Supprimer">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button onClick={() => commencerModification(p)} title="Modifier">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Produits;
