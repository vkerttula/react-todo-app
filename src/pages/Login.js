import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    let navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: '',
        error: null,
        loading: false
    });

    const { email, password, error, loading } = data;

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if( !email || !password ) {
            setData({ ...data, error: "Error: Fill all fields!" });
        }
        else {
            try {
                // Login to user
                const result = await signInWithEmailAndPassword(auth, email, password);
                setData({ email: '', password: '', error: null, loading: false});
                navigate("/"); // Navigate to home
            } catch (err) {
                setData({ ...data, error: err.message, loading: false });
            }
        }
    };

  return (
    <section className='login'>
        <h2>Login</h2>
        <form className='form' onSubmit={handleSubmit}>
            <div className='input-container'>
                <label htmlFor='name'>Email</label>
                <input type="text" name="email" value={email} onChange={handleChange} />
            </div>
            <div className='input-container'>
                <label htmlFor='name'>Password</label>
                <input type="password" name="password" value={password} onChange={handleChange} />
            </div>

            {error ? <p className='error-text'>{error}</p> : null}


            <div className='btn-container'>
                <button className='btn' disabled={loading}>
                    {loading ? 'Logging in ...' : 'Login'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Login