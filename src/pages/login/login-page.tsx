import React, { useState } from 'react';
import './login-style.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';

const logoData = [
    { backgroundColor: '#FF6666', color: '#FFF', height: '224px', width: '100%', letter: 'G' },
    { backgroundColor: '#FFBD55', color: '#FFF', height: '204px', width: '100%', letter: 'A' },
    { backgroundColor: '#FFFF66', color: '#FFF', height: '204px', width: '100%', letter: 'L' },
    { backgroundColor: '#90EE90', color: '#FFF', height: '204px', width: '100%', letter: 'L' },
    { backgroundColor: '#557C51', color: '#FFF', height: '150px', width: '100%', letter: 'E' },
    { backgroundColor: '#23AEAE', color: '#FFF', height: '204px', width: '100%', letter: 'R' },
    { backgroundColor: '#FF6666', color: '#FFF', height: '204px', width: '100%', letter: 'Y' }
];

export const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitUserData = ({ username, password }: any) => {
        console.log({ username, password });
        if (username?.length > 0 && password?.length > 0) {
            dispatch(login(`${username}${password}`)); // TODO: implement login functionality
            navigate('/');
        }
        else {
            alert('Please enter username and password');
        }
    };

    return (
        <div className='pageContainer'>
            <div className='logoContainer'>
                <div className='logo'>
                    {logoData.map((item, index) => (
                        <div key={index} style={{ backgroundColor: item.backgroundColor, color: item.color, height: item.height }}>
                            {item.letter}
                        </div>
                    ))}
                </div>
            </div>
            {isAuthenticated ? <div className='container' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <h1 style={{ color: 'white', border: '1px solid white', padding: '10px', paddingBlock: '10px', margin: '3px', fontWeight: 'bold', fontSize: '40px' }}>You are already logged in</h1>
                <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>click here to continue using app</h3>
            </div> :
                <form className="container" onSubmit={(e) => e.preventDefault()}>
                    <input className='input' required type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                    <input className='input' required type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => submitUserData({ username: email, password: password })}>LOGIN</button>
                </form>}
        </div>
    );
};