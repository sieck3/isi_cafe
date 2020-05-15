import React, { Component } from 'react'
import ProduitComponent from '../component/produit-component'
import AjouterProduitComponent from '../component/ajouter-produit-component'

import FiltreComponent from '../component/filtre-component'
import '../css/produits-container.css'
import '../css/filtre-component.css'
import '../css/ajouter-produit-component.css'

const PATH_API = 'http://69.159.182.204:9876/isserver/'

const URL_PRODUITS = PATH_API + 'products'
const URL_CATEGORIES = PATH_API + 'categories'
const URL_IMGS_PRODUITS = PATH_API + 'productspictures'

class ProduitsContainer extends Component {
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
            perishable: 'true'

        }

        // this.generateProduit = this.generateProduit.bind(this)
        this.getProduit = this.getProduit.bind(this)
        this.setPannierProduit = this.setPannierProduit.bind(this)
        this.ajouterImages = this.ajouterImages.bind(this)
        this.getCategorie = this.getCategorie.bind(this)
        this.getCategorieCreation = this.getCategorieCreation.bind(this)
        this.ajouterProduit = this.ajouterProduit.bind(this)
        this.envoierProduit = this.envoierProduit.bind(this)
        this.getNameProduitCreation = this.getNameProduitCreation.bind(this)
        this.getQuantiteCreation = this.getQuantiteCreation.bind(this)
        this.getPriceCreation = this.getPriceCreation.bind(this)
        this.getDescriptionCreation = this.getDescriptionCreation.bind(this)
        this.getPerishable = this.getPerishable.bind(this)
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
                if (response !== []) {
                    const responseReduce = response.reduce(this.ajouterImages, [])
                    this.setState({ produitsCategorie: responseReduce })
                }
            })
    }

    componentWillUnmount () {
        // console.log("FormContainer componentWillUnmount()") // eslint-disable-line

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

    getProduit (event) {
        fetch(URL_PRODUITS + '?id=' + event.target.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.props.setProduitCourrante(response)
                    this.props.returnePageGeneral('DetailProduit')
                }
            })
    }

    setPannierProduit (event) {
        fetch(URL_PRODUITS + '?id=' + event.target.id)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.props.setPannier(response, 'plus')
                }
            })
    }

    getCategorie (event) {
        this.props.setCategorie(event.target.value)
    }

    getCategorieCreation (event) {
        this.setState({ creationCategory: event.target.value })
        //  this.props.setCategorie(event.target.value)
    }

    ajouterProduit () {
        if (this.state.ajouterProduit === false) {
            this.setState({ ajouterProduit: true })
        } else {
            this.setState({ ajouterProduit: false })
        }
    }

    envoierProduit (event) {
        event.preventDefault()

        const newProduct = {

            name: this.state.nameProduitCreation,
            idCategory: this.state.creationCategory,
            quantity: this.state.quantiteCreation,
            price: this.state.priceCreation,
            description: this.state.descriptionCreation,
            perishable: this.state.perishable

        }
        const resultForm = 'product=' + JSON.stringify(newProduct) + '&token=' + this.props.userCourrante.token

        fetch(URL_PRODUITS, {
            method: 'POST',
            body: resultForm,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        }).then(response => response.json())
            .then(response => {
                this.props.returnePageGeneral('Produits')
            })
    }

    getNameProduitCreation (event) {
        this.setState({ nameProduitCreation: event.target.value })
    }

    getQuantiteCreation (event) {
        this.setState({ quantiteCreation: event.target.value })
    }

    getPriceCreation (event) {
        this.setState({ priceCreation: event.target.value })
    }

    getDescriptionCreation (event) {
        this.setState({ descriptionCreation: event.target.value })
    }

    getPerishable (event) {
        this.setState({ perishable: event.target.value })
    }

    // <AjouterProduitComponent getCategorieCreation={this.getCategorieCreation} categories={this.state.categories} />

    render () {
        const creationProduits = this.props.allProduits !== null ? this.props.allProduits.reduce(this.ajouterImages, []) : null

        const userPrivilege = this.props.userCourrante !== null ? this.props.userCourrante.user.idPrivilege : null

        return (
            <div className='produits-container'>
                {this.state.ajouterProduit !== false ? <h2>PRODUITS</h2> : <h2>AJOUTER PRODUIT</h2>}
                {this.state.ajouterProduit !== false ? <FiltreComponent className='filtre-component' categories={this.state.categories} getCategorie={this.getCategorie} /> : ''}
                {this.state.ajouterProduit !== false ? creationProduits !== null ? <ProduitComponent userPrivilege={userPrivilege} ajouterProduit={this.ajouterProduit} categories={this.state.categories} getCategorieCreation={this.getCategorieCreation} setPannierProduit={this.setPannierProduit} getProduit={this.getProduit} produits={creationProduits} /> : <p>Loading...</p> : <AjouterProduitComponent getPerishable={this.getPerishable} getDescriptionCreation={this.getDescriptionCreation} getPriceCreation={this.getPriceCreation} getQuantiteCreation={this.getQuantiteCreation} getNameProduitCreation={this.getNameProduitCreation} envoierProduit={this.envoierProduit} getCategorieCreation={this.getCategorieCreation} categories={this.state.categories} ajouterProduit={this.ajouterProduit} />}
            </div>
        )
    }
}

export default ProduitsContainer
