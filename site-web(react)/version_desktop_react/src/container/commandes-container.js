import React, { Component } from 'react'
import '../css/commandes-container.css'
import CommandeUniqueComponent from '../component/commande-unique-component'
import CommandePourUneJournee from '../component/commande-pour-une-journee'
import VentesPourUnJour from '../component/ventes-pour-un-jour'
const PATH_API = 'http://69.159.182.204:9876/isserver/'

function tableProd (acumulador, value, index, array) {
    const proto = {
        id: index,
        quantites: value.quantities,
        products: value.products,
        totalPrice: true,
        globalPrice: value.globalPrice !== undefined ? value.globalPrice : null
    }

    acumulador.push(proto)
    return acumulador
}

function getQty (acumulador, value, iterator, array) {
    const arrayM = []
    value.quantites.map((l, index) => arrayM.push({ id: index, qty: l }))

    acumulador.push(arrayM)
    return acumulador
}

function getPrice (acumulador, value, iterator, array) {
    const arrayM = []

    value.products.map((l, index) => arrayM.push({ id: index, price: l.price, name: l.name }))

    acumulador.push(arrayM)
    return acumulador
}

function totalArray (acumulador, value, iterator, array) {
    acumulador = value.total + acumulador

    return acumulador
}

function getTotal (acumulador, value, iterator, array) {
    const value1 = value.reduce(totalArray, 0)

    acumulador.push(value1)
    return acumulador
}

class CommandesContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            commandes: null,
            commandesJour: null,
            tablePrix: [],
            changeMesCommandes: 0,
            date: null,
            ventesPourUneJourne: null
        }
        this.sendTotal = this.sendTotal.bind(this)
        this.getCommandesTotals = this.getCommandesTotals.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleGetCommandesPourUneJourne = this.handleGetCommandesPourUneJourne.bind(this)
        this.handleGetDate = this.handleGetDate.bind(this)
        this.setPayee = this.setPayee.bind(this)
        this.handleGetVentesPourUneJournee = this.handleGetVentesPourUneJournee.bind(this)
        this.setPenalise = this.setPenalise.bind(this)
    }

    componentDidMount () {
        const valuesConnexion = '?username=' + this.props.userCourrante.user.userName + '&token=' + this.props.userCourrante.token

        fetch(PATH_API + 'orders' + valuesConnexion, {
        }).then(response => response.json())
            .then(response => {
                this.setState({ commandes: response })
            })
    }

    componentWillUnmount () {

    }

    getCommandesTotals (totalPrice, total) {
        function rexo (acumulador, value, iterator, array) {
            value.map((m, index) => { m.total = m.qty * totalPrice[iterator][index].price })
            value.map((m, index) => { m.name = totalPrice[iterator][index].name })

            acumulador.push(value)
            return acumulador
        }

        const func = total.reduce(rexo, [])

        return func
    }

    sendTotal (commandes) {
        if (this.state.commandes !== null) {
            const metre = commandes.reduce(tableProd, [])

            this.setState({ totalPrice: '' })

            /* this.setState({ totalPrice: tablePrix.reduce(getPrice, []) })

             const fruto = total.reduce(this.rexo, [])

             this.setState({ prixTotalArray: fruto.reduce(getTotal, []) }) */
        }
    }

    handleChangePage (event) {
        if (event.target.id === '0') {
            this.setState({ changeMesCommandes: 0 })
        }
        // 1 mes commandes
        if (event.target.id === '1') {
            this.setState({ changeMesCommandes: 1 })
        }

        if (event.target.id === '2') {
            this.setState({ changeMesCommandes: 2 })
        }
    }

    handleGetDate (event) {
        this.setState({ date: event.target.value })

        /*  const currentDatetime = new Date(event.target.value)

          console.log('day', currentDatetime.getDate())
          console.log('month', currentDatetime.getMonth())
          console.log('year', currentDatetime.getFullYear())

          const dateCurrante = currentDatetime.getFullYear() + '-' + (currentDatetime.getMonth() + 1) + '-' + currentDatetime.getDate()
  */
    }

    handleGetCommandesPourUneJourne () {
        // const formattedDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
        const formattedDate = this.state.date

        const valuesConnexion = '?pickup=' + formattedDate + '&token=' + this.props.userCourrante.token

        fetch(PATH_API + 'orders' + valuesConnexion, {
        }).then(response => response.json())
            .then(response => {
                this.setState({ commandesJour: response })
            })
    }

    setPayee (event) {
        const idCommande = event.target.id

        /*      const date = new Date()

              const formattedDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      */

        const options = { month: 'numeric', year: 'numeric', day: 'numeric' }

        const dateFormating = new Date()
        const result = dateFormating.toLocaleDateString('fr', options).split('/').reverse().join('-')

        const commande = { id: idCommande, paymentDate: result + ' 19:00:00', token: this.props.userCourrante.token }

        fetch(PATH_API + 'orders', {
            method: 'PUT',
            body: JSON.stringify(commande),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(response => { console.log(response) })
    }

    setPenalise (event) {
        const idCommande = event.target.id

        /*      const date = new Date()

              const formattedDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      */

        const options = { month: 'numeric', year: 'numeric', day: 'numeric' }

        const dateFormating = new Date()
        const result = '1970-01-01'

        const commande = { id: idCommande, paymentDate: result, token: this.props.userCourrante.token }

        fetch(PATH_API + 'orders', {
            method: 'PUT',
            body: JSON.stringify(commande),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(response => { console.log(response) })
    }

    handleGetVentesPourUneJournee () {
        /*
                const date = new Date(this.state.date)
                const formattedDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1))
                console.log('formated date', this.state.handleGetDate) */
        const valuesConnexion = '?date=' + this.state.date + '&token=' + this.props.userCourrante.token

        fetch(PATH_API + 'sales' + valuesConnexion, {
        }).then(response => response.json())
            .then(response => {
                this.setState({ ventesPourUneJourne: response })
            })
    }
    // response
    // {this.state.changeMesCommandes === true ? this.state.commandes && totalPrix !== null ? <CommandeUniqueComponent commandes={this.state.commandes} productsQtyName={testing1 !== null ? testing1 : null} totalPrix={totalPrix !== null ? totalPrix : [1]} /> : 'sans commandes' : this.state.commandesJour && totalPrix2 !== null ? <CommandePourUneJournee setPayee={this.setPayee} commandes={this.state.commandesJour} productsQtyName={testing2 !== null ? testing2 : null} totalPrix={totalPrix2 !== null ? totalPrix2 : [1]} /> : <div className='select-date'><label>choissir date</label></div>}

    // mes commandes
    // {this.props.userCourrante.user.idPrivilege > 1 && this.state.changeMesCommandes === false ? <div className='select-date'><div><input type='date' onChange={this.handleGetDate} /></div><div><button onClick={this.handleGetCommandesPourUneJourne}>choissir date</button></div></div> : ''}
    //
    // this.state.commandes && totalPrix !== null ? <CommandeUniqueComponent commandes={this.state.commandes} productsQtyName={testing1 !== null ? testing1 : null} totalPrix={totalPrix !== null ? totalPrix : [1]} /> : 'sans commandes'
    render () {
        const metre = this.state.commandes !== null ? this.state.commandes.reduce(tableProd, []) : null
        const total = metre !== null ? metre.reduce(getQty, []) : null
        const totalPrice = metre !== null ? metre.reduce(getPrice, []) : null
        const testing1 = totalPrice !== null ? this.getCommandesTotals(totalPrice, total) : null
        const totalPrix = testing1 !== null ? testing1.reduce(getTotal, []) : null
        // const productsQtyName = totalPrice !== null ? totalPrice : null

        const metre2 = this.state.commandesJour !== null ? this.state.commandesJour.reduce(tableProd, []) : null
        const total2 = metre2 !== null ? metre2.reduce(getQty, []) : null
        const totalPrice2 = metre2 !== null ? metre2.reduce(getPrice, []) : null
        const testing2 = totalPrice2 !== null ? this.getCommandesTotals(totalPrice2, total2) : null
        const totalPrix2 = testing2 !== null ? testing2.reduce(getTotal, []) : null

        // const fruto = total.reduce(rexo, [])

        // this.sendTotal(this.state.commandes)

        const metre3 = this.state.ventesPourUneJourne !== null ? this.state.ventesPourUneJourne.reduce(tableProd, []) : null
        const total3 = metre3 !== null ? metre3.reduce(getQty, []) : null

        const totalPrice3 = metre3 !== null ? metre3.reduce(getPrice, []) : null
        const testing3 = totalPrice3 !== null ? this.getCommandesTotals(totalPrice3, total3) : null

        const totalPrix3 = testing3 !== null ? testing3.reduce(getTotal, []) : null

        return (
            <div className='commandes-container'>
                <h2>COMMANDES</h2>

                {this.props.userCourrante.user.idPrivilege > 1 ? <div className='change-page-commandes'><button id='0' style={this.state.changeMesCommandes === 0 ? { color: 'white' } : { color: 'black' }} onClick={this.handleChangePage}>mes commandes</button> <button id='1' style={this.state.changeMesCommandes === 1 ? { color: 'white' } : { color: 'black' }} onClick={this.handleChangePage}>commandes pour un journe</button> <button id='2' style={this.state.changeMesCommandes === 2 ? { color: 'white' } : { color: 'black' }} onClick={this.handleChangePage}>ventes pour un journe</button></div> : ''}
                {this.props.userCourrante.user.idPrivilege > 1 && this.state.changeMesCommandes > 0 ? <div className='select-date'><div><input type='date' onChange={this.handleGetDate} /></div><div><button onClick={this.state.changeMesCommandes === 1 ? this.handleGetCommandesPourUneJourne : this.handleGetVentesPourUneJournee}>choissir date</button></div></div> : ''}
                {this.state.changeMesCommandes === 0 && this.state.commandes !== null ? <CommandeUniqueComponent commandes={this.state.commandes} productsQtyName={testing1 !== null ? testing1 : null} totalPrix={totalPrix !== null ? totalPrix : [1]} /> : ''}
                {this.state.changeMesCommandes === 1 && this.state.commandesJour !== null ? <CommandePourUneJournee setPenalise={this.setPenalise} setPayee={this.setPayee} commandes={this.state.commandesJour} productsQtyName={testing2 !== null ? testing2 : null} totalPrix={totalPrix2 !== null ? totalPrix2 : [1]} /> : ''}
                {this.state.changeMesCommandes === 2 && this.state.ventesPourUneJourne !== null ? <VentesPourUnJour commandes={this.state.ventesPourUneJourne} productsQtyName={testing3 !== null ? testing3 : null} totalPrix={totalPrix3 !== null ? totalPrix3 : [1]} /> : ''}

            </div>
        )
    }
}

export default CommandesContainer
