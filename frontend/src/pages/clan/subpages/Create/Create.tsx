import s from './create.module.scss';
import { useState } from 'react';
import { createClan } from '../../../../services/clans.ts';
import { useOutletContext } from 'react-router-dom';
import type { ClanOutletContext } from '../../clanOutletContext.type.ts';
export function Create() {
    const [clanName, setClanName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [emptyNameError, setEmptyNameError] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>()
    const emptyNameWarning = 'empty name is invalid'
    const isClanNameEmpty = clanName.trim() === '';
    const { refreshClanState } = useOutletContext<ClanOutletContext>();
    async function handleCreateClan(){
        if (isClanNameEmpty) {
            setEmptyNameError(true)
            return
        }
        setEmptyNameError(false)

        try {
            await createClan({ name: clanName, description })
            await refreshClanState()
        } catch (err) {
            if (err instanceof Error) {
                setErrorMsg(err.message)
            }
        }
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
            { emptyNameError && <span className={s.errorTxt}>{emptyNameWarning}</span> }
            <div className={s.inputField}>
                <label htmlFor="description">Description</label>
                <textarea id="description" className={s.textArea} maxLength={162} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button className={s.createBtn} onClick={handleCreateClan}>Create</button>
            { errorMsg && <span className={s.errorTxt}>{errorMsg}</span> }
        </div>
    )
}
