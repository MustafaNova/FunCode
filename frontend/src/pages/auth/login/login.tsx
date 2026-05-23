import s from './login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { type FormEvent, type KeyboardEvent, useState } from 'react';
import { loginUser } from '../../../services/auth.ts';
import { getActiveScreen } from '../../../services/learning.progression.ts';
import { useTypingCode } from '../useTypingCode.ts';

export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isTerminalCrashed, setIsTerminalCrashed] = useState(false);
    const loginCodeSnippets = [
        `async function loginPlayer() {
  const token = await auth.login(tag);
  arena.join(token);
}`,
        `if (player.ready) {
  queue.match("ranked-1v1");
  deploy(skill);
}`,
    ];
    const terminalCrashCode = `SYSTEM PANIC: unauthorized input
> write access denied
> arena terminal crashed
> reboot required...`;
    const animatedCode = useTypingCode(loginCodeSnippets);


    const handleTerminalInput = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Tab') return;
        e.preventDefault();
        e.stopPropagation();
        setIsTerminalCrashed(true);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const req = { username, password };
        const res = await loginUser(req);
        if (!res) return
        await getActiveScreen();
        navigate('/home')
    }

    return (
        <form className={s.container} onSubmit={(e) => handleSubmit(e)}>
            <div className={s.arenaPanel}>
                <div className={s.statusRow}>
                    <span>Compile</span>
                    <strong>Conquer</strong>
                </div>
                <div className={s.vsBadge}>CODE BATTLE</div>
                <div
                    aria-label='Battle terminal preview. Typing here crashes the terminal.'
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
                    <span className={s.kicker}>Enter the arena</span>
                    <h1>Login</h1>
                    <p>Log in and jump straight back into your next coding battle.</p>
                </div>
                <div className={s.field}>
                    <label htmlFor='username'>Username</label>
                    <input
                        id='username' value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type='text' placeholder='your_coder_tag' required/>
                </div>
                <div className={s.field}>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password' value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password' placeholder='********' required/>
                </div>
                <button className={s.submitButton} type='submit'>Enter Combat</button>
                <Link to='/register' className={s.registerLink}>
                    New challenger? Create account
                </Link>
            </div>
        </form>
    )
}
