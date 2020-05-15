import React, { Component } from 'react'
import '../css/caissier.css'

import CommandeCourranteComponent from '../component/commande-courrante-component'
import CaissierComponent from '../component/caissier-component'
import FiltreComponent from '../component/filtre-component'

const PATH_API = 'http://69.159.182.204:9876/isserver/'

const URL_PRODUITS = PATH_API + 'products'
const URL_CATEGORIES = PATH_API + 'categories'
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

function GET_TOTAL (total, value, index, array) {
    const totalProduit = value.quantity_pannier * value.price

    total = total + totalProduit
    return total
}

function returneIdProducts (acumulador, value, index, array) {
    acumulador = acumulador + 'idProducts=' + value.id + '&'

    return acumulador
}

function returneQuantities (acumulador, value, index, array) {
    acumulador = acumulador + 'quantities=' + value.quantity_pannier + '&'

    return acumulador
}

class CaissierContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            produits: null,
            produitsImgs: [],
            qtyTest: 0,
            generalProduit: [],
            test: null,
            categories: [],
            categorie: 1,
            produitsCategorie: null,
            creationCategory: 1,
            ajouterProduit: true,
            nameProduitCreation: '',
            quantiteCreation: '',
            priceCreation: '',
            descriptionCreation: '',
            perishable: 'true',
            pannierCourrante: [],
            totalCourrante: 0
        }
        // y this.carousel = this.carousel.bind(this)
        this.ajouterImages = this.ajouterImages.bind(this)
        this.getCategorie = this.getCategorie.bind(this)
        this.ajouterPannier = this.ajouterPannier.bind(this)
        this.modifPannier = this.modifPannier.bind(this)
        this.reduitPannier = this.reduitPannier.bind(this)
        this.envoierCommande = this.envoierCommande.bind(this)
        this.enleverTout = this.enleverTout.bind(this)
        this.annulerCommande = this.annulerCommande.bind(this)
    }

    componentDidMount () {
        // console.log("FormContainer componentDidMount()") // eslint-disable-line

        fetch(URL_PRODUITS)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ produits: response })
                    const x = this.state.qtyTest + 1
                    this.setState({ qtyTest: x })
                }
            })

        fetch(URL_IMGS_PRODUITS)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ produitsImgs: response })
                }
            })

        fetch(URL_CATEGORIES)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ categories: response })
                }
            })

        fetch(PATH_API + 'products')
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response !== []) {
                    const responseReduce = response.reduce(this.ajouterImages, [])
                    this.setState({ produitsCategorie: responseReduce })
                }
            })
    }

    componentWillUnmount () {

        // console.log("FormContainer componentWillUnmount()") // eslint-disable-line
        // <NavBarComponent liens={LIENS} />
    }

    ajouterImages (acumulador, value, index, array) {
        const c = this.state.produitsImgs !== null ? this.state.produitsImgs.filter(word => word.idProduct === value.id) : null

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

    getCategorie (event) {
        this.props.setCategorie(event.target.value)
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

    ajouterPannier (event) {
        console.log(event.target.id)

        fetch(URL_PRODUITS + '?id=' + event.target.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    const cest = this.modifPannier('plus', response, this.state.pannierCourrante)
                    this.setState({ pannierCourrante: cest })

                    const total = this.state.pannierCourrante.reduce(GET_TOTAL, 0)

                    this.setState({ totalCourrante: total })
                }
            })
    }

    reduitPannier (event) {
        fetch(URL_PRODUITS + '?id=' + event.target.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    const cest = this.modifPannier('moin', response, this.state.pannierCourrante)
                    this.setState({ pannierCourrante: cest })
                    const total = this.state.pannierCourrante.reduce(GET_TOTAL, 0)

                    this.setState({ totalCourrante: total })
                }
            })
    }

    enleverTout (event) {
        fetch(URL_PRODUITS + '?id=' + event.target.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    const cest = this.modifPannier('effacer', response, this.state.pannierCourrante)
                    this.setState({ pannierCourrante: cest })
                    const total = this.state.pannierCourrante.reduce(GET_TOTAL, 0)

                    this.setState({ totalCourrante: total })
                }
            })
    }

    envoierCommande () {
        const testId = this.state.pannierCourrante.reduce(returneIdProducts, '')
        const testQuantities = this.state.pannierCourrante.reduce(returneQuantities, '')
        // + this.props.userCourrante.token
        const valuesConnexion = testId + testQuantities + 'globalPrice=' + this.state.totalCourrante + '&' + 'token' + '=' + this.props.userCourrante.token
        fetch(PATH_API + 'sales', {
            method: 'POST',
            body: valuesConnexion,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                this.props.returnePageGeneral('Caissier')
                this.setState({ totalCourrante: 0 })
                this.setState({ pannierCourrante: [] })
            })
    }

    annulerCommande () {
        this.setState({ totalCourrante: 0 })
        this.setState({ pannierCourrante: [] })
    }

    render () {
        const creationProduits = this.props.allProduits !== null ? this.props.allProduits.reduce(this.ajouterImages, []) : null

        return (
            <div>
                <h3 className='title'>CAISSIER</h3>
                <div className='caisser-container-container'>

                    <div className='caissier-container'>
                        {this.state.ajouterProduit !== false ? <FiltreComponent className='filtre-component' categories={this.state.categories} getCategorie={this.getCategorie} /> : ''}

                        {creationProduits !== null ? <CaissierComponent produits={creationProduits} ajouterPannier={this.ajouterPannier} /> : ''}
                    </div>

                    <div className='caissier-div'>
                        {this.state.pannierCourrante !== null ? <CommandeCourranteComponent annulerCommande={this.annulerCommande} enleverTout={this.enleverTout} envoierCommande={this.envoierCommande} total={this.state.totalCourrante} pannierCourrante={this.state.pannierCourrante} reduitPannier={this.reduitPannier} /> : ''}

                    </div>
                </div>
            </div>
        )
    }
}

export default CaissierContainer
