import React, { Component } from 'react'
import '../css/reinitialisation-mot-de-passe.css'
import ResetMotDePasseComponent from '../component/reset-mot-de-passe-component'
import InsererCode from '../component/inserer-code'

const PATH_API = 'http://69.159.182.204:9876/isserver'

const urlConnexion = PATH_API + '/users'

class ReinitialisationMotDePasseContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userName: '',
            code: '',
            password: '',
            onVisible: true,
            fail: true
        }
        this.envoier = this.envoier.bind(this)
        this.getUserName = this.getUserName.bind(this)
        this.getPsw = this.getPsw.bind(this)
        this.reset = this.reset.bind(this)
        this.changeVisibiliti = this.changeVisibiliti.bind(this)
        this.getCode = this.getCode.bind(this)
    }

    componentDidMount () {
        // console.log("FormContainer componentDidMount()") // eslint-disable-line

    }

    componentWillUnmount () {
        // console.log("FormContainer componentWillUnmount()") // eslint-disable-line
        // <NavBarComponent liens={LIENS} />
        // comment
    }

    getUserName (event) {
        this.setState({ userName: event.target.value })
    }

    envoier (event) {
        event.preventDefault()
        const valuesConnexion = 'username=' + this.state.userName

        fetch(urlConnexion, {
            method: 'POST',
            body: valuesConnexion,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({ onVisible: false })
            })
    }

    getPsw (event) {
        this.setState({ password: event.target.value })
    }

    getCode (event) {
        this.setState({ code: event.target.value })
    }

    reset (event) {
        event.preventDefault()

        const code = { code: this.state.code, pwd: this.state.password }

        fetch(urlConnexion, {
            method: 'PUT',
            body: JSON.stringify(code),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)

                if (response) {
                    this.props.setSession()
                    this.props.returnePageGeneral('Connexion')
                } else {
                    this.setState({ fail: false })
                }
            })
    }

    changeVisibiliti () {
        if (this.state.onVisible) {
            this.setState({ onVisible: false })
        } else {
            this.setState({ onVisible: true })
        }
    }
    // <ResetMotDePasseComponent getUserName={this.getUserName} envoier={this.envoier} />

    render () {
        return (
            <div className='connexion-container'>
                {this.state.onVisible !== true ? <h3>insérer le code</h3> : <h3>RÉINITIALISATION DU MOT DE PASSE</h3>}
                {this.state.fail !== true ? <div className='bad-code'><label>code mauvaise</label></div> : ''}
                {this.state.onVisible !== true ? <InsererCode cancel={this.changeVisibiliti} getCode={this.getCode} getPsw={this.getPsw} reset={this.reset} /> : <ResetMotDePasseComponent cancel={this.changeVisibiliti} getUserName={this.getUserName} envoier={this.envoier} />}
            </div>
        )
    }
}

export default ReinitialisationMotDePasseContainer
