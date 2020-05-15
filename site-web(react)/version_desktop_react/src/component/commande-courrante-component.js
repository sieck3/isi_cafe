import React from 'react'

const CommandeCourranteComponent = ({ pannierCourrante, total, reduitPannier, envoierCommande, enleverTout, annulerCommande }) => (
    <div className='commande-courrante-component'>
        <h4>commande courrante</h4>
        <div className='produit-container-header'><label>reduit</label><label>nom</label><label>price</label><label>quantite</label><label>remove</label></div>
        {pannierCourrante.map((produit, index) => <div key={index} className='produit-container-courrante'><button className='btn-diminuer' id={produit.id} onClick={reduitPannier}>-</button><label>{produit.name}</label><label>{produit.price * produit.quantity_pannier}$</label><label>{produit.quantity_pannier}</label><button className='btn-reduit' id={produit.id} onClick={enleverTout}>Enlever tout</button></div>)}
        <div className='produit-container-header'><label>Total: {total}$</label></div>
        <div className='envoier-effacer-container'><button className='btn-annuler' onClick={annulerCommande}>annuler vente</button> <button onClick={envoierCommande} className='btn-envoier'>envoier</button></div>

    </div>
)

export default CommandeCourranteComponent
