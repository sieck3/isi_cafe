import React from 'react'

const TempComponent = ({ getJour, getHeure }) => (

    <div className='commande-component'>
        <div className='choisir-jour'>
            <label>choisir le jour :&nbsp;</label>
            <select onChange={getJour}>
                <option value={2}>demain</option>
                <option value={3}>apres-demain</option>
            </select>
        </div>
        <div className='choisir-heure'>
            <label>choisir l'heure :&nbsp;</label>
            <input type='time' onChange={getHeure} min='08:00' max='16:00' defaultValue='08:00' required />
        </div>
    </div>
)

export default TempComponent
