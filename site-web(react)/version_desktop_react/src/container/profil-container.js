/* eslint-disable react/jsx-handler-names */
import React, { Component } from 'react'
import '../css/profil.css'
import '../css/delete-compte.css'

import ProfilComponent from '../component/profil-component'
import DeleteComponent from '../component/delete-component'

const PATH_API = 'http://69.159.182.204:9876/isserver'

const urlConnexion = PATH_API + '/users'
const urlConnexionSaveSession = 'http://localhost:8080/startsession'

class ProfilContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {

            deleteCompte: false,
            passwordCourrante: null,
            passwordIncorrect: false,
            nom: null,
            prenom: null,
            minimumCharacteres: true,
            moteDePasseDiferent: true,
            ancientPassword: '',
            nouveauMotDePasse: '',
            nouveauMotDePasseDeuxieme: ''
        }

        this.fermerSession = this.fermerSession.bind(this)
        this.returnerPage = this.returnerPage.bind(this)
        this.confirmerEffacerCompte = this.confirmerEffacerCompte.bind(this)
        this.getPassword = this.getPassword.bind(this)
        this.getNom = this.getNom.bind(this)
        this.getPrenom = this.getPrenom.bind(this)
        this.modifInfo = this.modifInfo.bind(this)
        this.modifiquerMotPasse = this.modifiquerMotPasse.bind(this)
        this.getAncientPassword = this.getAncientPassword.bind(this)
        this.getNouveauMotDePasse = this.getNouveauMotDePasse.bind(this)
        this.getNouveauMotDePasseDeuxieme = this.getNouveauMotDePasseDeuxieme.bind(this)
    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    fermerSession () {
        const response = { user: null, pannier: null }
        fetch(urlConnexionSaveSession, {
            method: 'POST',
            body: JSON.stringify({
                // json: response,
                json: response
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.props.returnePageGeneral('Accueil')
                this.props.setNavBar(null)
            })
    }

    returnerPage (event) {
        if (event.target.id === 'returner') {
            this.setState({ deleteCompte: false })
        } else {
            this.setState({ deleteCompte: true })
        }
    }

    confirmerEffacerCompte () {
        const valuesConnexion = 'username=' + this.props.userCourrante.user.userName + '&pwd=' + this.state.passwordCourrante

        fetch(urlConnexion, {
            method: 'POST',
            body: valuesConnexion,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        }).then(response => response.json())
            .then(response => {
                if (response !== null) {
                    fetch(urlConnexion, {
                        method: 'DELETE', // 'GET', 'PUT', 'DELETE', etc.
                        body: JSON.stringify({ userName: this.props.userCourrante.user.userName, pwd: this.state.passwordCourrante }), // Coordinate the body type with 'Content-Type'
                        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
                        mode: 'cors'
                    })

                    const urlConnexionSaveSession = 'http://localhost:8080/startsession'

                    fetch(urlConnexionSaveSession, {
                        method: 'POST',
                        body: JSON.stringify({
                            json: null
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    }).then(response => {
                        this.setState({ passwordIncorrect: false })
                        this.props.setNavBar(null)
                        this.props.returnePageGeneral('Connexion')
                    })
                } else {
                    this.setState({ passwordIncorrect: true })
                }
            })
    }

    modifiquerMotPasse (event) {
        event.preventDefault()
        if (this.state.moteDePasseDiferent === false && this.state.nouveauMotDePasse.length > 3 && this.state.ancientPassword.length > 3) {
            //            const valuesConnexion = 'username=' + this.props.userCourrante.user.userName + '&pwd=' + this.state.passwordCourrante

            // const response = {"user":{"userName":"ctrevino"},"oldPwd":"ctrevino","newPwd":"newpassword","token":"185E5BD510E3B0DEB5EE5D9378DF245C"}
            const response = { user: { userName: this.props.userCourrante.user.userName }, oldPwd: this.state.ancientPassword, newPwd: this.state.nouveauMotDePasse, token: this.props.userCourrante.token }

            fetch(urlConnexion, {
                method: 'PUT',
                body: JSON.stringify(response),
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            })
                .then(response => response.json())
                .then(response => {
                    this.props.setPannier('vider')
                    fetch(urlConnexionSaveSession, {
                        method: 'POST',
                        body: JSON.stringify({
                            json: null
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    }).then(response => {
                        this.props.returnePageGeneral('Connexion')
                        this.props.setNavBar(null)
                    })
                })
        } else {

        }
        /*  fetch(urlConnexion, {
              method: 'PUT',
              body: JSON.stringify(''),
              headers: { 'Content-Type': 'application/json' },
              mode: 'cors'
          })
              .then(response => response.json()) */
    }

    getPassword (event) {
        this.setState({ passwordCourrante: event.target.value })
    }

    getNom (event) {
        this.setState({ nom: event.target.value })
    }

    getPrenom (event) {
        this.setState({ prenom: event.target.value })
    }

    getAncientPassword (event) {
        this.setState({ ancientPassword: event.target.value })
        const mot = event.target.value
        if (mot.length > 3) {
            this.setState({ minimumCharacteres: true })
        } else {
            this.setState({ minimumCharacteres: false })
        }
    }

    getNouveauMotDePasse (event) {
        this.setState({ nouveauMotDePasse: event.target.value })

        if (event.target.value.localeCompare(this.state.nouveauMotDePasseDeuxieme) === 0) {
            this.setState({ moteDePasseDiferent: false })
        } else {
            this.setState({ moteDePasseDiferent: true })
        }
    }

    getNouveauMotDePasseDeuxieme (event) {
        this.setState({ nouveauMotDePasseDeuxieme: event.target.value })

        if (this.state.nouveauMotDePasse.localeCompare(event.target.value) === 0) {
            this.setState({ moteDePasseDiferent: false })
        } else {
            this.setState({ moteDePasseDiferent: true })
        }
    }
    // {profil !== null ? <ProfilComponent user={profil} fermerSession={this.fermerSession} /> : ''}

    modifInfo () {
        const response = { user: { userName: this.props.userCourrante.user.userName, email: this.props.userCourrante.user.email, lastName: this.state.nom !== null ? this.state.nom : this.props.userCourrante.user.lastName, firstName: this.state.prenom !== null ? this.state.prenom : this.props.userCourrante.user.firstName }, token: this.props.userCourrante.token }

        fetch(urlConnexion, {
            method: 'PUT',
            body: JSON.stringify(response),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(response => {
                if (response !== false) {
                    this.props.setPannier('vider')

                    fetch(urlConnexionSaveSession, {
                        method: 'POST',
                        body: JSON.stringify({
                            json: null
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    }).then(response => {
                        this.props.returnePageGeneral('Connexion')
                        this.props.setNavBar(null)
                    })
                }
            })
    }

    render () {
        const profil = this.props.userCourrante.user
        return (

            <div>
                <h3 className='profil-titre'>PROFIL</h3>

                {this.state.deleteCompte ? <DeleteComponent pswDetect={this.state.passwordIncorrect} getPassword={this.getPassword} confirmerEffacerCompte={this.confirmerEffacerCompte} returnerPage={this.returnerPage} /> : (profil !== undefined ? <ProfilComponent moteDePasseDiferent={this.state.moteDePasseDiferent} getNouveauMotDePasseDeuxieme={this.getNouveauMotDePasseDeuxieme} getNouveauMotDePasse={this.getNouveauMotDePasse} modifiquerMotPasse={this.modifiquerMotPasse} minimumCharacteres={this.state.minimumCharacteres} getAncientPassword={this.getAncientPassword} user={profil} fermerSession={this.fermerSession} returnerPage={this.returnerPage} getNom={this.getNom} getPrenom={this.getPrenom} modifInfo={this.modifInfo} /> : '')}

            </div>
        )
    }
}

export default ProfilContainer
