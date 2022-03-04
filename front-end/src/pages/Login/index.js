import React, { useState } from "react";
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import './style.css';


export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory('');

    async function handleLogin(e) {
        e.priventDefault();

        try {
            const response = await api.post('session', { id });
            
            localStorage.setItem('produtorId', id);
            localStorage.setItem('produtorName', response.data.name);

            history.push('/profile');
        }catch (err) {
            alert('Falha no login, tente novamente!')
        }
    }   

    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login!</h1>

                    <input 
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type= "submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="darkorange" />
                            Nao tenho cadastro
                    </Link>
                        
                    
                </form>
            </section>

        </div>
    );
}