import React from 'react'

const InscriptionComponent = ({
    returneConnexionPage,
    getEmail,
    getUserName,
    getNom,
    getPrenom,
    getMotDePasse,
    getConfirmationMotDePasse,
    confirmationMotDePasseValide,
    envoie
}) => (

    <div className='inscription-component'>
        <form onSubmit={envoie}>
            <div className='container-input'>
                <label>Email personnel</label>
                <input className='email-inscription' type='text' size='30' maxLength='30' onChange={getEmail} required />
            </div>

            <div className='container-input'>
                <label>Username</label>
                <input type='text' className='formulaire-inscription' minLength='4' maxLength='20' pattern='^[a-zA-Z1-9].*' onChange={getUserName} required />
            </div>

            <div className='container-input'>
                <label>Nom</label>
                <input type='text' minLength='2' maxLength='20' onChange={getNom} required />
            </div>
            <div className='container-input'>
                <label>Prenom</label>
                <input type='text' minLength='2' maxLength='20' onChange={getPrenom} required />
            </div>

            <div className='container-input'>
                <label>Mot de passe</label>
                <input type='password' minLength='4' maxLength='20' onChange={getMotDePasse} required />
            </div>

            <div className='container-input'>
                <label>Confirmer votre mot de passe</label>

                <input type='password' minLength='4' maxLength='20' onChange={getConfirmationMotDePasse} required />
            </div>
            {confirmationMotDePasseValide ? '' : <label style={{ fontSize: '10px', color: 'red', margin: '0' }}>*mot de passe différent</label>}

            <div className='btn_container'><button type='button' className='deja-inscrit' id='Connexion' onClick={returneConnexionPage}>Deja inscrit</button><button type='submit' className='sinscrire'>S'incrire</button></div>

        </form>
    </div>
)

export default InscriptionComponent
