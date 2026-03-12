import s from './login.module.scss';
import { Link } from 'react-router-dom';


export function Login() {

    return (
        <form className={s.container}>
            <div className={s.dFlex}>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' required/>
            </div>
            <div className={s.dFlex}>
                <label htmlFor='password'>Password</label>
                <input id='password' required/>
            </div>
            <Link to='/register' className={s.registerLink}>
                Don't have an account?
            </Link>
        </form>
    )
}
