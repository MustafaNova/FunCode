import s from './registration.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username,email,password, passwordRepeat)
    }

    return (
        <form className={s.container} onSubmit={(e) => handleSubmit(e)}>
            <div className={s.dFlex}>
                <label htmlFor='username'>Username</label>
                <input placeholder='username' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className={s.dFlex}>
                <label htmlFor='email'>Email</label>
                <input placeholder='email' id='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className={s.dFlex}>
                <label htmlFor='password'>Password</label>
                <input placeholder='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className={s.dFlex}>
                <label htmlFor='passwordRepeat'>PasswordRepeat</label>
                <input placeholder='passwordRepeat' id='passwordRepeat' value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} required/>
            </div>
            <div className={s.dFlex}>
                <button type='submit'>Submit</button>
            </div>
            <Link to='/' className={s.loginLink}>Already have an account?</Link>
        </form>
    )
}
