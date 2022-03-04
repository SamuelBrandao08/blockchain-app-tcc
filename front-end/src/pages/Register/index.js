import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

import api from "../../services/api";
import './style.css';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [contato, setContato] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.priventDefault();

        const data = {
            nome,
            email,
            contato,
            cidade,
            uf
        };
        try{
            const response = await api.post('apicultor', data);

            alert(`Seu ID de acesso: ${response.data.id}`)

            history.push('/');
        }catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
         
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro!</p>

                    <Link className="back-link" to="">
                        <FiArrowLeft size={16} color="darkorange"/>
                        Voltar para o login
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input 
                        placeholder="Contato" 
                        value={contato}
                        onChange={e => setContato(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)} 
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} 
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}