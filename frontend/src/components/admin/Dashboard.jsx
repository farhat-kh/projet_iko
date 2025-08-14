import { useEffect, useState, useContext } from 'react';import api from '../../utils/services/AxiosInstance';
import { AuthContext } from '../../utils/context/AuthContext';
import Users from './Users';
import Produits from './Produits';
import Orders from './Orders';
import Messages from './Messages';
import Sidebar from './Sidebar';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faUser,
  faShoppingCart,
  faEuroSign,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { auth } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalVentes: 0,
    nbCommandes: 0,
    nbUsers: 0,
    nbProduits: 0,
    latestCommandes: []
  });

  const fetchDashboardData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${auth?.token}`
      };

      const [usersRes, produitsRes, commandesRes] = await Promise.all([
        api.get('/user/all', { headers }),
        api.get('/produit', { headers }),
        api.get('/commande', { headers })
      ]);

      const totalVentes = commandesRes.data.reduce(
        (acc, c) => acc + (c.total || 0),
        0
      );

      const latestCommandes = commandesRes.data
        .slice(0, 5)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setStats({
        totalVentes,
        nbCommandes: commandesRes.data.length,
        nbUsers: usersRes.data.length,
        nbProduits: produitsRes.data.length,
        latestCommandes
      });
    } catch (error) {
      console.error('Erreur chargement stats dashboard :', error);
    }
  };

  useEffect(() => {
    if (auth?.token && activeTab === 'dashboard') {
      fetchDashboardData();
    }
  }, [auth, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2>Tableau de bord Administrateur</h2>
            <div className="dashboard-stats">
              <div className="stat-card">
                <FontAwesomeIcon icon={faEuroSign} />
                <span> Ventes : {stats.totalVentes} €</span>
              </div>
              <div className="stat-card">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span> Commandes : {stats.nbCommandes}</span>
              </div>
              <div className="stat-card">
                <FontAwesomeIcon icon={faUser} />
                <span> Utilisateurs : {stats.nbUsers}</span>
              </div>
              <div className="stat-card">
                <FontAwesomeIcon icon={faBox} />
                <span> Produits : {stats.nbProduits}</span>
              </div>
            </div>

            <div className="dashboard-tables">
              <h4>Dernières commandes</h4>
              <ul className="last-orders">
                {stats.latestCommandes.map((c) => (
                  <li key={c._id}>
                    #{c._id.slice(-5).toUpperCase()} – {c.userId?.nom || 'Client'} : {c.total} € – {new Date(c.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'users':
        return <Users />;
      case 'produits':
        return <Produits />;
      case 'orders':
        return <Orders />;
      case 'messages':
        return <Messages />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <button className="burger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FontAwesomeIcon icon={faBars} />

      </button>
      <Sidebar 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      isOpen={isSidebarOpen}
      setIsOpen={setIsSidebarOpen}
       />
      <main className="admin-main">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
