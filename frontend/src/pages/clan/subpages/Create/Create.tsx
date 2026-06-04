import s from './create.module.scss';
import { useState } from 'react';
import { createClan } from '../../../../services/clans.ts';
export function Create() {
    const [clanName, setClanName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [emptyNameError, setEmptyNameError] = useState<boolean>(false)
    const emptyNameWarning = 'empty name is invalid'
    const isClanNameEmpty = clanName.trim() === '';
    function handleCreateClan(){
        if (isClanNameEmpty) {
            setEmptyNameError(true)
            return
        }
        setEmptyNameError(false)
        createClan({ name: clanName, description })
    }

    return (
        <div className={s.clanScreen}>
            <div className={s.title}>
                <span>Create your own clan</span>
                <span>Lead your members to glory!</span>
            </div>
            <div className={s.inputField}>
                <label htmlFor="clanName">Clan Name</label>
                <input id="clanName" value={clanName} onChange={(e) => setClanName(e.target.value)}/>
            </div>
            { emptyNameError &&
                <span className={s.emptyNameError}>{emptyNameWarning}</span>
            }
            <div className={s.inputField}>
                <label htmlFor="description">Description</label>
                <textarea id="description" className={s.textArea} maxLength={162} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button className={s.createBtn} onClick={handleCreateClan}>Create</button>
        </div>
    )
}