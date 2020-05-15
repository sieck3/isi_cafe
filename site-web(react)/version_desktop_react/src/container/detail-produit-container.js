import React, { Component } from 'react'
import '../css/detail-produit.css'
import '../css/ajouter-images-produit.css'

import DetailProduitComponent from '../component/detail-produit-component'
import AjouterImagesComponent from '../component/ajouter-images-produit'

const PATH_API = 'http://69.159.182.204:9876/isserver'

const URL_IMG_PRODUITS = PATH_API + '/productspictures'
const URL_PRODUITS = PATH_API + '/products'
const URL_PRODUITS_PICTURES = PATH_API + '/productspictures'

class DetailProduitContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            imgCourrante: 0,
            imgPath: '',
            path: '',
            ajouterComponent: false

        }

        this.handleRadioFunction = this.handleRadioFunction.bind(this)
        this.radios = this.radios.bind(this)
        this.setPannierProduit = this.setPannierProduit.bind(this)
        this.getPath = this.getPath.bind(this)
        this.ajouterImage = this.ajouterImage.bind(this)
        this.envoierImage = this.envoierImage.bind(this)
    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    setPannierProduit (event) {
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

    handleRadioFunction (event) {
        this.setState({ imgCourrante: event.target.id })
    }

    radios (images) {
        // <input type='radio' id='0' className='radio' name='rate' value='0 ' defaultChecked />

        return <div id='radio-img' className='radio-container' onChange={this.handleRadioFunction}>{images.map((img, index) => <input key={index} type='radio' id={index} className='radio' name='rate' />)}</div>
    }

    envoierImage (event) {
        event.preventDefault()

        //  productpicture = { "idProduct": 1, "path": "https://daddysandwiches.files.wordpress.com/2013/07/jambonfromage.jpg" } & token=0614C6D18985DD74DEB9A41815CB4530

        const newProduct = {

            idProduct: this.props.produitCourrante.id,
            path: this.state.path

        }

        const resultForm = 'productpicture=' + JSON.stringify(newProduct) + '&token=' + this.props.userCourrante.token

        fetch(URL_PRODUITS_PICTURES, {
            method: 'POST',
            body: resultForm,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        }).then(response => response.json())
            .then(response => {
                console.log(response)

                this.props.returnePageGeneral('Produits')
            })
    }

    ajouterImage () {
        if (this.state.ajouterComponent === false) {
            this.setState({ ajouterComponent: true })
        } else {
            this.setState({ ajouterComponent: false })
        }
    }

    getPath (event) {
        this.setState({ path: event.target.value })
    }

    //    <p>{this.props.produitCourrante.name}</p>
    // userPrivilege={this.props.userCourrante}
    render () {
        const idPrivilege = this.props.userCourrante !== null ? this.props.userCourrante.user.idPrivilege : null
        return (
            <div className='detail-produit'>
                <h2>{this.props.produitCourrante.name}</h2>
                {this.state.ajouterComponent !== false ? <AjouterImagesComponent envoierImage={this.envoierImage} ajouterImage={this.ajouterImage} getPath={this.getPath} /> : <DetailProduitComponent userPrivilege={idPrivilege} ajouterImage={this.ajouterImage} getPath={this.getPath} setPannierProduit={this.setPannierProduit} radioFunction={this.radioFunction} unProduit={this.props.produitCourrante} imgCourrante={this.state.imgCourrante} radios={this.radios} imgProduitCourrante={this.props.imgProduitCourrante} />}

            </div>
        )
    }
}

export default DetailProduitContainer
