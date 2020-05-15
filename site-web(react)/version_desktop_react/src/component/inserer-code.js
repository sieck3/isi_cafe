import React from 'react'

const InsererCode = ({ getPsw, reset, cancel, getCode }) => (

    <div className='resetMotDePasse-component'>
        <form onSubmit={reset}>
            <div>
                <label>Inserer le code</label>
                <input type='text' onClick={getCode} />
            </div>
            <div>
                <label>Choisissez un nouveau mot de passe </label>
                <input type='password' onChange={getPsw} />
            </div>
            <button className='btn-okei' type='submit'>Envoyer</button>

        </form>

        <div><button className='cancel-btn' onClick={cancel}>cancel</button></div>
    </div>
)

export default InsererCode
