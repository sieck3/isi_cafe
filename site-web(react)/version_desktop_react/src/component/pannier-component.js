import React from 'react'

const construction = function (article, identifie, augmenterPannierProduit, reduitPannierProduit, prixTotal, effacerPannierProduit) {
    return <div key={identifie} className='article-pannier-component'> <div className='article-container'> <img src={article.images !== null ? article.images[0].path : 'n'} alt='img' /><label className='prix-unitaire'>prix unitaire : {article.price}$</label><h5>{article.name}</h5> <button id={article.id} onClick={reduitPannierProduit}>-</button> <label>{article.quantity_pannier}</label><button id={article.id} onClick={augmenterPannierProduit}>+</button><label>prix total :&nbsp;{article.quantity_pannier * article.price}$</label><button className='btn-effacer' id={article.id} onClick={effacerPannierProduit}>effacer</button></div><hr className='line-division' /></div>
}

const PannierComponent = ({ pannier, augmenterPannierProduit, reduitPannierProduit, prixTotal, effacerPannierProduit, envoierPannier, viderPannier }) => (
    <div>
        {pannier.map((article, index) => construction(article, index, augmenterPannierProduit, reduitPannierProduit, prixTotal, effacerPannierProduit))}
        <div className='results'> <button className='btn-effacer' onClick={viderPannier}>Vider le pannier</button><h3>Montant total : {prixTotal}$</h3><button className='btn-passer-commande' onClick={envoierPannier}>Passer commande</button></div>
    </div>
)

export default PannierComponent
