import React from 'react'

/* const retproduit = function (unProduit, key, imgProduits, returneProduits, getProduit, setPannierProduit) {
    return <div key={key} className='produit-item'> <img id={unProduit.id} onClick={getProduit} src={returneProduits(imgProduits, unProduit.id) ? returneProduits(imgProduits, unProduit.id).shift().path : ''} alt='un-produit' /> <h3 id={unProduit.id} onClick={getProduit}>{unProduit.name}</h3><p id={unProduit.id} onClick={getProduit}>prix:&nbsp;{unProduit.price}$</p><div className='btn-augmentation'><button id={unProduit.id} onClick={setPannierProduit}> Ajouter au pannier</button></div></div>
}
*/

const constructorComponent = function (unProduit, key, getProduit, setPannierProduit) {
    return <div key={key} className='produit-item'><img id={unProduit.id} onClick={getProduit} src={unProduit.images[0] !== undefined ? unProduit.images[0].path : 'img/test.jpg'} alt='un-produit' /><h3 id={unProduit.id} onClick={getProduit}>{unProduit.name}</h3><p id={unProduit.id} onClick={getProduit}>prix:&nbsp;{unProduit.price}$</p><div className='btn-augmentation'><button id={unProduit.id} onClick={setPannierProduit}> Ajouter au pannier</button></div>  </div>
}

const ProduitComponent = ({
    produits,
    getProduit,
    setPannierProduit,
    categories,
    getCategorie,
    getCategorieCreation,
    ajouterProduit,
    userPrivilege
}) => (

    <div className='produits-component'>

        {produits.map((unProduit, index) => constructorComponent(unProduit, index, getProduit, setPannierProduit))}
        {userPrivilege !== null && userPrivilege !== 1 ? <div className='produit-item'><img src='img/newitem.jpg' alt='un produit' /><div className='btn-augmentation'><button onClick={ajouterProduit}> Ajouter un nouveau produit</button></div></div> : ''}

    </div>

)

export default ProduitComponent
