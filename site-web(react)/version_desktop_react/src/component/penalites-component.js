import React from 'react'

const PenalitesComponent = ({ penalites, anulerPenalite }) => (
    <div className='penalites-component'>
        <div className='menu-container'><label>Identifier</label><label>Nom d'utilisateur</label><label>Penalise pour</label><label>Date de penalite</label><label>Date limite de penalite</label><label>Enlever</label></div>
        {penalites.map((penalite, index) => <div className='penalite' key={index}><label>{penalite.id}</label><label>{penalite.userTo}</label><label>{penalite.userBy}</label><label>{penalite.dateStart}</label><label>{penalite.dateEnd}</label><label><button id={penalite.id} onClick={anulerPenalite} className='enlever'>enlever penalite</button></label></div>)}
    </div>
)

export default PenalitesComponent
