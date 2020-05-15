import React from 'react'
const AjouterProduitComponent = ({ getPerishable, getDescriptionCreation, getPriceCreation, getQuantiteCreation, getNameProduitCreation, getCategorieCreation, categories, ajouterProduit, envoierProduit }) => (
    <div className='ajouter-produit-component'>
        <form onSubmit={envoierProduit}>
            <div>
                <label>choisir name :&nbsp;</label>
                <input type='text' onChange={getNameProduitCreation} />
            </div>

            <div>
                <label> Category :&nbsp;</label>
                <select onChange={getCategorieCreation} required>
                    {categories.map((categorie, index) => <option key={index} value={categorie.id}>{categorie.name}</option>)}
                </select>
            </div>

            <div>
                <label>Quantite :&nbsp;</label>
                <input type='number' onChange={getQuantiteCreation} required />
            </div>

            <div>
                <label>Price :&nbsp; </label>
                <input type='text' onChange={getPriceCreation} required />
            </div>

            <div className='description-text-area'>
                <label>Description :&nbsp;</label>
                <textarea rows='3' cols='20' onChange={getDescriptionCreation} required />
            </div>

            <div>
                <label>perishable :&nbsp; </label>
                <select onChange={getPerishable} required>
                    <option value='true'>oui</option>
                    <option value='false'>non</option>
                </select>
            </div>
            <button onClick={ajouterProduit}>return</button>
            <button type='submit'>envoier</button>

        </form>

    </div>
)

export default AjouterProduitComponent
