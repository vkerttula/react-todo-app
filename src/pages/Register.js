import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Firebase'
import {setDoc, doc} from 'firebase/firestore'
import { Navigate } from 'react-router-dom'

const Register = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        error: null,
        loading: false
    });

    const { name, email, password, password2, error, loading } = data;

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if(!name || !email || !password || !password2) {
            setData({ ...data, error: "Error: Fill all fields!" });
        }
        else if(password !== password2) {
            setData({ ...data, error: "Error: Passwords don't match!" });
        }
        else {
            try {
                // Create user
                const result = await createUserWithEmailAndPassword(auth, email, password);
                console.log(result.user);

                // Add user information to firestore 
                await setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    name,
                    email,
                    createdAt: result.user.metadata.createdAt
                  });
                setData({name: '', email: '', password: '', password2: '', error: null, loading: false})
                return <Navigate to="/" />
            } catch (err) {
                setData({ ...data, error: err.message, loading: false });
            }
        }
    };

  return (
    <section className='register'>
        <h2>Register</h2>
        <form className='form' onSubmit={handleSubmit}>
            <div className='input-container'>
                <label htmlFor='name'>Name</label>
                <input type="text" name="name" value={name} onChange={handleChange}/>
            </div>
            <div className='input-container'>
                <label htmlFor='name'>Email</label>
                <input type="text" name="email" value={email} onChange={handleChange} />
            </div>
            <div className='input-container'>
                <label htmlFor='name'>Password</label>
                <input type="password" name="password" value={password} onChange={handleChange} />
            </div>
            <div className='input-container'>
                <label htmlFor='name'>Enter password again</label>
                <input type="password" name="password2" value={password2} onChange={handleChange} />
            </div>

            {error ? <p className='error-text'>{error}</p> : null}

            <div className='btn-container'>
                <button className='btn' disabled={loading}>Register</button>
            </div>
        </form>
    </section>
  )
}

export default Register