import React from 'react'
const DeleteComponent = ({ returnerPage, effacerCompte, confirmerEffacerCompte, getPassword, pswDetect }) => (
    <div className='delete-container'>

        <h5>Supprimer compte</h5>
        <div className='question'><label>Confirmez mot de passe</label>{pswDetect ? <label style={{ color: 'red' }}>-mot de passe incorrect</label> : ''}<input type='password' onChange={getPassword} /></div>
        <div className='control'><button type='input' className='returne' id='returner' onClick={returnerPage}>returner</button><button className='envoie' type='input' onClick={confirmerEffacerCompte}>confirmez</button></div>
    </div>
)

export default DeleteComponent
