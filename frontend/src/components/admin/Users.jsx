import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../utils/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSlash,
  faUserCheck,
  faTrash,
  faUserShield,
  faUser,
  faCircleCheck,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import "./users.css"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/user/all", {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      setUsers(data);
    } catch (error) {
      console.error("Erreur récupération utilisateurs :", error);
    }
  };

  const desactiverUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/user/delete/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true,
      });
      fetchUsers();
    } catch (error) {
      console.error("Erreur désactivation utilisateur :", error);
    }
  };

  const activerUser = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/user/update/${id}`,
        { isActive: true },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
          withCredentials: true,
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Erreur réactivation utilisateur :", error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchUsers();
  }, [auth]);

  return (
    <div className="users-container">
      <h2>Gestion des utilisateurs</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Vérifié</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.nom} {u.prenom}</td>
              <td>{u.email}</td>
              <td>
                <FontAwesomeIcon
                  icon={u.role === "admin" || u.role === "superadmin" ? faUserShield : faUser}
                  style={{ marginRight: "0.4rem" }}
                />
                {u.role}
              </td>
              <td style={{ color: u.isActive ? "green" : "red" }}>
                {u.isActive ? "Actif" : "Désactivé"}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={u.isVerified ? faCircleCheck : faCircleXmark}
                  color={u.isVerified ? "green" : "gray"}
                  title={u.isVerified ? "Email vérifié" : "Non vérifié"}
                />
              </td>
              <td>
                {u.isActive ? (
                  <button
                    onClick={() => desactiverUser(u._id)}
                    title="Désactiver"
                  >
                    <FontAwesomeIcon icon={faUserSlash} />
                  </button>
                ) : (
                  <button
                    onClick={() => activerUser(u._id)}
                    title="Réactiver"
                  >
                    <FontAwesomeIcon icon={faUserCheck} />
                  </button>
                )}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
