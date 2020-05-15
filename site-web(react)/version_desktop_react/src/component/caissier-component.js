import React from 'react'
const createProduit = function (unProduit, index, ajouterPannier) {
    return <div key={index} className='caissier-item'><img id={unProduit.id} src={unProduit.images[0] !== undefined ? unProduit.images[0].path : 'img/test.jpg'} alt='un-produit' /><h3>{unProduit.name}</h3><div className='buttons'><button className='btn-plus' id={unProduit.id} onClick={ajouterPannier}>+</button></div></div>
}

const CaissierComponent = ({ produits, ajouterPannier }) => (
    <div className='caissier-component'>
        {produits.map((produit, index) => createProduit(produit, index, ajouterPannier))}
    </div>
)

export default CaissierComponent
