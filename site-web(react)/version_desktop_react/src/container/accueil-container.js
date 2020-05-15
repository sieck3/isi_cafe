import React, { Component } from 'react'
import '../css/accueil.css'

import CarrouselComponent from '../component/carrousel-component'
const PATH_API = 'http://69.159.182.204:9876/isserver/'

const URL_IMGS_PRODUITS = PATH_API + 'productspictures'

class AccueilContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {

            produitsImgs: null
        }
        // y this.carousel = this.carousel.bind(this)
        this.handleChangerPage = this.handleChangerPage.bind(this)
    }

    componentDidMount () {
        // console.log("FormContainer componentDidMount()") // eslint-disable-line

        fetch(URL_IMGS_PRODUITS)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ produitsImgs: response })
                }
            })
    }

    componentWillUnmount () {

        // console.log("FormContainer componentWillUnmount()") // eslint-disable-line
        // <NavBarComponent liens={LIENS} />
    }

    handleChangerPage () {
        console.log('test')
        this.props.returnePageGeneral('Produits')
    }

    render () {
        const imgs = this.state.produitsImgs !== null ? this.state.produitsImgs : ''
        const user = this.props.userCourrante !== null ? this.props.userCourrante.user : ''

        return (

            <div className='accueil-container'>
                <h1>Bienvenue  {user.firstName} </h1>

                <div className='su-title'><label>Découvrez nos produits</label></div>
                {this.state.produitsImgs !== null ? <CarrouselComponent onChangePage={this.handleChangerPage} images={imgs} /> : ''}
            </div>
        )
    }
}

export default AccueilContainer
