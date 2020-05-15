import React, { Component } from 'react'
import '../css/connexion.css'
import '../css/inscription.css'
import LoginComponent from '../component/login-component'

const PATH_API = 'http://69.159.182.204:9876/isserver/'
const urlConnexion = PATH_API + 'users'

class ConnexionContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userName: '',
            userNameValide: true,
            password: '',
            passwordValide: true,
            pageCouranteConnexion: 'CONNEXION',
            connexionValide: true,
            userCompte: null
        }
        this.connexion = this.connexion.bind(this)
        this.recuperationUsers = this.recuperationUsers.bind(this)
        this.getPsw = this.getPsw.bind(this)
        this.getUserName = this.getUserName.bind(this)
        // this.returnePageGeneral = this.props.returnePageGeneral
        this.putUser = this.putUser.bind(this)

        // this.returnePage = this.props.returnePage
    }

    componentDidMount () {

        // console.log("FormContainer componentDidMount()") // eslint-disable-line
    }

    componentWillUnmount () {
        // console.log("FormContainer componentWillUnmount()") // eslint-disable-line
        // <NavBarComponent liens={LIENS} />
        // comment
    }

    recuperationUsers () {
        fetch(PATH_API + 'users')
            .then(response => response.json())
            .then(response => {
                // this.setState({ produits: response })
            })
    }

    connexion (event) {
        event.preventDefault()

        const urlConnexionSaveSession = 'http://localhost:8080/startsession'
        const valuesConnexion = 'username=' + this.state.userName + '&pwd=' + this.state.password

        fetch(urlConnexion, {
            method: 'POST',
            body: valuesConnexion,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }

        })
            .then(response => response.text())
            /* .then(response => {
                 console.log(response)
                 // console.log(response.json())
                 console.log('lco', JSON.parse(response))
             } */

            .then(response => {
                //  this.setState({ userCompte: JSON.parse(response) })

                if (response !== '') {
                    this.setState({ connexionValide: true })

                    response = JSON.parse(response)

                    response = { user: response, pannier: this.props.pannier }
                    fetch(urlConnexionSaveSession, {
                        method: 'POST',
                        body: JSON.stringify({
                            // json: response,
                            json: response
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })

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
                        this.props.setNavBar(LIENS)
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
                        this.props.setNavBar(LIENS)
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
                        this.props.setNavBar(LIENS)
                    }

                    this.props.returnePageGeneral('Accueil')
                } else {
                    this.setState({ connexionValide: false })
                }
            })

        // VERIFICATION FINAL

        /* fetch('http://70.53.207.187:9876/isserver/users')
            .then(response => response.json())
            .then(response => {
                console.log(response)
                // this.setState({ produits: response })
            })
*/
    }

    putUser () {
        fetch(PATH_API + 'users')
            // .then(response => response.json())
            .then(response => {
                // this.setState({ produits: response })
            })
        // .then(response => response.json())

        /*  fetch('http://70.53.207.187:9876/isserver/users', {
              method: 'POST',
              body: 'username=ctrevino&pwd=ctrevino',
              headers: { 'Content-type': 'application/x-www-form-urlencoded' }
          }).then(response => response.json())
              .then(response => {
                  console.log(response)
              })
          console.log('PUT') */
    }

    getUserName (e) {
        if (e.target.value.split(' ').length > 1) {
            this.setState({ userNameValide: false })
        } else {
            this.setState({ userNameValide: true })
            this.setState({ userName: e.target.value })
        }
    }

    getPsw (e) {
        this.setState({ password: e.target.value })
    }

    setApp () {
        return this.returnePageGeneral
    }

    render () {
        return (
            <div className='connexion-container'>
                <h3>CONNEXION</h3>
                <LoginComponent connexion={this.connexion} getPsw={this.getPsw} getUserName={this.getUserName} returnePage={this.props.returnePage} userNameValide={this.state.userNameValide} connexionValide={this.state.connexionValide} />

            </div>
        )
    }
}

export default ConnexionContainer
