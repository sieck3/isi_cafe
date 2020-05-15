import React from 'react'
const LIENS_DEFAULT = [
    {

        label: 'Accueil',
        lien: 'Accueil'
    }, {
        label: 'Produits',
        lien: 'Produits'
    }, {

        label: 'Connexion',
        lien: 'Connexion'

    }, {
        label: 'Pannier',
        lien: 'Pannier'
    }
]

function navbarDefault (x, returnePage, totalQty) {
    return x.map(
        (li, index) => (<li key={index}><a href='#' id={li.lien} onClick={returnePage}>{li.label === 'Pannier' ? <div className='pannier-quantite'><img src='img/shopping-cart.svg' alt='Pannier' id={li.label} /><label>{totalQty}</label></div> : li.label}</a></li>)

    )
}

const NavBarComponent = ({ liens, returnePage, totalQty }) => (

    <div className='liens-container'>
        <ul className='ul-navbar-container'>
            {liens === null ? navbarDefault(LIENS_DEFAULT, returnePage, totalQty) : liens.map((li, index) => (<li key={index} name={liens.lien}><a href='#' id={li.lien} onClick={returnePage}>{li.label === 'Pannier' ? <div className='pannier-quantite'><img src='img/shopping-cart.svg' alt='Pannier' id={li.label} /><label>{totalQty}</label></div> : li.label}</a></li>))}
        </ul>

    </div>
)

export default NavBarComponent
