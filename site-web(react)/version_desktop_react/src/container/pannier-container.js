import React, { Component } from 'react'

import '../css/pannier-container.css'
import '../css/temp-component.css'

import PannierComponent from '../component/pannier-component'
import TempComponent from '../component/temp-component'

const PATH_API = 'http://69.159.182.204:9876/isserver/'

const URL_PRODUITS = PATH_API + 'products'
const URL_IMGS_PRODUITS = PATH_API + 'productspictures'

function prixTotalParCommande (total, value, index, array) {
    const l = (value.price * value.quantity_pannier)
    total = total + l
    return total
}

function returneIdProducts (acumulador, value, index, array) {
    acumulador = acumulador + '&idProducts=' + value.id

    return acumulador
}

function returneQuantities (acumulador, value, index, array) {
    acumulador = acumulador + '&quantities=' + value.quantity_pannier

    return acumulador
}

const URL_GET_USER = 'http://localhost:8080/session'

class PannierContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {

            allProduits: null,
            jourCourant: 2,
            heureCourant: '08:00',
            comptePenalise: false
        }

        this.augmenterPannierProduit = this.augmenterPannierProduit.bind(this)
        this.reduitPannierProduit = this.reduitPannierProduit.bind(this)
        this.ajouterImages = this.ajouterImages.bind(this)
        this.effacerPannierProduit = this.effacerPannierProduit.bind(this)
        this.envoierPannier = this.envoierPannier.bind(this)
        this.viderPannier = this.viderPannier.bind(this)
        this.getJour = this.getJour.bind(this)
        this.getHeure = this.getHeure.bind(this)
    }

    componentDidMount () {
        // console.log("FormContainer componentDidMount()") // eslint-disable-line
        fetch(URL_IMGS_PRODUITS)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ allProduits: response })
                }
            })
    }

    componentWillUnmount () {
        // console.log("FormContainer componentWillUnmount()") // eslint-disable-line
        // <NavBarComponent liens={LIENS} />
        // comment
    }

    augmenterPannierProduit (event) {
        // http://70.53.207.187:9876/isserver/products?id=1
        // this.props.setPannier()

        fetch(URL_PRODUITS + '?id=' + event.target.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.props.setPannier(response, 'plus')
                }
            })
    }

    reduitPannierProduit (event) {
        fetch(URL_PRODUITS + '?id=' + event.target.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.props.setPannier(response, 'moin')
                }
            })
    }

    effacerPannierProduit (event) {
        fetch(URL_PRODUITS + '?id=' + event.target.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.props.setPannier(response, 'effacer')
                }
            })
    }

    ajouterImages (acumulador, value, index, array) {
        const c = this.state.allProduits !== null ? this.state.allProduits.filter(word => word.idProduct === value.id) : null

        const item = {
            id: value.id,
            name: value.name,
            idCategory: value.idCategory,
            quantity_pannier: value.quantity_pannier,
            price: value.price,
            images: c
        }

        acumulador.push(item)

        return acumulador
    }

    // console.log(envoierPannier(session))

    envoierPannier () {
        fetch(URL_GET_USER)
            .then(response => response.json())
            .then(response => {
                if (response.user === null) {
                    this.props.returnePageGeneral('Connexion')
                }
                const session = response
                const userName = session.user.user.userName
                const product = session.pannier
                const currentDatetime = new Date()
                // const heures = (currentDatetime.getHours() < 10 ? '0' + currentDatetime.getHours() : currentDatetime.getHours())
                // const minutes = (currentDatetime.getMinutes() < 10 ? '0' + currentDatetime.getMinutes() : currentDatetime.getMinutes())
                const seconds = (currentDatetime.getSeconds() < 10 ? '0' + currentDatetime.getSeconds() : currentDatetime.getSeconds())
                // const formattedDate = currentDatetime.getFullYear() + '-' + (currentDatetime.getMonth() + 1) + '-' + currentDatetime.getDate() + '%20' + '19:00:00'
                const jours = currentDatetime.getDate()
                const jourInt = parseInt(this.state.jourCourant)
                const stringHeures = this.state.heureCourant.toString()

                const formattedDate = currentDatetime.getFullYear() + '-' + (currentDatetime.getMonth() + 1) + '-' + ((jours + jourInt) < 10 ? '0' + (jours + jourInt) : (jours + jourInt)) + ' ' + stringHeures + ':' + '00'

                const idProducts = product.reduce(returneIdProducts, '')
                const quantities = product.reduce(returneQuantities, '')
                const token = session.user.token
                const valuesConnexion = 'username=' + userName + '&' + 'pickup=' + formattedDate + '&token=' + token + idProducts + quantities

                fetch(PATH_API + 'orders', {
                    method: 'POST',
                    body: valuesConnexion,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
                }).then(response => response.json())
                    .then(response => {
                        if (response === false) {
                            this.setState({ comptePenalise: true })
                        } else {
                            this.setState({ comptePenalise: false })
                            this.props.setPannier('vider')
                            this.props.returnePageGeneral('Produits')
                        }
                    })
            })
    }

    viderPannier () {
        this.props.setPannier('vider')
    }

    getJour (event) {
        this.setState({ jourCourant: event.target.value })
    }

    getHeure (event) {
        this.setState({ heureCourant: event.target.value })
    }

    render () {
        const prixTotal = this.props.pannier !== null ? this.props.pannier.reduce(prixTotalParCommande, 0) : null

        const creationPanniers = this.props.pannier !== null ? this.props.pannier.reduce(this.ajouterImages, []) : null

        return (
            <div className='pannier-container'>
                <h2>PANNIER</h2>
                {this.props.pannier !== null && this.props.pannier.length > 0 ? <TempComponent getJour={this.getJour} getHeure={this.getHeure} /> : ''}
                {this.state.comptePenalise === true ? <div className='compte-bloque'><label>Compte bloque</label></div> : ''}
                {this.props.pannier !== null && this.props.pannier.length > 0 ? <PannierComponent viderPannier={this.viderPannier} envoierPannier={this.envoierPannier} prixTotal={prixTotal} pannier={creationPanniers} augmenterPannierProduit={this.augmenterPannierProduit} reduitPannierProduit={this.reduitPannierProduit} effacerPannierProduit={this.effacerPannierProduit} /> : <h2>Pannier vide</h2>}

            </div>
        )
    }
}

export default PannierContainer
