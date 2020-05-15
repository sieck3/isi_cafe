import React, { Component } from 'react'
import '../css/comptes-container.css'
import CompteComponent from '../component/compte-component'
import PenalitesComponent from '../component/penalites-component'
import ModifierPrivilegieComponent from '../component/modifier-privilegie-component'

const PATH_API = 'http://69.159.182.204:9876/isserver/'

class ComptesContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            comptes: [],
            menu: 1,
            penalites: null,
            userName: null,
            idPriv: null

        }
        // y this.carousel = this.carousel.bind(this)
        this.penaliser = this.penaliser.bind(this)
        this.handleChangeMenu = this.handleChangeMenu.bind(this)
        this.anulerPenalite = this.anulerPenalite.bind(this)
        this.effacerCopte = this.effacerCopte.bind(this)
        this.handleGetType = this.handleGetType.bind(this)
        this.handleModifPrivilegie = this.handleModifPrivilegie.bind(this)
    }

    componentDidMount () {
        // console.log("FormContainer componentDidMount()") // eslint-disable-line

        const user = this.props.userCourrante
        // http://69.159.182.204:9876/isserver/users?token=DCBE787D0DD9C498CBD2A98A5DF9E978

        if (user !== null) {
            const valuesConnexion = '?' + 'token=' + user.token
            fetch(PATH_API + 'users' + valuesConnexion, {})
                .then(response => response.json())
                .then(response => {
                    this.setState({ comptes: response })
                })
        }
    }

    componentWillUnmount () {

        // console.log("FormContainer componentWillUnmount()") // eslint-disable-line
        // <NavBarComponent liens={LIENS} />
    }

    penaliser (event) {
        const valuesConnexion = 'userby=' + this.props.userCourrante.user.userName + '&userto=' + event.target.id + '&token=' + this.props.userCourrante.token

        fetch(PATH_API + 'penalties', {
            method: 'POST',
            body: valuesConnexion,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => { console.log(response) })
    }

    anulerPenalite (event) {
        // const valuesConnexion = 'userby=' + this.props.userCourrante.user.userName + '&userto=' + event.target.id + '&token=' + this.props.userCourrante.token
        const valuesConnexion = { id: event.target.id, token: this.props.userCourrante.token }

        fetch(PATH_API + 'penalties', {
            method: 'DELETE',
            body: JSON.stringify(valuesConnexion),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(response => {
                // this.setState({ menu: 1 })
                fetch(PATH_API + 'penalties?token=' + this.props.userCourrante.token)
                    .then(response => response.json())
                    .then(response => {
                        this.setState({ penalites: response })
                    })
            })
    }

    handleGetType (event) {
        this.setState({ idPriv: event.target.value })
    }

    handleChangeMenu (event) {
        if (event.target.id === '1') {
            this.setState({ menu: 1 })
        }

        if (event.target.id === '2') {
            this.setState({ menu: 2 })

            fetch(PATH_API + 'penalties?token=' + this.props.userCourrante.token)
                .then(response => response.json())
                .then(response => {
                    this.setState({ penalites: response })
                })
        }

        if (event.target.id === '3') {
            const userName = event.target.value
            this.setState({ userName: userName })
            this.setState({ menu: 3 })
        }
    }

    effacerCopte (event) {
        const username = event.target.id

        const requete = { userName: username, token: this.props.userCourrante.token }
        fetch(PATH_API + 'users', {
            method: 'DELETE', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(requete), // Coordinate the body type with 'Content-Type'
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(response => {
                const user = this.props.userCourrante
                // http://69.159.182.204:9876/isserver/users?token=DCBE787D0DD9C498CBD2A98A5DF9E978

                if (user !== null) {
                    const valuesConnexion = '?' + 'token=' + user.token
                    fetch(PATH_API + 'users' + valuesConnexion, {})
                        .then(response => response.json())
                        .then(response => {
                            this.setState({ comptes: response })
                        })
                }
            })
    }

    handleModifPrivilegie () {
        const response = { userName: this.state.userName, idPrivilege: this.state.idPriv, token: this.props.userCourrante.token }
        // "idPrivilege":3,"token":"185E5BD510E3B0DEB5EE5D9378DF245C"}

        console.log('resultado final', response)
        fetch(PATH_API + 'users', {
            method: 'PUT',
            body: JSON.stringify(response),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(response => {
                const user = this.props.userCourrante
                // http://69.159.182.204:9876/isserver/users?token=DCBE787D0DD9C498CBD2A98A5DF9E978

                const valuesConnexion = '?' + 'token=' + user.token
                fetch(PATH_API + 'users' + valuesConnexion, {})
                    .then(response => response.json())
                    .then(response => {
                        this.setState({ comptes: response })
                        this.setState({ menu: 1 })
                    })
            }
            )
    }

    render () {
        const priv = this.props.userCourrante.user.idPrivilege
        return (
            <div className='comptes-container'>
                <h2>COMPTES</h2>
                {<div className='change-page-comptes'><button id='1' onClick={this.handleChangeMenu} style={this.state.menu === 1 ? { color: 'white' } : { color: 'black' }}>Comptes</button> <button id='2' onClick={this.handleChangeMenu} style={this.state.menu === 2 ? { color: 'white' } : { color: 'black' }}>Liste de penalites</button> </div>}
                {this.state.menu === 1 ? <CompteComponent idPrivilege={priv} users={this.state.comptes} penaliser={this.penaliser} effacer={this.effacerCopte} onModifierCompte={this.handleChangeMenu} /> : ''}
                {this.state.menu === 2 && this.state.penalites !== null ? <PenalitesComponent anulerPenalite={this.anulerPenalite} penalites={this.state.penalites} /> : ''}
                {this.state.menu === 3 ? <ModifierPrivilegieComponent onHandleGetType={this.handleGetType} onHandleChangeMenu={this.handleChangeMenu} userName={this.state.userName} onHandleModifPrivilegie={this.handleModifPrivilegie} /> : ''}
            </div>
        )
    }
}

export default ComptesContainer
