import React from 'react'

const privilege = function (idPrevilege) {
    let result = ''

    switch (idPrevilege) {
    case 1:
        // code block

        result = 'client'

        break
    case 2:
        // code block
        result = 'employe'
        break

    case 3:
        result = 'administrateur'
        break
    default:
        // code block
    }

    console.log(result)
    return result
}

const changerTypeCompte = function (typeCompte) {
    return <select><option value='1'>client</option><option value='2'>employe</option><option value='3'>administrateur</option> </select>
}

const CompteContainer = ({ users, penaliser, idPrivilege, effacer, onModifierCompte }) => (

    <div className='compte-component'>
        <div className='comptes-infos'><label>nom d'utilisateur</label><label>nom et prenom</label><label>courriel</label><label>type de compte</label><label>Penaliser</label>{idPrivilege !== 3 ? '' : <label>Effacer compte</label>}</div>
        {users.map((user, index) => <div className='compte' key={index}><label>{user.userName}</label><label>{user.firstName + ' ' + user.lastName}</label><label className='courriel'>{user.email}</label><div className='changer-privilege'><label>{privilege(user.idPrivilege)}</label>{idPrivilege !== 3 ? '' : <label><button className='modifier' id='3' value={user.userName} onClick={onModifierCompte}>modifier</button></label>}</div> <label><button className='penaliser' id={user.userName} onClick={penaliser}>pennaliser</button></label>{idPrivilege !== 3 ? '' : <label><button className='penaliser' id={user.userName} onClick={effacer}>Effacer compte</button></label>}</div>)}
    </div>
)

export default CompteContainer
