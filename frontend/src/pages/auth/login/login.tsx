import s from './login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { type FormEvent, useState } from 'react';
import { loginUser } from '../../../services/auth.ts';


export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const req = { username, password };
        await loginUser(req);
        navigate('/home')
    }

    return (
        <form className={s.container} onSubmit={(e) => handleSubmit(e)}>
            <div className={s.dFlex}>
                <label htmlFor='username'>Username</label>
                <input
                    id='username' value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type='text' placeholder='username' required/>
            </div>
            <div className={s.dFlex}>
                <label htmlFor='password'>Password</label>
                <input
                    id='password' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password' placeholder='password' required/>
            </div>
            <div className={s.dFlex}>
                <button type='submit'>Submit</button>
            </div>
            <Link to='/register' className={s.registerLink}>
                Don't have an account?
            </Link>
        </form>
    )
}
