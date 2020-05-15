import React, { Component } from 'react'
import '../css/inscription.css'
import InscriptionComponent from '../component/inscription-component'

const PATH_API = 'http://69.159.182.204:9876/isserver'

const urlConnexion = PATH_API + '/users'

class InscriptionContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            email: '',
            userName: '',
            nom: '',
            prenom: '',
            motDePasse: '',
            confirmationMotDePasse: '',
            confirmationMotDePasseValide: true,
            detailProduit: 0
        }

        this.getEmail = this.getEmail.bind(this)
        this.getUserName = this.getUserName.bind(this)
        this.getNom = this.getNom.bind(this)
        this.getPrenom = this.getPrenom.bind(this)
        this.getMotDePasse = this.getMotDePasse.bind(this)
        this.getConfirmationMotDePasse = this.getConfirmationMotDePasse.bind(this)
        this.envoie = this.envoie.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    detailProduit () {

    }

    getEmail (e) {
        this.setState({ email: e.target.value })
    }

    getUserName (e) {
        this.setState({ userName: e.target.value })
    }

    getNom (e) {
        this.setState({ nom: e.target.value })
    }

    getPrenom (e) {
        this.setState({ prenom: e.target.value })
    }

    getMotDePasse (e) {
        this.setState({ motDePasse: e.target.value })

        if (this.state.confirmationMotDePasse.localeCompare(e.target.value) === 0) {
            this.setState({ confirmationMotDePasseValide: true })
        } else {
            this.setState({ confirmationMotDePasseValide: false })
        }
    }

    getConfirmationMotDePasse (e) {
        this.setState({ confirmationMotDePasse: e.target.value })

        if (this.state.motDePasse.localeCompare(e.target.value) === 0) {
            this.setState({ confirmationMotDePasseValide: true })
        } else {
            this.setState({ confirmationMotDePasseValide: false })
        }
    }

    envoie (event) {
        event.preventDefault()
        const resultFormulaire = { userName: this.state.userName, email: this.state.email, lastName: this.state.nom, firstName: this.state.prenom }
        const passwordVerified = { pwd: this.state.confirmationMotDePasse }

        const resultForm = 'user=' + JSON.stringify(resultFormulaire) + '&pwd=' + passwordVerified.pwd

        /*  ?user={"userName":"toto","idPrivilege":1,"lastName":"Trevino","firstName":"César","signUp":"nov. 7, 2019"}&pwd=toto

        const jsonUserName = "{'userName':'test','lastName':'daniela','firstName':'medina'}"
        const jsonUserName2 = { userName: 'test', lastName: 'daniela', firstName: 'medina' }
        const test3 = '{userName:"cesarTrevino",' + 'idPrivilege:2,' + 'lastName:"Trevino",firstName:"cesar"}' */

        //  const valuesConnexion = 'user=' + test3 + '&pwd=' + 'toto'

        if (this.state.motDePasse.localeCompare(this.state.confirmationMotDePasse) === 0 && this.state.email.localeCompare('') !== 0 && this.state.userName.localeCompare('') !== 0) {
            fetch(urlConnexion, {
                method: 'POST',
                body: resultForm,
                headers: { 'Content-type': 'application/x-www-form-urlencoded' }
            }).then(response => response.json())
                .then(response => {
                    if (response) {
                        const urlConnexionSaveSession = 'http://localhost:8080/startsession'

                        fetch(urlConnexionSaveSession, {
                            method: 'POST',
                            body: JSON.stringify({
                                json: null
                            }),
                            headers: { 'Content-Type': 'application/json' }
                        })

                        this.props.returnePageGeneral('Connexion')
                    }
                })

            fetch(urlConnexion)
                .then(response => response.json())
                .then(response => {
                    // this.setState({ produits: response })
                })
        } else {
            console.log('ca marche pas')
        }
    }

    delete () {
        /* fetch('mongodb://127.0.0.1:27017/session', {
             method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
             body: {}, // Coordinate the body type with 'Content-Type'
             headers: { 'Content-type': 'application/x-www-form-urlencoded' }
         })

        fetch('http://localhost:8080/session')
            .then(response => response.text())
            .then(response => {
                console.log(response)
                // this.setState({ produits: response })
            })

        fetch('http://localhost:8080/session', {
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify({ userName: 'employe', pwd: 'employe' }), // Coordinate the body type with 'Content-Type'
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            mode: 'cors'
        })
        */

        const urlConnexion = 'http://localhost:8080/clear'
        const valuesConnexion = 'username=' + this.state.userName + '&pwd=' + this.state.password
        /* fetch(urlConnexion, {
             method: 'GET',
             body: valuesConnexion,
             headers: { 'Content-type': 'application/x-www-form-urlencoded' }
         }).then(response => response.json())
             .then(response => {
                 console.log(response)
             })

        fetch(urlConnexion, {
            method: 'POST',
            body: JSON.stringify({
                json: { value: 'value' }
            }),
            headers: { 'Content-Type': 'application/json' }
        })
*/
        /* fetch('http://70.53.207.187:9876/isserver/users', {
            method: 'DELETE', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify({ userName: 'employe', pwd: 'employe' }), // Coordinate the body type with 'Content-Type'
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            mode: 'cors'
        })
         fetch('http://70.53.207.187:9876/isserver/users', {
            method: 'POST',
            body: 'username=admin&pwd=admin',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
            }) */
        console.log('PUT')
    }
    // Button pour tester la base de donnes
    // <button onClick={this.delete}>delete</button>

    render () {
        return (
            <div className='connexion-container'>
                <h3>INSCRIPTION</h3>
                <InscriptionComponent
                    returneConnexionPage={this.props.returnePage}
                    getEmail={this.getEmail}
                    getUserName={this.getUserName}
                    getNom={this.getNom}
                    getPrenom={this.getPrenom}
                    getMotDePasse={this.getMotDePasse}
                    getConfirmationMotDePasse={this.getConfirmationMotDePasse}
                    envoie={this.envoie}
                    confirmationMotDePasseValide={this.state.confirmationMotDePasseValide}
                />
            </div>
        )
    }
}

export default InscriptionContainer
