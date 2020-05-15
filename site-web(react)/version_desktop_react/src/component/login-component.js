import React from 'react'

const LoginComponent = ({ connexion, getPsw, getUserName, returnePage, userNameValide, connexionValide }) => (

    <div className='login-component'>
        <form onSubmit={connexion}>

            <div>
                <label>Nom d'utilisateur{userNameValide ? '' : <label style={{ color: 'red' }}> -pas de spaces</label>}</label>
                <input style={userNameValide ? { border: 'black solid 1px' } : { border: 'red solid 3px' }} type='text' maxLength='15' minLength='4' onChange={getUserName} required />
            </div>

            <div>
                <label>Mot de passe</label>
                <input type='password' onChange={getPsw} />
            </div>
            {connexionValide ? '' : <label style={{ color: 'red' }}>* Nom d'utilisateur ou Mot de passe invalide</label>}

            <div className='psw-oblie'>
                <a href='#' id='ResetMotDePasse' onClick={returnePage}>Mot de passe oublié?</a>
            </div>

            <div><button type='submit'>Connexion</button></div>

            <div className='pas-compte'>
                <a href='#' id='Inscription' onClick={returnePage}>Pas encore de compte?</a>
            </div>
        </form>
    </div>
)

export default LoginComponent
