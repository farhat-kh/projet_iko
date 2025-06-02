import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import AXIOS_INSTANCE from "../utils/services/AxiosInstance";
import { useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";

const PayPalButton = ({ total, onSuccess, livraisonData, panierData }) => {
    const { isPending } = usePayPalScriptReducer();
    const { auth } = useContext(AuthContext);
    const numericTotal = Number(total);
    

    const handlePayement = async (details) => {
        try {
            if(!livraisonData.nom || !livraisonData.email || !livraisonData.adresse || !livraisonData.ville || !livraisonData.codePostal) {
                alert("Veuillez remplir toutes les informations de livraison avant de passer commande.");
                return;
            }
            const response = await AXIOS_INSTANCE.post("/commande", {
                userId: auth.user._id,
                produits: panierData.map((item) => ({
                    produitId: item._id,
                    quantite: item.quantity,
                    prixUnitaire: item.prix,
                })),
                adresseLivraison: `${livraisonData.adresse}, ${livraisonData.ville}, ${livraisonData.codePostal}`,
                total: numericTotal.toFixed(2),
                moyenPaiement: "paypal",
                paiementEffectue: true,
                status: "validée",
            });
            onSuccess(response.data);
        } catch (error) {
            console.error("Erreur lors de la création de la commande", error);
            alert("Une erreur s'est produite lors de la création de la commande.");
            
        }
    }

    return (
        <>
        {isPending && <p>Chargement de PayPal...</p>}
        <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
            return actions.order.create({
            purchase_units: [{
                amount: {
                    value: numericTotal.toFixed(2),
                    currency_code: "EUR",
                },
                }],
            });
        }}
        onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
            handlePayement(details);
            });
        }}
        onError={(err) => {
            console.error("Erreur de paiement PayPal", err);
            alert("Une erreur s'est produite lors du paiement PayPal.");
        }}
        />
        </>
    )
}

export default PayPalButton