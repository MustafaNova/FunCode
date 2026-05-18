import s from './registration.module.scss';
import { Link } from 'react-router-dom';
import { type FormEvent, type KeyboardEvent, useState } from 'react';
import { registerUser } from '../../../services/auth.ts';
import { useTypingCode } from '../useTypingCode.ts';

const registrationCodeSnippets = [
    `function registerFighter() {
  profile.create(coderTag);
  unlockArena();
}`,
    `const loadout = {
  class: "frontend-duelist",
  power: "clean-code"
};`,
];

const terminalCrashCode = `SYSTEM PANIC: profile write collision
> rogue keystroke detected
> registration terminal crashed
> reboot required...`;

export function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isTerminalCrashed, setIsTerminalCrashed] = useState(false);
    const animatedCode = useTypingCode(registrationCodeSnippets);

    const handleTerminalInput = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Tab') return;

        e.preventDefault();
        e.stopPropagation();
        setIsTerminalCrashed(true);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password != passwordRepeat) {
            alert('Password and PasswordRepeat dont match!')
            return
        }
        const request = {
            username,
            email,
            password,
            passwordRepeat,
        }
        await registerUser(request)

        setUsername('')
        setEmail('')
        setPassword('')
        setPasswordRepeat('')
    }

    return (
        <form className={s.container} onSubmit={(e) => handleSubmit(e)}>
            <div className={s.arenaPanel}>
                <div className={s.statusRow}>
                    <span>New challenger</span>
                    <strong>Level 01</strong>
                </div>
                <div className={s.vsBadge}>JOIN BATTLE</div>
                <div className={s.bracket}>
                    <span className={s.activeNode}>Blind Coding</span>
                    <span>Corrupted Arena</span>
                    <span>Blitz Battle</span>
                    <span>Find the Bug</span>
                </div>
                <div
                    aria-label='Registration terminal preview. Typing here crashes the terminal.'
                    className={`${s.codeWindow} ${isTerminalCrashed ? s.crashed : ''}`}
                    onKeyDown={handleTerminalInput}
                    role='textbox'
                    tabIndex={0}
                >
                    <pre>
                        {isTerminalCrashed ? terminalCrashCode : animatedCode}
                        {!isTerminalCrashed && <span className={s.cursor}>|</span>}
                    </pre>
                </div>
            </div>

            <div className={s.authCard}>
                <div className={s.header}>
                    <span className={s.kicker}>Build your fighter</span>
                    <h1>Register</h1>
                    <p>Create your coder tag and claim your place in the arena.</p>
                </div>
                <div className={s.field}>
                    <label htmlFor='username'>Username</label>
                    <input placeholder='your_coder_tag' id='username' type='text'
                           value={username}
                           onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className={s.field}>
                    <label htmlFor='email'>Email</label>
                    <input placeholder='player@funcode.dev' id='email' type='email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className={s.field}>
                    <label htmlFor='password'>Password</label>
                    <input placeholder='********' type='password' id='password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className={s.field}>
                    <label htmlFor='passwordRepeat'>Repeat Password</label>
                    <input placeholder='********' type='password' id='passwordRepeat'
                           value={passwordRepeat}
                           onChange={(e) => setPasswordRepeat(e.target.value)} required/>
                </div>
                <button className={s.submitButton} type='submit'>Create Fighter</button>
                <Link to='/' className={s.loginLink}>Already in the league? Login</Link>
            </div>
        </form>
    )
}
