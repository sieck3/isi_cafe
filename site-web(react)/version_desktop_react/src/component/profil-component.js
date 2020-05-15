import React from 'react'
const TITLE_ATTENTION = 'si vous modifiez un champ, vous devrez redémarrer la session'

const ProfilComponent = ({ moteDePasseDiferent, user, fermerSession, returnerPage, getNom, getPrenom, modifInfo, getAncientPassword, minimumCharacteres, modifiquerMotPasse, getNouveauMotDePasse, getNouveauMotDePasseDeuxieme }) => (
    <div className='profil-container'>
        <div className='section'>
            <div>
                <label className='lbl-info'>Adresse courriel:&nbsp;</label>
                <label>{user.email}</label>
            </div>
            <div>
                <label className='lbl-info'>Nom d'utilisateur:&nbsp;</label>
                <label>{user.userName}</label>
            </div>

            <div>
                <label className='lbl-info'>Date d'inscription:&nbsp;</label>
                <label> {user.signUp} </label>
            </div>
            <div className='inputs'>
                <label>Nom:</label>
                <input defaultValue={user.lastName} onChange={getNom} title={TITLE_ATTENTION} />
            </div>

            <div className='inputs'>
                <label>Prenom:</label>
                <input defaultValue={user.firstName} onChange={getPrenom} title={TITLE_ATTENTION} />
            </div>

            <button className='btn-modif' onClick={modifInfo} title={TITLE_ATTENTION}>Modifier</button>

        </div>

        <form className='section' onSubmit={modifiquerMotPasse}>

            <div className='inputs'>
                <label>Mot de passe actuel:</label>{minimumCharacteres !== true ? <label className='mot-invalide'>*mot de passe invalide</label> : ''}
                <input type='password' onChange={getAncientPassword} title={TITLE_ATTENTION} required />
            </div>

            <div className='inputs'>
                <label>Nouveau mot de passe:</label>{moteDePasseDiferent !== false ? <label className='mot-invalide'>*mot de passe differentes</label> : ''}
                <input type='password' onChange={getNouveauMotDePasse} title={TITLE_ATTENTION} required />
            </div>
            <div className='inputs'>
                <label>Nouveau mot de passe:</label>
                <input type='password' onChange={getNouveauMotDePasseDeuxieme} title={TITLE_ATTENTION} required />
            </div>
            <button className='btn-modif' type='submit' title={TITLE_ATTENTION}>Modifier</button>

        </form>

        <div className='btn-container'>
            <button className='spr_compte' id='effacer_compte' onClick={returnerPage}>Suprimer compte</button>
            <button className='spr_compte' onClick={fermerSession}>fermer session</button>
        </div>

    </div>
)

export default ProfilComponent
