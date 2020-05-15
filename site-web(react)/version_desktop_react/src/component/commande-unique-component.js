import React from 'react'

const CommandeUniqueComponent = ({ commandes, totalPrix, productsQtyName }) => (
    <div className='commande-component-unique'>

        <div className='commande-info'><div><label>Identifiant</label></div><div><label>Commande effectue</label></div><div><label>Date a passer</label></div><div><label>Estatus pay/pennalice</label></div><div><label>Produits achetes</label></div><div><label>Price total</label></div></div>
        {commandes.map((commande, index) => <div className='commande' key={index}><div><label>{commande.id}</label></div><div><label>{commande.creationDate}</label></div><div><label>{commande.pickUpDate}</label></div><div><label>{commande.paymentDate !== undefined ? commande.paymentDate : 'pas ancore defini'}</label></div><div className='products'>{productsQtyName[index].map((l, index) => <div key={index}><p>{l.name}</p>{'qty: ' + l.qty}<p /><p>{' price total: ' + l.total}</p></div>)}</div><div> <label className='price'>{totalPrix[index]}$</label></div></div>)}

    </div>
)

export default CommandeUniqueComponent

// productsQtyName[0].map((l,index) => <label key={index}>{l.name}</label>
// {commande.products.map((produit, index) => <label key={index}>{produit.name + ':' + 'cesar'}</label>)}
