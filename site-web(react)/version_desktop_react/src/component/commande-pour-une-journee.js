import React from 'react'

const CommandePourUneJournee = ({ commandes, totalPrix, productsQtyName, setPayee, setPenalise }) => (
    <div className='commande-component-unique'>
        <div className='commande-info'><div><label>Penaliser</label></div><div><label>Identifiant</label></div><div><label>nom utilisateur</label></div><div><label>Commande effectue</label></div><div><label>Date a passer</label></div><div><label>Produits achetes</label></div><div><label>Prix total</label></div><div><label>Paye</label></div></div>
        {commandes.map((commande, index) => <div className='commande' key={index}><div> <button className='penaliser' id={commande.id} onClick={setPenalise}>penaliser</button></div><div><label>{commande.id}</label></div><div><label>{commande.username}</label></div><div><label>{commande.creationDate}</label></div><div><label>{commande.pickUpDate}</label></div><div className='products'>{productsQtyName[index].map((l, index) => <div key={index}><p>{l.name}</p>{'qty: ' + l.qty}<p /><p>{' price total: ' + l.total}</p></div>)}</div><div> <label className='price'>{totalPrix[index]}$</label></div><div> <button className='paye' id={commande.id} onClick={setPayee}>payee</button></div></div>)}

    </div>
)

export default CommandePourUneJournee

// productsQtyName[0].map((l,index) => <label key={index}>{l.name}</label>
// {commande.products.map((produit, index) => <label key={index}>{produit.name + ':' + 'cesar'}</label>)}
