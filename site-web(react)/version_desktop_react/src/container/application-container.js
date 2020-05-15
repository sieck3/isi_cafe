import React, { Component } from 'react'

import HeaderContanier from 'container/header-container'
import ComptesContainer from 'container/comptes-container'
import PannierContainer from 'container/pannier-container'
import AccueilContainer from 'container/accueil-container'
import ConnexionContainer from 'container/connexion-container'
import InscriptionContainer from 'container/inscription-container'
import ProduitsContainer from 'container/produits-container'
import ReinitialisationMotDePasseContainer from './reinitialisation-mot-de-passe-container'
import ProfilContainer from './profil-container'
import DetailProduitContainer from './detail-produit-container'
import CommandesContainer from './commandes-container'
import CaissierContainer from './caissier-container'

// recuperer user
const URL_GET_USER = 'http://localhost:8080/session'
const PATH_API = 'http://69.159.182.204:9876/isserver/'

const URL_IMGS_PRODUITS = PATH_API + 'productspictures'

function REVISAR (total, value, index, array) {
    if (total.id === array[index].id) {
        total = true
    }
    return total
}

function AUGMENTE (total, value, index, array) {
    if (total.id === array[index].id) {
        array[index].quantity_pannier++
    }

    return total
}

function MOIN (total, value, index, array) {
    if (total.id === array[index].id) {
        array[index].quantity_pannier--
    }

    return total
}

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

class ApplicationContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            pageCourrante: 'Accueil',
            userSession: null,
            pannier: [],
            idPrivilege: 1,
            liens: null,
            produitCourrante: null,
            imgProduitCourrante: null,
            qtyProduit: 0,
            allProduits: [],
            userCompte: null
        }

        this.returnePage = this.returnePage.bind(this)
        this.returnePageGeneral = this.returnePageGeneral.bind(this)
        this.setPannier = this.setPannier.bind(this)
        this.setNavBar = this.setNavBar.bind(this)
        this.setProduitCourrante = this.setProduitCourrante.bind(this)
        this.setCompte = this.setCompte.bind(this)
        this.setPannierSession = this.setPannierSession.bind(this)
        this.modifPannier = this.modifPannier.bind(this)
        this.setCategorie = this.setCategorie.bind(this)
        this.setQty = this.setQty.bind(this)
        this.setSession = this.setSession.bind(this)
    }

    componentDidMount () {
        fetch(URL_GET_USER)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ userSession: response.user })
                    this.setState({ pannier: response.pannier !== undefined ? response.pannier : [] })

                    if (response.user !== null) {
                        if (response.user.user.idPrivilege === 1) {
                            const LIENS = [
                                {

                                    label: 'Accueil',
                                    lien: 'Accueil'
                                }, {
                                    label: 'Produits',
                                    lien: 'Produits'
                                }, {

                                    label: response.user.user.firstName !== '' ? response.user.user.firstName : 'user',
                                    lien: 'Profil'

                                }, {
                                    label: 'Commandes',
                                    lien: 'Commandes'
                                }, {
                                    label: 'Pannier',
                                    lien: 'Pannier'
                                }
                            ]
                            this.setNavBar(LIENS)
                        }

                        if (response.user.user.idPrivilege === 2) {
                            const LIENS = [

                                {

                                    label: 'Accueil',
                                    lien: 'Accueil'
                                },
                                {
                                    label: 'Caissier',
                                    lien: 'Caissier'
                                },
                                {
                                    label: 'Produits',
                                    lien: 'Produits'
                                }, {

                                    label: response.user.user.firstName !== '' ? response.user.user.firstName : 'user',
                                    lien: 'Profil'

                                }, {
                                    label: 'Comptes',
                                    lien: 'Comptes'
                                },
                                {
                                    label: 'Commandes',
                                    lien: 'Commandes'
                                }, {
                                    label: 'Pannier',
                                    lien: 'Pannier'
                                }
                            ]
                            this.setNavBar(LIENS)
                        }

                        if (response.user.user.idPrivilege === 3) {
                            const LIENS = [

                                {

                                    label: 'Accueil',
                                    lien: 'Accueil'
                                },
                                {
                                    label: 'Caissier',
                                    lien: 'Caissier'
                                }, {
                                    label: 'Produits',
                                    lien: 'Produits'
                                }, {

                                    label: response.user.user.firstName !== '' ? response.user.user.firstName : 'user',
                                    lien: 'Profil'

                                }, {
                                    label: 'Comptes',
                                    lien: 'Comptes'
                                },
                                {
                                    label: 'Commandes',
                                    lien: 'Commandes'
                                }, {
                                    label: 'Pannier',
                                    lien: 'Pannier'
                                }
                            ]
                            this.setNavBar(LIENS)
                        }
                    } else {
                        this.setNavBar(LIENS_DEFAULT)
                    }
                } else {
                    this.setNavBar(LIENS_DEFAULT)
                }
            })

        this.setCategorie('0')
    }

    setCompte (user) {
        this.setState({ userCompte: user })
    }

    modifPannier (option, item, array) {
        if (array.length === 0) {
            const xes = {
                id: item.id,
                name: item.name,
                idCategory: item.idCategory,
                quantity_pannier: 1,
                price: item.price
            }

            array.push(xes)
        } else {
            const exist = array.reduce(REVISAR, item) === true

            if (exist) {
                if (option === 'plus') {
                    array.reduce(AUGMENTE, item)
                }

                if (option === 'moin') {
                    array.reduce(MOIN, item)

                    array = array.filter(produit => produit.quantity_pannier > 0)
                }

                if (option === 'effacer') {
                    array = array.filter(produit => produit.id !== item.id)
                }
            } else {
                if (option === 'plus') {
                    const xes = {
                        id: item.id,
                        name: item.name,
                        idCategory: item.idCategory,
                        quantity_pannier: 1,
                        price: item.price
                    }
                    array.push(xes)
                }
            }
        }

        return array
    }

    setPannier (unProduit, option) {
        const jsonPannier = this.modifPannier(option, unProduit, this.state.pannier)

        if (unProduit === 'vider') {
            this.setState({ pannier: [] })
        } else {
            this.setState({ pannier: jsonPannier })
        }

        this.setPannierSession()
    }

    setPannierSession () {
        const urlConnexionSaveSession = 'http://localhost:8080/startsession'
        fetch(URL_GET_USER)
            .then(response => response.body.locked !== true ? response.json() : null)
            .then(response => {
                if (response !== null) {
                    response = { user: response.user !== undefined ? response.user : null, pannier: this.state.pannier }
                    fetch(urlConnexionSaveSession, {
                        method: 'POST',
                        body: JSON.stringify({
                            json: response
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                } else {
                    response = { user: null, pannier: this.state.pannier }

                    fetch(urlConnexionSaveSession, {
                        method: 'POST',
                        body: JSON.stringify({
                            json: response
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                }
            })
    }

    setProduitCourrante (unProduit) {
        this.setState({ produitCourrante: unProduit })

        fetch(URL_IMGS_PRODUITS + '?idProduct=' + this.state.produitCourrante.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null && response.length > 0) {
                    this.setState({ imgProduitCourrante: response })
                }
            })
    }

    returnePage (event) {
        const x = event.target.id
        if (x !== '') {
            this.setState({ pageCourrante: event.target.id })
        }
        fetch(URL_GET_USER)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ userSession: response.user })
                }
            })
    }

    returnePageGeneral (x) {
        if (x.localeCompare('') !== 0) {
            this.setState({ pageCourrante: x })
        }
        fetch(URL_GET_USER)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ userSession: response.user })
                }
            })
    }

    setNavBar (newLiens) {
        this.setState({ liens: newLiens })
    }

    setCategorie (idCategory) {
        if (idCategory === '0') {
            fetch(PATH_API + 'products')
                .then(response => response.json())
                .then(response => {
                    this.setState({ allProduits: response })
                })
        } else {
            fetch(PATH_API + 'products' + '?idCategory=' + idCategory)
                .then(response => response.json())
                .then(response => {
                    this.setState({ allProduits: response })
                })
        }
    }

    setQty (qty) {
        this.setState({ qtyProduit: qty })
    }

    setSession () {
        this.setState({ userSession: null })
    }

    // gerir les pages
    pageCourrante () {
        let pageChoissi = null

        switch (this.state.pageCourrante) {
        case 'Caissier':
            pageChoissi = <CaissierContainer returnePageGeneral={this.returnePageGeneral} userCourrante={this.state.userSession} allProduits={this.state.allProduits !== null ? this.state.allProduits : ''} returnePage={this.returnePage} setCategorie={this.setCategorie} />
            break
        case 'Accueil':
            pageChoissi = <AccueilContainer userCourrante={this.state.userSession} returnePageGeneral={this.returnePageGeneral} />
            break
        case 'Produits':
            pageChoissi = <ProduitsContainer allProduits={this.state.allProduits !== null ? this.state.allProduits : ''} setProduitCourrante={this.setProduitCourrante} setPannier={this.setPannier} pannier={this.pannier} returnePageGeneral={this.returnePageGeneral} setCategorie={this.setCategorie} userCourrante={this.state.userSession} />
            break
        case 'Connexion':
            pageChoissi = <ConnexionContainer pannier={this.state.pannier} returnePage={this.returnePage} returnePageGeneral={this.returnePageGeneral} setNavBar={this.setNavBar} />
            break
        case 'Inscription':
            pageChoissi = <InscriptionContainer returnePage={this.returnePage} returnePageGeneral={this.returnePageGeneral} />
            break
        case 'DetailProduit':
            pageChoissi = <DetailProduitContainer returnePageGeneral={this.returnePageGeneral} userCourrante={this.state.userSession} imgProduitCourrante={this.state.imgProduitCourrante} produitCourrante={this.state.produitCourrante} setPannier={this.setPannier} />
            break
        case 'ResetMotDePasse':
            pageChoissi = <ReinitialisationMotDePasseContainer setSession={this.setSession} returnePage={this.returnePage} returnePageGeneral={this.returnePageGeneral} />
            break
        case 'Pannier':
            pageChoissi = <PannierContainer pannier={this.state.pannier} setPannier={this.setPannier} returnePageGeneral={this.returnePageGeneral} />
            break
        case 'Profil':
            pageChoissi = <ProfilContainer setNavBar={this.setNavBar} setCompte={this.setCompte} userCourrante={this.state.userSession} returnePageGeneral={this.returnePageGeneral} setPannier={this.setPannier} />
            break
        case 'Commandes':
            pageChoissi = <CommandesContainer userCourrante={this.state.userSession} />
            break
        case 'Comptes':
            pageChoissi = <ComptesContainer userCourrante={this.state.userSession} />
            break
        default:
        }

        return pageChoissi
    }

    render () {
        return (
            <div className='app-contanier'>
                <HeaderContanier returnePage={this.returnePage} liens={this.state.liens} pannier={this.state.pannier} setQty={this.setQty} />
                <div className='app-contanier-body'>
                    {this.pageCourrante()}
                </div>
            </div>
        )
    }
}

export default ApplicationContainer
