import { useContext, useState } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./dashboard.css";




const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };

    
    return (
    
       <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
    
        <h2 className="sidebar-title">Dashboard Admin</h2>

        {['dashboard', 'produits', 'orders', 'users', 'messages'].map((tab) => (
          <nav className="sidebar-section" key={tab}>
            <button
              className={activeTab === tab ? 'active' : ''}
              onClick={() => {
                setActiveTab(tab);
                setIsOpen(false);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </nav>
        ))}

        <div className="sidebar-logout">
          <button className="btn-logout" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </aside>

    )
}

export default Sidebar;