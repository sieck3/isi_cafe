import React from 'react'

const DetailProduitComponent = ({ userPrivilege, ajouterImage, radioFunction, imgCourrante, radios, imgProduitCourrante, unProduit, setPannierProduit }) => (

    <div className='detail-component'>
        <div className='img-container'>
            <img src={imgProduitCourrante !== null ? Object.values(imgProduitCourrante)[imgCourrante].path : 'img/test.jpg'} alt='test' />
            {imgProduitCourrante !== null ? radios(imgProduitCourrante) : ''}
            <label>prix: {unProduit.price}$</label>
            {userPrivilege !== null && userPrivilege !== 1 ? <button onClick={ajouterImage} className='ajouter-image'>ajouter image</button> : ''}
        </div>

        <div className='description'>
            <div className='description-interne'> <h5>Description</h5>
                <p>{unProduit.description !== undefined ? unProduit.description : 'aucune descripition'}</p>
            </div>
            <div className='btn-ajouter'><label>Quantite disponible: {unProduit.quantity === -1 ? 'ilimite' : unProduit.quantity}</label><button id={unProduit.id} onClick={setPannierProduit}>ajouter ou pannier</button></div>
        </div>
    </div>
)

export default DetailProduitComponent
