// import "../styles/inscription.css";
// import "../styles/global.css";
// import Navbar from "../components/templates/Navbar";
// import Footer from "../components/templates/Footer";
// import { useState } from "react";

// const Inscription = () => {

//     const [user, setUser] = useState({
//       civilite: "",
//       nom: "",
//       prenom: "",
//       dateNaissance: "",
//       telephone: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     })

//     const [check, setCheck] = useState(false);
//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setUser(prevUser => ({
//         ...prevUser,
//         [name]: value
//       }));
//     }
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (user.email.length >= 7 && user.password.length >= 8) {
//         setCheck(true);
//         setError("");
//       } else {
//         setCheck(false);
//         setError("Veuillez remplir tous les champs");
//       }
//     }
//   return (
//     <div>
//       <Navbar />
//       <div className="inscription-container">
//         <h1>Créer votre compte</h1>
//         <p className="obligatoire">*Champs obligatoires</p>
//         <form className="inscription-form" onSubmit={handleSubmit}>
//           <div className="civilite">
//             <label>Civilité* :</label>
//             <input type="radio" id="monsieur"  name="civilite" value="Monsieur" onChange={handleChange}  />
//             <label htmlFor="monsieur">Monsieur</label>
//             <input type="radio" id="madame" name="civilite" value="Madame" onChange={handleChange} />
//             <label htmlFor="madame">Madame</label>
//           </div>
//           <input type="text" placeholder="Nom*" onChange={handleChange} required />
//           <input type="text" placeholder="Prénom*" onChange={handleChange} required />
//           <input type="date" placeholder="Date de naissance (JJ/MM/AAAA)*" onChange={handleChange} required />
//           <input type="tel" placeholder="Téléphone" onChange={handleChange} />
//           <input type="email" placeholder="Adresse e-mail*" onChange={handleChange} required />
//           <input type="password" placeholder="Mot de passe*" onChange={handleChange} required />
//           <input type="password" placeholder="Confirmer le mot de passe*" onChange={handleChange} required />
//           <button type="submit" className="btn-custom">VALIDER</button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Inscription;
