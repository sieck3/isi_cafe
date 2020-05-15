import React from 'react'

const ResetMotDePasseComponent = ({ getUserName, envoier, cancel }) => (

    <div className='resetMotDePasse-component'>
        <form onSubmit={envoier}>
            <div>
                <label>Saississez votre nom d'utilisateur</label>
                <input type='text' onChange={getUserName} />
            </div>
            <button className='btn-okei' type='submit'>Envoyer</button>

        </form>
        <div className='btn-code'><button className='btn-okei' onClick={cancel}>j'ai un code</button></div>

    </div>
)

export default ResetMotDePasseComponent
