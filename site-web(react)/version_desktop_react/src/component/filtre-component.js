import React from 'react'

const FiltreComponent = ({ categories, getCategorie }) => (

    <div className='filtre-component'>
        <h3>filtrer</h3>
        <select onChange={getCategorie}>
            <option value={0}>tous les produits</option>
            {categories.map((categorie, index) => <option key={index} value={categorie.id}>{categorie.name}</option>)}
        </select>

    </div>
)

export default FiltreComponent
