import "./dashboard.css";



const Sidebar = ({ activeTab, setActiveTab }) => {
    return (

       <aside className="sidebar">
      <h2 className="sidebar-title">Dashboard Admin</h2>

      <nav className="sidebar-section">
        
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          Tableau de bord
        </button>
      </nav>

      <nav className="sidebar-section">
        
        <button
          className={activeTab === 'produits' ? 'active' : ''}
          onClick={() => setActiveTab('produits')}
        >
          Produits
        </button>
      </nav>

      <nav className="sidebar-section">
        
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Commandes
        </button>
      </nav>

      <nav className="sidebar-section">
        
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Utilisateurs
        </button>
      </nav>

      <nav className="sidebar-section">
        
        <button
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </nav>
    </aside>
    )
}

export default Sidebar;