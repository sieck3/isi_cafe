import React from 'react'

const ModifierPrivilegieComponent = ({ onHandleGetType, onHandleChangeMenu, userName, onHandleModifPrivilegie }) => (
    <div className='modif-privilege'>
        <h3>Moddifier privilege</h3>
        <div>
            <label>Nom de compte: {userName}</label>
            <select onChange={onHandleGetType}>
                <option value='1'>client</option>
                <option value='2'>employe</option>
                <option value='3'>administrateur</option>
            </select>
            <div className='btns-modif-privilege'><button id='1' onClick={onHandleChangeMenu}>return</button><button onClick={onHandleModifPrivilegie}>envoier</button></div>
        </div>
    </div>
)

export default ModifierPrivilegieComponent
