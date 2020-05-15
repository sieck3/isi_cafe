import React from 'react'

const AjouterImagesComponent = ({ ajouterImage, getPath, envoierImage }) => (
    <div className='ajouter-images-produit'>

        <form onSubmit={envoierImage}>
            <div>
                <label>path :&nbsp;</label>
                <input type='text' onChange={getPath} />
            </div>
            <button type='submit'>envoier</button>
        </form>
        <button onClick={ajouterImage}>returne</button>
    </div>
)

export default AjouterImagesComponent

// productsQtyName[0].map((l,index) => <label key={index}>{l.name}</label>
// {commande.products.map((produit, index) => <label key={index}>{produit.name + ':' + 'cesar'}</label>)}
