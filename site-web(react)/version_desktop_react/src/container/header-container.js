import React, { Component } from 'react'
import NavBarComponent from 'component/navbar-component.js'
import '../css/header.css'

// li pour navbar

// recuperer user
const URL_GET_USER = 'http://localhost:8080/session'

function qtyTotal (acumulador, value, iterator, array) {
    acumulador = value.quantity_pannier + acumulador

    return acumulador
}

class HeaderContanier extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userSession: null

        }

        this.getUser = this.getUser.bind(this)
    }

    componentDidMount () {
        // console.log("FormContainer componentDidMount()") // eslint-disable-line
        fetch(URL_GET_USER)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ userSession: response })
                }
            })
    }

    componentWillUnmount () {
        // console.log("FormContainer componentWillUnmount()") // eslint-disable-line
        // <NavBarComponent liens={LIENS} />

    }

    getUser () {
        fetch(URL_GET_USER)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    this.setState({ userSession: response })
                }
                // this.setState({ produits: response })
            })
    }

    render () {
        const totalQty = this.props.pannier !== null ? this.props.pannier.reduce(qtyTotal, 0) : ''

        return (
            <div className='app-contanier-header'>
                <div className='logo'>
                    <img src='/img/logo.png' alt='logo isi' />
                </div>
                <NavBarComponent liens={this.props.liens} returnePage={this.props.returnePage} totalQty={totalQty} />
            </div>
        )
    }
}

export default HeaderContanier
