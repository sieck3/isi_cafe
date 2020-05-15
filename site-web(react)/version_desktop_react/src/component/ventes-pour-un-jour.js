import React from 'react'

const VentesPourUnJour = ({ commandes, totalPrix, productsQtyName }) => (
    <div className='commande-component-unique'>
        <div className='commande-info'><div><label>Identifiant</label></div><div><label>Date</label></div><div><label>Produits achetes</label></div><div><label>Prix total</label></div></div>
        {commandes.map((commande, index) => <div className='commande' key={index}><div><label>{commande.id}</label></div><div><label>{commande.saleDate}</label></div><div className='products'>{productsQtyName[index].map((l, index) => <div key={index}><p>{l.name}</p>{'qty: ' + l.qty}<p /><p>{' price total: ' + l.total}</p></div>)}</div><div> <label className='price'>{totalPrix[index]}$</label></div></div>)}

    </div>
)

export default VentesPourUnJour

// productsQtyName[0].map((l,index) => <label key={index}>{l.name}</label>
// {commande.products.map((produit, index) => <label key={index}>{produit.name + ':' + 'cesar'}</label>)}
